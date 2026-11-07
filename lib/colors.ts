// Gradient stops the 40 days travel through: dusk violet → crimson → ember → gold.
const STOPS: [number, number, number][] = [
  [92, 52, 168],
  [176, 48, 112],
  [226, 98, 62],
  [232, 190, 104],
];

// Oliva theme: the days ripen from laurel green into old gold, like leaf to gilt.
export const OLIVA_STOPS: [number, number, number][] = [
  [38, 92, 62],
  [82, 122, 58],
  [150, 132, 56],
  [190, 150, 64],
];

export function colorAt(t: number, stops: [number, number, number][] = STOPS) {
  const x = Math.min(Math.max(t, 0), 1) * (stops.length - 1);
  const i = Math.min(Math.floor(x), stops.length - 2);
  const f = x - i;
  const [a, b] = [stops[i], stops[i + 1]];
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * f));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
