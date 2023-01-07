import { Sandpack } from '@codesandbox/sandpack-react';
import { atomDark } from '@codesandbox/sandpack-themes';

const code = `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <span>{count}</span>
      <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>
    </div>
  );
}
`;

const SandPackDemo = () => (
  <Sandpack
    template='react'
    theme={atomDark}
    files={{
      '/App.js': code,
    }}
    options={{
      recompileMode: 'delayed',
      recompileDelay: 500,
      showLineNumbers: true,
      showTabs: true,
    }}
  />
);

export default SandPackDemo;
