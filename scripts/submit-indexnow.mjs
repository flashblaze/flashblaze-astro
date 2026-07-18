import { readFile } from 'node:fs/promises';

const SITE_ORIGIN = 'https://flashblaze.xyz';
const SITE_HOST = new URL(SITE_ORIGIN).host;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_FILE_NAME = 'a1a622dade84be0e6c3637ee71cb44e5.txt';
const LOCAL_KEY_FILE = new URL(`../public/${KEY_FILE_NAME}`, import.meta.url);
const SITEMAP_LOCATION = `${SITE_ORIGIN}/sitemap-index.xml`;
const MAX_URLS_PER_REQUEST = 10_000;
const GET_TIMEOUT_MS = 15_000;
const POST_TIMEOUT_MS = 30_000;

function printUsage() {
  console.log(`Usage:
  pnpm indexnow -- <url> [url...]
  pnpm indexnow -- --sitemap
  pnpm indexnow -- --dry-run <url> [url...]
  pnpm indexnow -- --dry-run --sitemap

Options:
  --sitemap  Submit every URL in the live sitemap.
  --dry-run  Validate the key and URLs without sending the IndexNow POST.
  --help     Show this help message.

Examples:
  pnpm indexnow -- https://flashblaze.xyz/posts/example-post/
  pnpm indexnow -- --dry-run https://flashblaze.xyz/
  pnpm indexnow -- --sitemap`);
}

async function getKey() {
  const key = (
    process.env.INDEXNOW_KEY ?? (await readFile(LOCAL_KEY_FILE, 'utf8'))
  ).trim();

  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
    throw new Error(
      'The IndexNow key must be 8-128 letters, numbers, or dashes.',
    );
  }

  return key;
}

async function verifyRemoteKey(key) {
  const keyLocation = `${SITE_ORIGIN}/${key}.txt`;
  const response = await fetch(keyLocation, {
    headers: { 'user-agent': 'flashblaze-indexnow/1.0' },
    signal: AbortSignal.timeout(GET_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(
      `Key verification failed: ${keyLocation} returned HTTP ${response.status}.`,
    );
  }

  const remoteKey = (await response.text()).trim();

  if (remoteKey !== key) {
    throw new Error(
      `Key verification failed: ${keyLocation} does not contain the configured key.`,
    );
  }

  console.log(`[IndexNow] Verified key at ${keyLocation}`);
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

async function getSitemapUrls(sitemapUrl, visited = new Set()) {
  if (visited.has(sitemapUrl)) {
    return [];
  }

  visited.add(sitemapUrl);

  const response = await fetch(sitemapUrl, {
    headers: { 'user-agent': 'flashblaze-indexnow/1.0' },
    signal: AbortSignal.timeout(GET_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(
      `Could not read sitemap ${sitemapUrl}: HTTP ${response.status}.`,
    );
  }

  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/giu)].map(
    match => decodeXml(match[1]),
  );

  if (/<sitemapindex(?:\s|>)/iu.test(xml)) {
    const nestedUrls = await Promise.all(
      locations.map(location => getSitemapUrls(location, visited)),
    );
    return nestedUrls.flat();
  }

  if (!/<urlset(?:\s|>)/iu.test(xml)) {
    throw new Error(`Unsupported sitemap format at ${sitemapUrl}.`);
  }

  return locations;
}

function validateUrls(values) {
  const urls = new Set();

  for (const value of values) {
    let url;

    try {
      url = new URL(value);
    } catch {
      throw new Error(`Invalid absolute URL: ${value}`);
    }

    if (url.protocol !== 'https:' || url.host !== SITE_HOST) {
      throw new Error(
        `URL must use HTTPS and belong to ${SITE_HOST}: ${value}`,
      );
    }

    if (url.username || url.password || url.hash) {
      throw new Error(
        `URL must not contain credentials or a fragment: ${value}`,
      );
    }

    urls.add(url.href);
  }

  return [...urls];
}

function chunks(values, size) {
  return Array.from({ length: Math.ceil(values.length / size) }, (_, index) =>
    values.slice(index * size, (index + 1) * size),
  );
}

async function submitBatch(key, urlList) {
  const keyLocation = `${SITE_ORIGIN}/${key}.txt`;
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'user-agent': 'flashblaze-indexnow/1.0',
    },
    body: JSON.stringify({
      host: SITE_HOST,
      key,
      keyLocation,
      urlList,
    }),
    signal: AbortSignal.timeout(POST_TIMEOUT_MS),
  });

  const responseBody = (await response.text()).trim();

  if (response.status !== 200 && response.status !== 202) {
    const retryAfter = response.headers.get('retry-after');
    const details = [
      `IndexNow rejected ${urlList.length} URL(s) with HTTP ${response.status}.`,
      retryAfter ? `Retry-After: ${retryAfter}.` : '',
      responseBody ? `Response: ${responseBody}` : '',
    ]
      .filter(Boolean)
      .join(' ');

    throw new Error(details);
  }

  const status =
    response.status === 202 ? 'accepted; key validation pending' : 'accepted';
  console.log(
    `[IndexNow] ${urlList.length} URL(s) ${status} (HTTP ${response.status}).`,
  );
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const useSitemap = args.includes('--sitemap');

  if (args.includes('--help')) {
    printUsage();
    return;
  }

  const knownOptions = ['--', '--dry-run', '--sitemap'];
  const unknownOptions = args.filter(
    arg => arg.startsWith('--') && !knownOptions.includes(arg),
  );
  if (unknownOptions.length > 0) {
    throw new Error(`Unknown option(s): ${unknownOptions.join(', ')}`);
  }

  const explicitUrls = args.filter(arg => !arg.startsWith('--'));
  const sitemapUrls = useSitemap ? await getSitemapUrls(SITEMAP_LOCATION) : [];
  const urlList = validateUrls([...explicitUrls, ...sitemapUrls]);

  if (urlList.length === 0) {
    printUsage();
    throw new Error('Provide at least one URL or use --sitemap.');
  }

  const key = await getKey();
  await verifyRemoteKey(key);

  console.log(`[IndexNow] Validated ${urlList.length} unique URL(s).`);

  if (dryRun) {
    for (const url of urlList) {
      console.log(`  ${url}`);
    }
    console.log('[IndexNow] Dry run complete; no POST request was sent.');
    return;
  }

  for (const batch of chunks(urlList, MAX_URLS_PER_REQUEST)) {
    await submitBatch(key, batch);
  }
}

main().catch(error => {
  console.error(`[IndexNow] ${error.message}`);
  process.exitCode = 1;
});
