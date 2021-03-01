import React from 'react';

interface CalculatorResultProps {
  readonly value: string;
}

export function CalculatorResult({
  value
}: CalculatorResultProps): React.ReactElement {
  return (
    <div
      style={{
        gridRowStart: 2,
        gridColumn: '1 / span 4',
        border: '1px solid black',
        height: 20,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 5
      }}
    >
      {value}
    </div>
  );
}
