export const SITE_URL = 'https://flashblaze.xyz';

// Stable @id anchors. Every schema node that refers to one of these entities
// links by @id rather than redefining it, so crawlers resolve a single entity.
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BLOG_ID = `${SITE_URL}/posts/#blog`;

export const PERSON_NAME = 'Neeraj Lagwankar';

export const SAME_AS = [
  'https://fosstodon.org/@flashblaze',
  'https://mastodon.social/@neeraj_artx',
  'https://x.com/neeraj_artx',
  'https://github.com/flashblaze',
  'https://www.linkedin.com/in/neeraj-lagwankar/',
  'https://www.instagram.com/neeraj_artx/',
];

export const BLOG_NAME = 'Neeraj Lagwankar Blog';

export const BLOG_DESCRIPTION =
  'Articles about web development, Cloudflare, Astro, React, modern web technologies and more.';

export const SITE_DESCRIPTION =
  'Web development blog covering Cloudflare, Astro, React, modern web technologies and more.';

// The full Person node. Inlined on every page that references PERSON_ID so the
// reference resolves standalone — crawlers do not join graphs across pages.
export const personNode = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PERSON_NAME,
  url: `${SITE_URL}/`,
  sameAs: SAME_AS,
};

export const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: PERSON_NAME,
  description: SITE_DESCRIPTION,
  publisher: { '@id': PERSON_ID },
  inLanguage: 'en',
};

export const blogNode = {
  '@type': 'Blog',
  '@id': BLOG_ID,
  url: `${SITE_URL}/posts/`,
  name: BLOG_NAME,
  description: BLOG_DESCRIPTION,
};
