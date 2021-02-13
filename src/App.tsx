import React, { useState } from 'react';

export function App(): React.ReactElement {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');

  return (
    <div>
      <div>
        <textarea
          value={expression}
          onChange={(event) => {
            setExpression(event.target.value);
          }}
        />
      </div>
      <div>
        <button
          onClick={async () => {
            const result = await fetchResult(expression);
            setResult(result);
          }}
          disabled={!expression}
        >
          Solve
        </button>
      </div>
      <div>Result:</div>
      <div>{result}</div>
    </div>
  );
}

async function fetchResult(expression: string): Promise<string> {
  const url = new URL('https://api.mathjs.org/v4');
  url.searchParams.append('expr', expression);
  const response = await fetch(url.toString());
  return response.text();
}
