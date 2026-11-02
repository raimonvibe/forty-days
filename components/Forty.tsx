"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { colorAt } from "../lib/colors";
import { roman } from "../lib/roman";

const TOTAL = 40;
const KEY = "xl.days.v1";
const DAY_MS = 86_400_000;

// 0 = untouched, 1 = kept, 2 = faltered (a forgiving mark, not a failure)
type Mark = 0 | 1 | 2;
type Store = { start: string | null; marks: Mark[] };

const empty = (): Store => ({ start: null, marks: Array(TOTAL).fill(0) });

const midnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

export default function Forty() {
  const [store, setStore] = useState<Store>(empty);
  const [ready, setReady] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const pressTimer = useRef<number | null>(null);
  const longPressed = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Store;
        if (Array.isArray(parsed.marks) && parsed.marks.length === TOTAL) setStore(parsed);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch {}
  }, [store, ready]);

  const today = useMemo(() => {
    if (!store.start) return null;
    const diff = Math.floor((midnight(new Date()) - midnight(new Date(store.start))) / DAY_MS);
    return diff >= 0 && diff < TOTAL ? diff : null;
  }, [store.start]);

  const kept = store.marks.filter((m) => m === 1).length;
  const touched = store.marks.filter((m) => m !== 0).length;

  const setMark = useCallback((i: number, next: (m: Mark) => Mark) => {
    setStore((s) => {
      const marks = [...s.marks] as Mark[];
      marks[i] = next(marks[i]);
      // The first mark anchors the calendar: that box becomes "today".
      let start = s.start;
      if (!start && marks[i] !== 0) {
        start = new Date(midnight(new Date()) - i * DAY_MS).toISOString();
      }
      if (marks.every((m) => m === 0)) start = null;
      return { start, marks };
    });
  }, []);

  const tap = (i: number) => setMark(i, (m) => (m === 1 ? 0 : 1));
  const falter = (i: number) => setMark(i, (m) => (m === 2 ? 0 : 2));

  const onPointerDown = (i: number) => {
    longPressed.current = false;
    pressTimer.current = window.setTimeout(() => {
      longPressed.current = true;
      falter(i);
      navigator.vibrate?.(12);
    }, 520);
  };
  const clearPress = () => {
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
    pressTimer.current = null;
  };

  const R = 46;
  const C = 2 * Math.PI * R;
  const pct = kept / TOTAL;

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">Liber dierum</p>
          <h1 className="title">
            <span className="title-xl">XL</span>
            <span className="title-sub">quadraginta dies</span>
          </h1>
          <p className="motto">Quod incepi, perficiam.</p>
        </div>

        <figure className="seal" aria-label={`${kept} of ${TOTAL}`}>
          <svg viewBox="0 0 120 120" className="seal-svg">
            <defs>
              <linearGradient id="sealGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={colorAt(0)} />
                <stop offset="50%" stopColor={colorAt(0.55)} />
                <stop offset="100%" stopColor={colorAt(1)} />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="56" className="seal-outer" />
            {Array.from({ length: TOTAL }).map((_, i) => {
              const a = (i / TOTAL) * Math.PI * 2 - Math.PI / 2;
              const r1 = 53, r2 = i % 10 === 0 ? 49 : 51;
              // Rounded so server and browser produce identical attributes.
              const p = (v: number) => Math.round(v * 1000) / 1000;
              return (
                <line
                  key={i}
                  x1={p(60 + Math.cos(a) * r1)} y1={p(60 + Math.sin(a) * r1)}
                  x2={p(60 + Math.cos(a) * r2)} y2={p(60 + Math.sin(a) * r2)}
                  className={store.marks[i] === 1 ? "tick on" : "tick"}
                  style={store.marks[i] === 1 ? { stroke: colorAt(i / (TOTAL - 1)) } : undefined}
                />
              );
            })}
            <circle cx="60" cy="60" r={R} className="seal-track" />
            <circle
              cx="60" cy="60" r={R}
              className="seal-arc"
              stroke="url(#sealGrad)"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - pct)}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <figcaption className="seal-center">
            <span className="seal-num">{ready ? roman(kept) : "—"}</span>
            <span className="seal-of">ex XL</span>
          </figcaption>
        </figure>
      </section>

      <div className="meter" aria-hidden="true">
        <span className="meter-fill" style={{ transform: `scaleX(${pct})` }} />
      </div>

      <ol className="grid" aria-label="Forty days">
        {store.marks.map((m, i) => {
          const t = i / (TOTAL - 1);
          const style = {
            "--c1": colorAt(t),
            "--c2": colorAt(Math.min(t + 0.12, 1)),
            "--d": `${i * 18}ms`,
          } as React.CSSProperties;
          const isToday = today === i;
          const isPast = today !== null && i < today;
          const cls = ["cell", m === 1 && "kept", m === 2 && "falter", isToday && "today", isPast && m === 0 && "missed"]
            .filter(Boolean)
            .join(" ");
          return (
            <li key={i} style={style}>
              <button
                className={cls}
                aria-pressed={m === 1}
                aria-label={`Day ${i + 1}${isToday ? ", today" : ""}${m === 1 ? ", kept" : m === 2 ? ", faltered" : ""}`}
                onClick={() => {
                  if (longPressed.current) { longPressed.current = false; return; }
                  tap(i);
                }}
                onContextMenu={(e) => { e.preventDefault(); clearPress(); if (!longPressed.current) falter(i); longPressed.current = false; }}
                onPointerDown={(e) => { if (e.pointerType !== "mouse") onPointerDown(i); }}
                onPointerUp={clearPress}
                onPointerLeave={clearPress}
                onPointerCancel={clearPress}
              >
                <span className={roman(i + 1).length >= 6 ? "cell-num long" : "cell-num"}>{roman(i + 1)}</span>
                <span className="cell-idx">{String(i + 1).padStart(2, "0")}</span>
                <svg className="cell-check" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5l4.2 4.2L19 7" />
                </svg>
                <span className="cell-slash" aria-hidden="true" />
                {isToday && <span className="cell-today" aria-hidden="true">hodie</span>}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="legend">
        <span><i className="lg lg-kept" /> servatum</span>
        <span><i className="lg lg-falter" /> lapsus</span>
        <span className="legend-hint">tene · dextro</span>
        <span className="legend-spacer" />
        {touched > 0 &&
          (confirmReset ? (
            <span className="reset-confirm">
              <button className="link" onClick={() => { setStore(empty()); setConfirmReset(false); }}>certe</button>
              <button className="link muted" onClick={() => setConfirmReset(false)}>non</button>
            </span>
          ) : (
            <button className="link muted" onClick={() => setConfirmReset(true)}>renovare</button>
          ))}
      </div>
    </>
  );
}
