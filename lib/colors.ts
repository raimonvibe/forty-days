import type { Theme } from "./themes";

type Stops = [number, number, number][];

// The colours the forty days travel through, one story per theme.
export const PALETTES: Record<Theme, Stops> = {
  // Nox: night burning toward dawn — dusk violet → crimson → ember → gold.
  dark: [
    [92, 52, 168],
    [176, 48, 112],
    [226, 98, 62],
    [232, 190, 104],
  ],
  // Lux: an illuminated manuscript — lapis → madder → vermilion → ochre gold.
  light: [
    [38, 62, 138],
    [122, 48, 96],
    [190, 62, 46],
    [184, 134, 44],
  ],
  // Vesper: sunset over the sea — teal → dusk violet → rose → amber.
  vesper: [
    [24, 96, 116],
    [88, 86, 146],
    [204, 106, 92],
    [226, 160, 84],
  ],
  // Aurora: a rose dawn — deep rose → coral → apricot → dawn gold.
  aurora: [
    [150, 56, 104],
    [204, 78, 98],
    [222, 118, 84],
    [200, 150, 62],
  ],
  // Oliva: the Mount of Olives — laurel green ripening into old gold.
  oliva: [
    [38, 92, 62],
    [82, 122, 58],
    [150, 132, 56],
    [190, 150, 64],
  ],
  // Diluvium: forty days of rain (Gen. 7:12), then the covenant bow — the full rainbow.
  diluvium: [
    [92, 80, 190],
    [44, 118, 190],
    [40, 150, 120],
    [206, 176, 56],
    [226, 120, 56],
    [200, 64, 84],
  ],
  // Sinai: forty days on the mountain in the fire (Ex. 24:17–18) — deep red to white-hot gold.
  sinai: [
    [110, 28, 22],
    [178, 52, 26],
    [226, 110, 34],
    [236, 170, 64],
  ],
  // Eremus: forty days in the wilderness (Mt. 4:1–2) — terracotta, sienna, ochre, first sage.
  eremus: [
    [154, 74, 48],
    [188, 112, 54],
    [186, 146, 64],
    [104, 132, 88],
  ],
  // Cinis: ashes that open the forty days of Lent — ash grey deepening into Lenten violet.
  cinis: [
    [58, 56, 62],
    [104, 100, 110],
    [112, 82, 146],
    [78, 44, 128],
  ],
  // Caelum: the Ascension on the fortieth day (Acts 1:3–11) — deep blue rising into light.
  caelum: [
    [30, 52, 118],
    [48, 104, 184],
    [84, 148, 204],
    [198, 152, 58],
  ],
  // Ninive: Jonah in the deep (Jon. 2–3) — abyss blue lit by bioluminescent cyan and jade.
  ninive: [
    [16, 58, 104],
    [14, 110, 146],
    [18, 160, 162],
    [52, 186, 158],
  ],
  // Horeb: forty days' walk to the still small voice (1 Kgs 19:8–12) — moonlit slate to silver-lilac.
  horeb: [
    [52, 58, 88],
    [84, 94, 136],
    [122, 130, 176],
    [146, 134, 190],
  ],
  // Canaan: the spies return after forty days with the great cluster (Num. 13) — grape, wine, pomegranate, honey.
  canaan: [
    [76, 30, 100],
    [128, 24, 62],
    [196, 40, 66],
    [212, 146, 34],
  ],
  // Columba: after forty days Noah sends out the dove (Gen. 8:6–11) — mother-of-pearl, every colour of the shell.
  columba: [
    [126, 110, 180],
    [70, 146, 176],
    [72, 160, 122],
    [186, 146, 88],
    [176, 110, 150],
  ],
  // Iordanes: the Jordan, where the forty days begin (Mt. 3:16–4:2) — deep river, jade, then the light.
  iordanes: [
    [14, 84, 106],
    [18, 130, 128],
    [50, 160, 128],
    [196, 156, 60],
  ],
  // Smaragdus: a rainbow like an emerald round the throne (Rev. 4:3) — pure emerald greens.
  smaragdus: [
    [12, 96, 60],
    [16, 130, 76],
    [34, 160, 90],
    [80, 186, 104],
  ],
  // Purpura: the purple robe of the Passion (Mk 15:17) — royal violet deepening to lavender.
  purpura: [
    [84, 34, 140],
    [116, 56, 180],
    [146, 84, 206],
    [172, 118, 222],
  ],
  // Punica: "as a piece of a pomegranate" (Song 4:3) — fuchsia and magenta.
  punica: [
    [140, 14, 90],
    [190, 24, 120],
    [220, 50, 140],
    [236, 96, 164],
  ],
  // Passio: Gethsemane, sweat like drops of blood (Lk 22:44) — oxblood to crimson.
  passio: [
    [110, 10, 20],
    [156, 18, 28],
    [196, 36, 40],
    [226, 80, 64],
  ],
  // Mare: walking on the sea in the fourth watch (Mt 14:25) — navy, cobalt, ultramarine.
  mare: [
    [20, 42, 112],
    [28, 70, 168],
    [52, 104, 214],
    [100, 146, 236],
  ],
  // Arca: the ark of acacia wood (Ex. 25:10) — walnut, cedar, acacia, oak.
  arca: [
    [86, 52, 30],
    [124, 78, 42],
    [160, 108, 58],
    [190, 142, 88],
  ],
  // Mel: forty years of manna, tasting of honey (Ex. 16:31–35) — amber into bright honey.
  mel: [
    [196, 126, 0],
    [218, 152, 8],
    [234, 180, 24],
    [244, 206, 56],
  ],
  // Nubes: a cloud received him (Acts 1:9) — storm slate lifting toward the light.
  nubes: [
    [36, 48, 74],
    [58, 76, 110],
    [86, 106, 146],
    [116, 136, 176],
  ],
  // Myrrha: gold, frankincense and myrrh (Mt 2:11) — plum and dusty mauve.
  myrrha: [
    [70, 36, 62],
    [100, 56, 88],
    [130, 80, 114],
    [158, 106, 140],
  ],
  // Atramentum: "I wrote them with ink in the book" (Jer. 36:18) — grey wash deepening to black.
  atramentum: [
    [128, 128, 126],
    [92, 92, 90],
    [58, 58, 57],
    [18, 18, 18],
  ],
};

