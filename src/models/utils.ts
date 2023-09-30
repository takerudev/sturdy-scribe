export const transformKey = (raw: string): string[] =>
  raw.split(",").map((s: string) => s.trim());
