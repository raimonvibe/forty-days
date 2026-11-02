import { ImageResponse } from "next/og";
import { GRAD, INK, loadFonts } from "../lib/brand";
import { colorAt } from "../lib/colors";

export const alt = "XL — Quadraginta Dies. Forty days, forty boxes, one quiet vow.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI","XXII","XXIII","XXIV","XXV","XXVI","XXVII","XXVIII","XXIX","XXX","XXXI","XXXII","XXXIII","XXXIV","XXXV","XXXVI","XXXVII","XXXVIII","XXXIX","XL"];
const KEPT = 12;

export default async function OpenGraphImage() {
  const cell = 56;
  const gap = 8;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          background: `radial-gradient(700px 420px at 8% 0%, rgba(92,52,168,0.45), transparent 70%), radial-gradient(600px 400px at 100% 100%, rgba(226,98,62,0.22), transparent 70%), ${INK}`,
          color: "#ece5d6",
          fontFamily: "Serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 480 }}>
          <div style={{ display: "flex", alignItems: "center", fontFamily: "Mono", fontSize: 16, letterSpacing: 6, color: "#8b8498" }}>
            <div style={{ width: 36, height: 1, background: "rgba(236,229,214,0.3)", marginRight: 16 }} />
            LIBER DIERUM
          </div>
          <div
            style={{
              fontSize: 230,
              lineHeight: 1,
              letterSpacing: -8,
              marginTop: 8,
              backgroundImage: GRAD,
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            XL
          </div>
          <div style={{ fontStyle: "italic", fontWeight: 300, fontSize: 44, color: "#a59eb2", marginTop: -10 }}>
            quadraginta dies
          </div>
          <div style={{ fontSize: 26, marginTop: 28, color: "#ece5d6", opacity: 0.85, lineHeight: 1.35 }}>
            Forty days. Forty boxes. One quiet vow, kept one day at a time.
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", width: cell * 8 + gap * 7, gap }}>
          {ROMAN.map((r, i) => {
            const kept = i < KEPT;
            const t = i / 39;
            return (
              <div
                key={r}
                style={{
                  width: cell,
                  height: cell,
                  display: "flex",
                  padding: "5px 6px",
                  fontSize: 13,
                  borderRadius: 2,
                  border: kept ? "1px solid transparent" : "1px solid rgba(236,229,214,0.12)",
                  background: kept
                    ? `linear-gradient(140deg, ${colorAt(t)}, ${colorAt(Math.min(t + 0.12, 1))})`
                    : "rgba(255,255,255,0.03)",
                  color: kept ? "#fff" : "#6f687c",
                }}
              >
                {r}
              </div>
            );
          })}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: 14,
              fontFamily: "Mono",
              fontSize: 13,
              letterSpacing: 3,
              color: "#8b8498",
            }}
          >
            <span>XII EX XL</span>
            <span>QUOD INCEPI, PERFICIAM</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await loadFonts() }
  );
}
