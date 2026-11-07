export const THEMES = ["dark", "light", "vesper", "aurora", "oliva"] as const;
export type Theme = (typeof THEMES)[number];

export const LABELS: Record<Theme, string> = {
  dark: "Nox",
  light: "Lux",
  vesper: "Vesper",
  aurora: "Aurora",
  oliva: "Oliva",
};

export function isTheme(v: unknown): v is Theme {
  return typeof v === "string" && (THEMES as readonly string[]).includes(v);
}
