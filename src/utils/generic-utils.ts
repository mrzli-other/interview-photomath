export function getCssGridSpanProperty(
  spanValue: number | undefined
): string | undefined {
  return spanValue !== undefined ? `span ${spanValue}` : undefined;
}