export const FAMILIES = ["red", "orange", "yellow", "green", "blue", "violet", "magenta", "neutral"] as const;
export type Family = (typeof FAMILIES)[number];

export const FAMILY_LABELS: Record<Family, { latin: string; swatch: string }> = {
  red: { latin: "Rubrum", swatch: "#c62a2a" },
  orange: { latin: "Aurantium", swatch: "#e2782a" },
  yellow: { latin: "Flavum", swatch: "#e8c02a" },
  green: { latin: "Viride", swatch: "#2a9a5a" },
  blue: { latin: "Caeruleum", swatch: "#2a6ac8" },
  violet: { latin: "Violaceum", swatch: "#7a48c8" },
  magenta: { latin: "Purpureum", swatch: "#c82a8a" },
  neutral: { latin: "Neutrum", swatch: "#8a8a8a" },
};

function familyOf([r, g, b]: [number, number, number]): Family {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (s < 0.15) return "neutral";
  const [R, G, B] = [r / 255, g / 255, b / 255];
  let h = max === R ? ((G - B) / d) % 6 : max === G ? (B - R) / d + 2 : (R - G) / d + 4;
  h = (h * 60 + 360) % 360;
  if (h < 18 || h >= 345) return "red";
  if (h < 42) return "orange";
  if (h < 70) return "yellow";
  if (h < 170) return "green";
  if (h < 255) return "blue";
  if (h < 300) return "violet";
  return "magenta";
}

// Every colour family a theme's forty days pass through, read from its own palette.
export function familiesOf(stops: Stops): Family[] {
  const found = new Set(stops.map(familyOf));
  return FAMILIES.filter((f) => found.has(f));
}

export function colorAt(t: number, stops: Stops = PALETTES.dark) {
  const x = Math.min(Math.max(t, 0), 1) * (stops.length - 1);
  const i = Math.min(Math.floor(x), stops.length - 2);
  const f = x - i;
  const [a, b] = [stops[i], stops[i + 1]];
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * f));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
