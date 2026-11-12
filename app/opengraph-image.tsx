import { ImageResponse } from "next/og";
import { GRAD, INK, loadFonts } from "../lib/brand";
import { colorAt, PALETTES } from "../lib/colors";
import { roman } from "../lib/roman";
import { META, THEMES } from "../lib/themes";

export const alt =
  "XL — Quadraginta Dies. A forty-day tracker: forty boxes, one quiet vow, kept one day at a time, in twenty-five themes.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TOTAL = 40;
const TODAY = 28; // the twenty-ninth box, outlined as today
const FALTERED = new Set([9, 19]); // forgiving marks, as on the real grid
const TONE_ORDER = ["dark", "mid", "light"] as const;
// The ribbon runs through every theme, night themes first, then rich, then day.
const RIBBON = TONE_ORDER.flatMap((tone) => THEMES.filter((t) => META[t].mode === tone));

const INKC = "#ece5d6";
const MUTED = "#8b8498";

export default async function OpenGraphImage() {
  const cell = 54;
  const gap = 8;
  const gridW = cell * 8 + gap * 7;
  const kept = Array.from({ length: TODAY }, (_, i) => i).filter((i) => !FALTERED.has(i)).length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "58px 72px 46px",
          background: `radial-gradient(760px 460px at 4% -4%, rgba(92,52,168,0.5), transparent 70%), radial-gradient(640px 420px at 102% 104%, rgba(226,98,62,0.26), transparent 70%), ${INK}`,
          color: INKC,
          fontFamily: "Serif",
        }}
      >
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
          {/* Left: the title, as on the page. */}
          <div style={{ display: "flex", flexDirection: "column", width: 520 }}>
            <div style={{ display: "flex", alignItems: "center", fontFamily: "Mono", fontSize: 15, letterSpacing: 6, color: MUTED }}>
              <div style={{ width: 36, height: 1, background: "rgba(236,229,214,0.3)", marginRight: 16 }} />
              LIBER DIERUM
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", marginTop: 4 }}>
              <div
                style={{
                  fontSize: 220,
                  lineHeight: 0.95,
                  letterSpacing: -8,
                  backgroundImage: GRAD,
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                XL
              </div>
              <div style={{ fontStyle: "italic", fontWeight: 300, fontSize: 40, color: "#a59eb2", marginLeft: 22, marginBottom: 30 }}>
                quadraginta dies
              </div>
            </div>
            <div style={{ fontSize: 28, marginTop: 22, lineHeight: 1.3, color: INKC, opacity: 0.9 }}>
              Forty days. Forty boxes. One quiet vow, kept one day at a time.
            </div>
            <div style={{ fontStyle: "italic", fontWeight: 300, fontSize: 22, marginTop: 18, color: MUTED }}>
              “Quod incepi, perficiam.”
            </div>
          </div>

          {/* Right: the forty, part way through. */}
          <div style={{ display: "flex", flexDirection: "column", width: gridW }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap }}>
              {Array.from({ length: TOTAL }, (_, i) => {
                const t = i / (TOTAL - 1);
                const isKept = i < TODAY && !FALTERED.has(i);
                const isFalter = FALTERED.has(i);
                const isToday = i === TODAY;
                return (
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      width: cell,
                      height: cell,
                      display: "flex",
                      padding: "5px 6px",
                      fontSize: roman(i + 1).length > 5 ? 11.5 : 14,
                      borderRadius: 2,
                      border: isToday
                        ? `1px solid ${INKC}`
                        : isKept
                          ? "1px solid rgba(232,190,104,0.28)"
                          : "1px solid rgba(232,200,150,0.13)",
                      background: isKept
                        ? `linear-gradient(140deg, ${colorAt(t)}, ${colorAt(Math.min(t + 0.12, 1))})`
                        : "rgba(255,255,255,0.03)",
                      boxShadow: isKept ? `0 8px 22px -12px ${colorAt(t)}` : "none",
                      color: isKept ? "#fff" : isFalter ? MUTED : "#6f687c",
                      fontStyle: isFalter ? "italic" : "normal",
                    }}
                  >
                    {roman(i + 1)}
                    {isKept && (
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        style={{ position: "absolute", left: (cell - 16) / 2 - 1, top: cell - 16 - 9 }}
                      >
                        <path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {isFalter && (
                      <svg width={cell} height={cell} viewBox="0 0 54 54" style={{ position: "absolute", left: -1, top: -1 }}>
                        <path d="M0 54L54 0" stroke={MUTED} strokeWidth="1" opacity="0.8" />
                      </svg>
                    )}
                    {isToday && (
                      <div
                        style={{
                          position: "absolute",
                          left: 6,
                          bottom: 5,
                          display: "flex",
                          fontFamily: "Mono",
                          fontSize: 8,
                          letterSpacing: 1.5,
                          color: INKC,
                        }}
                      >
                        HODIE
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 14,
                fontFamily: "Mono",
                fontSize: 13,
                letterSpacing: 3,
                color: MUTED,
              }}
            >
              <span>{`${roman(kept)} EX XL`}</span>
              <span>DIES {roman(TODAY + 1)}</span>
            </div>
          </div>
        </div>

        {/* Bottom: every theme, as the colours its forty days travel through. */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 26 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Mono",
              fontSize: 13,
              letterSpacing: 4,
              color: MUTED,
              marginBottom: 10,
            }}
          >
            <span>{`${roman(RIBBON.length)} THEMATA`}</span>
            <span>NOX · LUX · OLIVA · DILUVIUM · MEL · MARE · ATRAMENTUM …</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {RIBBON.map((t) => (
              <div
                key={t}
                style={{
                  flex: 1,
                  height: 22,
                  borderRadius: 4,
                  background: `linear-gradient(90deg, ${[0, 0.33, 0.66, 1].map((d) => colorAt(d, PALETTES[t])).join(", ")})`,
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await loadFonts() },
  );
}
