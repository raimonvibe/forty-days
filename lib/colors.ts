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
};

export function colorAt(t: number, stops: Stops = PALETTES.dark) {
  const x = Math.min(Math.max(t, 0), 1) * (stops.length - 1);
  const i = Math.min(Math.floor(x), stops.length - 2);
  const f = x - i;
  const [a, b] = [stops[i], stops[i + 1]];
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * f));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
