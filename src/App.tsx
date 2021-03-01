import React, { CSSProperties, useState } from 'react';
import { CalculatorButton } from './components/CalculatorButton';
import { CalculatorInput } from './components/CalculatorInput';
import { CalculatorResult } from './components/CalculatorResult';

const GUTTER = 5;

const LAYOUT_STYLES: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: `repeat(4, auto)`,
  gridTemplateRows: `repeat(8, auto)`,
  justifyContent: 'left',
  columnGap: GUTTER,
  rowGap: GUTTER
};

export function App(): React.ReactElement {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');

  return (
    <div style={LAYOUT_STYLES}>
      <CalculatorInput value={expression} onChange={setExpression} />
      <CalculatorResult value={result} />
      <CalculatorButton label={'<-'} row={3} column={1} onClick={() => {}} />
      <CalculatorButton label={'->'} row={3} column={2} onClick={() => {}} />
      <CalculatorButton label={'BS'} row={3} column={3} onClick={() => {}} />
      <CalculatorButton
        label={'C'}
        row={3}
        column={4}
        onClick={() => {
          setExpression('');
        }}
      />
      <CalculatorButton label={'('} row={4} column={1} onClick={() => {}} />
      <CalculatorButton label={')'} row={4} column={2} onClick={() => {}} />
      <CalculatorButton label={'*'} row={4} column={3} onClick={() => {}} />
      <CalculatorButton label={'/'} row={4} column={4} onClick={() => {}} />
      <CalculatorButton label={'7'} row={5} column={1} onClick={() => {}} />
      <CalculatorButton label={'8'} row={5} column={2} onClick={() => {}} />
      <CalculatorButton label={'9'} row={5} column={3} onClick={() => {}} />
      <CalculatorButton label={'+'} row={5} column={4} onClick={() => {}} />
      <CalculatorButton label={'4'} row={6} column={1} onClick={() => {}} />
      <CalculatorButton label={'5'} row={6} column={2} onClick={() => {}} />
      <CalculatorButton label={'6'} row={6} column={3} onClick={() => {}} />
      <CalculatorButton label={'-'} row={6} column={4} onClick={() => {}} />
      <CalculatorButton label={'1'} row={7} column={1} onClick={() => {}} />
      <CalculatorButton label={'2'} row={7} column={2} onClick={() => {}} />
      <CalculatorButton label={'3'} row={7} column={3} onClick={() => {}} />
      <CalculatorButton label={'.'} row={7} column={4} onClick={() => {}} />
      <CalculatorButton
        label={'0'}
        row={8}
        column={1}
        columnSpan={3}
        onClick={() => {}}
      />
      <CalculatorButton
        label={'='}
        row={8}
        column={4}
        onClick={async () => {
          if (expression && expression.trim()) {
            const result = await fetchResult(expression);
            setResult(result);
          }
        }}
      />
    </div>
  );
}

async function fetchResult(expression: string): Promise<string> {
  const url = new URL('https://api.mathjs.org/v4');
  url.searchParams.append('expr', expression);
  const response = await fetch(url.toString());
  if (response.status >= 400 && response.status < 600) {
    return 'Error!';
  }
  return response.text();
}
