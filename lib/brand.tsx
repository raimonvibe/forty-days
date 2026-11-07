import { readFile } from "node:fs/promises";
import path from "node:path";

export const SITE_NAME = "XL — Quadraginta Dies";
export const SITE_SHORT = "XL";
export const SITE_DESCRIPTION =
  "Forty days. Forty boxes. One quiet vow, kept one day at a time. A private day-by-day tracker for a forty-day journey of discipline and renewal.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const INK = "#0b0a10";
export const GRAD = "linear-gradient(120deg, #5c34a8 0%, #b03070 38%, #e2623e 70%, #e8be68 100%)";
// The home screen icon wears the Oliva theme: hunter green with gold leaf.
export const OLIVA_BG = "#0c2318";
export const OLIVA_GREEN = "linear-gradient(140deg, #2c6a48 0%, #174a31 45%, #0c2318 100%)";
export const OLIVA_GOLD = "linear-gradient(120deg, #9c7a2c 0%, #d8b45a 35%, #f3e2a4 62%, #c9a24a 100%)";
const GOLD = "#d8b45a";

const fontDir = (pkg: string) => path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files");

export async function loadFonts() {
  const [serif, serifItalic, mono] = await Promise.all([
    readFile(path.join(fontDir("cormorant-garamond"), "cormorant-garamond-latin-500-normal.woff")),
    readFile(path.join(fontDir("cormorant-garamond"), "cormorant-garamond-latin-300-italic.woff")),
    readFile(path.join(fontDir("jetbrains-mono"), "jetbrains-mono-latin-400-normal.woff")),
  ]);
  return [
    { name: "Serif", data: serif, weight: 500 as const, style: "normal" as const },
    { name: "Serif", data: serifItalic, weight: 300 as const, style: "italic" as const },
    { name: "Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

// The fifth box, kept: the app's home screen face, in Oliva green and gold.
export function DayFive({ size }: { size: number }) {
  const tiny = size < 64;
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: OLIVA_GREEN,
        color: GOLD,
        fontFamily: "Serif",
      }}
    >
      {tiny ? (
        <div style={{ fontSize: size * 0.82, lineHeight: 1, color: GOLD }}>V</div>
      ) : (
        // A hairline frame inside the safe zone, like the box's border on the grid.
        <div
          style={{
            width: size * 0.66,
            height: size * 0.66,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: `${Math.max(1, size / 180)}px solid rgba(216,180,90,0.55)`,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: size * 0.36,
              lineHeight: 1,
              marginTop: -size * 0.03,
              backgroundImage: OLIVA_GOLD,
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            V
          </div>
          <svg width={size * 0.16} height={size * 0.16} viewBox="0 0 24 24" style={{ marginTop: size * 0.01 }}>
            <path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div
            style={{
              position: "absolute",
              bottom: size * 0.03,
              right: size * 0.04,
              display: "flex",
              fontFamily: "Mono",
              fontSize: size * 0.055,
              color: "rgba(216,180,90,0.8)",
            }}
          >
            05
          </div>
        </div>
      )}
    </div>
  );
}
