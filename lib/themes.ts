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
  "ninive",
  "horeb",
  "canaan",
  "columba",
  "iordanes",
] as const;
export type Theme = (typeof THEMES)[number];

type Meta = { label: string; story: string; mode: "dark" | "light" };

// Name, the forty-day story behind it, and whether it is a night or a day theme.
export const META: Record<Theme, Meta> = {
  dark: { label: "Nox", story: "Night burning toward dawn", mode: "dark" },
  light: { label: "Lux", story: "An illuminated manuscript", mode: "light" },
  vesper: { label: "Vesper", story: "Sunset over the sea", mode: "dark" },
  aurora: { label: "Aurora", story: "A rose dawn", mode: "light" },
  oliva: { label: "Oliva", story: "The Mount of Olives", mode: "dark" },
  diluvium: { label: "Diluvium", story: "The Flood and the rainbow", mode: "dark" },
  sinai: { label: "Sinai", story: "Fire on the mountain", mode: "dark" },
  eremus: { label: "Eremus", story: "Forty days in the wilderness", mode: "light" },
  cinis: { label: "Cinis", story: "The ashes of Lent", mode: "light" },
  caelum: { label: "Caelum", story: "The Ascension", mode: "light" },
  ninive: { label: "Ninive", story: "Jonah in the deep", mode: "dark" },
  horeb: { label: "Horeb", story: "The still small voice", mode: "dark" },
  canaan: { label: "Canaan", story: "Grapes, wine and honey", mode: "dark" },
  columba: { label: "Columba", story: "The dove returns", mode: "light" },
  iordanes: { label: "Iordanes", story: "The river Jordan", mode: "light" },
};

export const LABELS = Object.fromEntries(THEMES.map((t) => [t, META[t].label])) as Record<Theme, string>;

export function isTheme(v: unknown): v is Theme {
  return typeof v === "string" && (THEMES as readonly string[]).includes(v);
}
