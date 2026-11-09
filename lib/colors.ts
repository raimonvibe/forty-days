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
};

export function colorAt(t: number, stops: Stops = PALETTES.dark) {
  const x = Math.min(Math.max(t, 0), 1) * (stops.length - 1);
  const i = Math.min(Math.floor(x), stops.length - 2);
  const f = x - i;
  const [a, b] = [stops[i], stops[i + 1]];
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * f));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
