export const cursorStyles = ["block", "bar", "underline", "pulse"] as const;
export type CursorStyle = (typeof cursorStyles)[number];

export function parseCursorStyle(value: string): CursorStyle | null {
  const normalized = value.trim().toLowerCase();
  return (cursorStyles as readonly string[]).includes(normalized)
    ? normalized as CursorStyle
    : null;
}
