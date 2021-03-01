import React from 'react';
import { getCssGridSpanProperty } from '../utils/generic-utils';

interface CalculatorButtonProps {
  readonly label: string;
  readonly row: number;
  readonly column: number;
  readonly rowSpan?: number;
  readonly columnSpan?: number;
  readonly onClick: () => void;
}

const BUTTON_SIZE = 40;

export function CalculatorButton({
  label,
  row,
  column,
  rowSpan,
  columnSpan,
  onClick
}: CalculatorButtonProps): React.ReactElement {
  return (
    <button
      style={{
        gridRowStart: row,
        gridRowEnd: getCssGridSpanProperty(rowSpan),
        gridColumnStart: column,
        gridColumnEnd: getCssGridSpanProperty(columnSpan),
        width: columnSpan !== undefined ? '100%' : BUTTON_SIZE,
        height: rowSpan !== undefined ? '100%' : BUTTON_SIZE,
        display: 'inline-block'
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
