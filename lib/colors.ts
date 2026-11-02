// Gradient stops the 40 days travel through: dusk violet → crimson → ember → gold.
const STOPS: [number, number, number][] = [
  [92, 52, 168],
  [176, 48, 112],
  [226, 98, 62],
  [232, 190, 104],
];

export function colorAt(t: number) {
  const x = Math.min(Math.max(t, 0), 1) * (STOPS.length - 1);
  const i = Math.min(Math.floor(x), STOPS.length - 2);
  const f = x - i;
  const [a, b] = [STOPS[i], STOPS[i + 1]];
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * f));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
