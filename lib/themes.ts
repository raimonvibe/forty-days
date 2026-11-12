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
  "smaragdus",
  "purpura",
  "punica",
  "passio",
  "mare",
  "arca",
  "mel",
  "nubes",
  "myrrha",
  "atramentum",
] as const;
export type Theme = (typeof THEMES)[number];

export type Tone = "dark" | "mid" | "light";
type Meta = { label: string; story: string; mode: Tone };

// Name, the story behind it, and its tone: near-black night, rich mid-tone colour, or light day.
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
  smaragdus: { label: "Smaragdus", story: "The emerald rainbow", mode: "mid" },
  purpura: { label: "Purpura", story: "The purple robe", mode: "mid" },
  punica: { label: "Punica", story: "The pomegranate", mode: "mid" },
  passio: { label: "Passio", story: "Gethsemane", mode: "mid" },
  mare: { label: "Mare", story: "Walking on the sea", mode: "mid" },
  arca: { label: "Arca", story: "The ark of acacia wood", mode: "dark" },
  mel: { label: "Mel", story: "Manna tasting of honey", mode: "light" },
  nubes: { label: "Nubes", story: "A cloud received him", mode: "mid" },
  myrrha: { label: "Myrrha", story: "Gifts of the Magi", mode: "mid" },
  atramentum: { label: "Atramentum", story: "The scribe's ink", mode: "light" },
};

export const LABELS = Object.fromEntries(THEMES.map((t) => [t, META[t].label])) as Record<Theme, string>;

export function isTheme(v: unknown): v is Theme {
  return typeof v === "string" && (THEMES as readonly string[]).includes(v);
}
