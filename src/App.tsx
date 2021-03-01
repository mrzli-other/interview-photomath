import React, { CSSProperties, useState } from 'react';
import { CalculatorButton } from './components/CalculatorButton';
import { CalculatorInput } from './components/CalculatorInput';
import { CalculatorResult } from './components/CalculatorResult';
import {
  insertCharacterIntoString,
  limitValue,
  removeCharacterFromString
} from './utils/generic-utils';

const GUTTER = 5;

const LAYOUT_STYLES: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: `repeat(4, auto)`,
  gridTemplateRows: `repeat(8, auto)`,
  justifyContent: 'left',
  columnGap: GUTTER,
  rowGap: GUTTER
};

interface ExpressionData {
  readonly value: string;
  readonly caretPosition: number;
}

const EMPTY_EXPRESSION_DATA: ExpressionData = {
  value: '',
  caretPosition: 0
};

export function App(): React.ReactElement {
  const [expression, setExpression] = useState<ExpressionData>(
    EMPTY_EXPRESSION_DATA
  );
  const [result, setResult] = useState<string>('');

  function insertChar(char: string): void {
    setExpression((s) => {
      const value = insertCharacterIntoString(s.value, s.caretPosition, char);
      return {
        value,
        caretPosition: getChangedCaretPosition(s.caretPosition, 1, value.length)
      };
    });
  }

  return (
    <div style={LAYOUT_STYLES}>
      <CalculatorInput
        caretPosition={expression.caretPosition}
        onCaretPositionChanged={(caretPosition) => {
          setExpression((s) => ({ ...s, caretPosition }));
        }}
        value={expression.value}
        onChange={(value) => {
          setExpression((s) => ({ ...s, value }));
        }}
      />
      <CalculatorResult value={result} />
      <CalculatorButton
        label={'<-'}
        row={3}
        column={1}
        onClick={() => {
          setExpression((s) => ({
            ...s,
            caretPosition: getChangedCaretPosition(
              s.caretPosition,
              -1,
              s.value.length
            )
          }));
        }}
      />
      <CalculatorButton
        label={'->'}
        row={3}
        column={2}
        onClick={() => {
          setExpression((s) => ({
            ...s,
            caretPosition: getChangedCaretPosition(
              s.caretPosition,
              1,
              s.value.length
            )
          }));
        }}
      />
      <CalculatorButton
        label={'BS'}
        row={3}
        column={3}
        onClick={() => {
          setExpression((s) => ({
            value: removeCharacterFromString(s.value, s.caretPosition),
            caretPosition: getChangedCaretPosition(
              s.caretPosition,
              -1,
              s.value.length
            )
          }));
        }}
      />
      <CalculatorButton
        label={'C'}
        row={3}
        column={4}
        onClick={() => {
          setExpression(EMPTY_EXPRESSION_DATA);
        }}
      />
      <CalculatorButton
        label={'('}
        row={4}
        column={1}
        onClick={() => {
          insertChar('(');
        }}
      />
      <CalculatorButton
        label={')'}
        row={4}
        column={2}
        onClick={() => {
          insertChar(')');
        }}
      />
      <CalculatorButton
        label={'*'}
        row={4}
        column={3}
        onClick={() => {
          insertChar('*');
        }}
      />
      <CalculatorButton
        label={'/'}
        row={4}
        column={4}
        onClick={() => {
          insertChar('/');
        }}
      />
      <CalculatorButton
        label={'7'}
        row={5}
        column={1}
        onClick={() => {
          insertChar('7');
        }}
      />
      <CalculatorButton
        label={'8'}
        row={5}
        column={2}
        onClick={() => {
          insertChar('8');
        }}
      />
      <CalculatorButton
        label={'9'}
        row={5}
        column={3}
        onClick={() => {
          insertChar('9');
        }}
      />
      <CalculatorButton
        label={'+'}
        row={5}
        column={4}
        onClick={() => {
          insertChar('+');
        }}
      />
      <CalculatorButton
        label={'4'}
        row={6}
        column={1}
        onClick={() => {
          insertChar('4');
        }}
      />
      <CalculatorButton
        label={'5'}
        row={6}
        column={2}
        onClick={() => {
          insertChar('5');
        }}
      />
      <CalculatorButton
        label={'6'}
        row={6}
        column={3}
        onClick={() => {
          insertChar('6');
        }}
      />
      <CalculatorButton
        label={'-'}
        row={6}
        column={4}
        onClick={() => {
          insertChar('-');
        }}
      />
      <CalculatorButton
        label={'1'}
        row={7}
        column={1}
        onClick={() => {
          insertChar('1');
        }}
      />
      <CalculatorButton
        label={'2'}
        row={7}
        column={2}
        onClick={() => {
          insertChar('2');
        }}
      />
      <CalculatorButton
        label={'3'}
        row={7}
        column={3}
        onClick={() => {
          insertChar('3');
        }}
      />
      <CalculatorButton
        label={'.'}
        row={7}
        column={4}
        onClick={() => {
          insertChar('.');
        }}
      />
      <CalculatorButton
        label={'0'}
        row={8}
        column={1}
        columnSpan={3}
        onClick={() => {
          insertChar('0');
        }}
      />
      <CalculatorButton
        label={'='}
        row={8}
        column={4}
        onClick={async () => {
          if (expression.value && expression.value.trim()) {
            const result = await fetchResult(expression.value);
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

function getChangedCaretPosition(
  oldPosition: number,
  change: number,
  textLength: number
): number {
  return limitValue(oldPosition + change, 0, textLength);
}
