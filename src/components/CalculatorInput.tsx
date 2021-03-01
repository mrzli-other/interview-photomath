import React from 'react';

interface CalculatorInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export function CalculatorInput({
  value,
  onChange
}: CalculatorInputProps): React.ReactElement {
  return (
    <textarea
      style={{
        gridRowStart: 1,
        gridColumn: '1 / span 4',
        resize: 'none',
        width: '100%',
        height: 100,
        boxSizing: 'border-box'
      }}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );
}
