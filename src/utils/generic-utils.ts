export function getCssGridSpanProperty(
  spanValue: number | undefined
): string | undefined {
  return spanValue !== undefined ? `span ${spanValue}` : undefined;
}

export function limitValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export function insertCharacterIntoString(
  str: string,
  insertAtIndex: number,
  char: string
): string {
  const index = limitValue(insertAtIndex, 0, str.length);
  return str.slice(0, index) + char + str.slice(index);
}

export function removeCharacterFromString(
  str: string,
  removeBeforeIndex: number
): string {
  const index = limitValue(removeBeforeIndex, 0, str.length);
  if (index === 0) {
    return str;
  }

  return str.slice(0, index - 1) + str.slice(index);
}
