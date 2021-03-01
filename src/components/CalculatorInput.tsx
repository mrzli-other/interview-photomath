import React, { useEffect, useRef } from 'react';

interface CalculatorInputProps {
  readonly caretPosition: number;
  readonly onCaretPositionChanged: (caretPosition: number) => void;
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export function CalculatorInput({
  caretPosition,
  onCaretPositionChanged,
  value,
  onChange
}: CalculatorInputProps): React.ReactElement {
  const inputEl = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textArea = inputEl.current;
    if (textArea) {
      textArea.selectionStart = caretPosition;
      textArea.selectionEnd = caretPosition;
    }
  }, [caretPosition]);

  return (
    <textarea
      ref={inputEl}
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
      onSelect={(event) => {
        const target = event.target as HTMLTextAreaElement;
        // just select max to have one number, to keep things simple
        const caretPosition = Math.max(
          target.selectionStart,
          target.selectionEnd
        );
        onCaretPositionChanged(caretPosition);
      }}
    />
  );
}
