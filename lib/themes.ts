export const THEMES = [
  "dark",
  "light",
  "vesper",
  "aurora",
  "oliva",
  "diluvium",
  "sinai",
  "eremus",
  "cinis",
  "caelum",
] as const;
export type Theme = (typeof THEMES)[number];

export const LABELS: Record<Theme, string> = {
  dark: "Nox",
  light: "Lux",
  vesper: "Vesper",
  aurora: "Aurora",
  oliva: "Oliva",
  diluvium: "Diluvium",
  sinai: "Sinai",
  eremus: "Eremus",
  cinis: "Cinis",
  caelum: "Caelum",
};

export function isTheme(v: unknown): v is Theme {
  return typeof v === "string" && (THEMES as readonly string[]).includes(v);
}
