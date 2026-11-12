"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import { colorAt, FAMILIES, FAMILY_LABELS, familiesOf, PALETTES, type Family } from "../lib/colors";
import { isTheme, META, THEMES, type Theme, type Tone } from "../lib/themes";

const KEY = "xl.theme";
const RECENT_KEY = "xl.theme.recent";
const RECENT_MAX = 4;

type Tab = "all" | Tone;
const TONES: { id: Tone; latin: string; english: string }[] = [
  { id: "dark", latin: "Noctes", english: "dark" },
  { id: "mid", latin: "Media", english: "rich" },
  { id: "light", latin: "Dies", english: "light" },
];
const TABS: { id: Tab; latin: string; english: string }[] = [{ id: "all", latin: "Omnia", english: "all" }, ...TONES];

// Night themes, then rich mid-tones, then day themes, each in the order they were made.
const ORDER: Theme[] = TONES.flatMap((g) => THEMES.filter((t) => META[t].mode === g.id));
// Read from each theme's own day colours, so a new theme files itself under the right chips.
const FAMILIES_OF = Object.fromEntries(THEMES.map((t) => [t, familiesOf(PALETTES[t])])) as Record<Theme, Family[]>;
const DOTS = [0, 0.25, 0.5, 0.75, 1];

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

function Swatch({ theme, small }: { theme: Theme; small?: boolean }) {
  // The swatch wears its own theme: background, auras, title gradient and the colours its days pass through.
  return (
    <span className={small ? "theme-swatch is-small" : "theme-swatch"} data-theme={theme} aria-hidden="true">
      <span className="theme-swatch-xl">XL</span>
      {!small && (
        <span className="theme-swatch-days">
          {DOTS.map((d) => (
            <i key={d} style={{ background: colorAt(d, PALETTES[theme]) }} />
          ))}
        </span>
      )}
    </span>
  );
}

export default function ThemeToggle() {
  // The chosen theme. Hovering or arrowing through the menu previews others without choosing them.
  const [theme, setTheme] = useState<Theme | null>(null);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("all");
  const [family, setFamily] = useState<Family | null>(null);
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<Theme[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef(new Map<Theme, HTMLButtonElement>());
  const pointer = useRef({ x: -1, y: -1 });
  const typed = useRef({ text: "", at: 0 });
  const menuId = useId();

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(isTheme(current) ? current : "dark");
    try {
      const saved = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
      if (Array.isArray(saved)) setRecent(saved.filter(isTheme).slice(0, RECENT_MAX));
    } catch {}
  }, []);

  const visible = useMemo(
    () =>
      ORDER.filter(
        (t) => (tab === "all" || META[t].mode === tab) && (!family || FAMILIES_OF[t].includes(family)),
      ),
    [tab, family],
  );
  // Only offer colour chips that some theme in the current tab actually has.
  const families = useMemo(
    () => FAMILIES.filter((f) => ORDER.some((t) => (tab === "all" || META[t].mode === tab) && FAMILIES_OF[t].includes(f))),
    [tab],
  );

  const focusOption = useCallback((t: Theme | undefined) => {
    if (!t) return;
    requestAnimationFrame(() => {
      const el = optionRefs.current.get(t);
      el?.focus({ preventScroll: true });
      el?.scrollIntoView({ block: "nearest" });
    });
  }, []);

  const choose = useCallback(
    (t: Theme) => {
      apply(t);
      const nextRecent = [t, ...recent.filter((r) => r !== t)].slice(0, RECENT_MAX);
      try {
        localStorage.setItem(KEY, t);
        localStorage.setItem(RECENT_KEY, JSON.stringify(nextRecent));
      } catch {}
      setRecent(nextRecent);
      setTheme(t);
      setOpen(false);
      buttonRef.current?.focus();
    },
    [recent],
  );

  // Closing without choosing puts the chosen theme back.
  const close = useCallback(
    (refocus: boolean) => {
      if (theme) apply(theme);
      setOpen(false);
      if (refocus) buttonRef.current?.focus();
    },
    [theme],
  );

  const preview = useCallback(
    (i: number, focus: boolean) => {
      const t = visible[i];
      if (!t) return;
      setActive(i);
      apply(t);
      if (focus) focusOption(t);
    },
    [visible, focusOption],
  );

  function openMenu() {
    const current = theme ?? "dark";
    setTab("all");
    setFamily(null);
    setActive(Math.max(0, ORDER.indexOf(current)));
    setOpen(true);
    focusOption(current);
  }

  // Changing a tab or chip keeps the highlight on the chosen theme when it is still listed.
  function refilter(nextTab: Tab, wanted: Family | null) {
    if (theme) apply(theme);
    // A colour that no theme in the new tab has is dropped rather than showing an empty list.
    const inTab = (t: Theme) => nextTab === "all" || META[t].mode === nextTab;
    const nextFamily = wanted && ORDER.some((t) => inTab(t) && FAMILIES_OF[t].includes(wanted)) ? wanted : null;
    setTab(nextTab);
    setFamily(nextFamily);
    const list = ORDER.filter((t) => inTab(t) && (!nextFamily || FAMILIES_OF[t].includes(nextFamily)));
    setActive(Math.max(0, theme ? list.indexOf(theme) : 0));
    bodyRef.current?.scrollTo({ top: 0 });
  }

  // A click or tap outside closes the menu; on phones the page behind the sheet stops scrolling.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onDown);
    const sheet = window.matchMedia("(max-width: 759px)").matches;
    const prevOverflow = document.body.style.overflow;
    if (sheet) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  function onListKey(e: React.KeyboardEvent) {
    const last = visible.length - 1;
    const go = (i: number) => {
      e.preventDefault();
      preview(i, true);
    };
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        return go(active >= last ? 0 : active + 1);
      case "ArrowUp":
      case "ArrowLeft":
        return go(active <= 0 ? last : active - 1);
      case "Home":
        return go(0);
      case "End":
        return go(last);
    }
    // Typing jumps to the theme whose name starts with the letters typed.
    if (e.key.length === 1 && /\p{L}/u.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const now = Date.now();
      typed.current = { text: (now - typed.current.at < 700 ? typed.current.text : "") + e.key.toLowerCase(), at: now };
      const i = visible.findIndex((t) => META[t].label.toLowerCase().startsWith(typed.current.text));
      if (i >= 0) go(i);
    }
  }

  function surprise() {
    const pool = visible.filter((t) => t !== theme);
    const from = pool.length ? pool : ORDER.filter((t) => t !== theme);
    choose(from[Math.floor(Math.random() * from.length)]);
  }

  const option = (t: Theme) => {
    const i = visible.indexOf(t);
    return (
      <button
        key={t}
        ref={(el) => {
          if (el) optionRefs.current.set(t, el);
          else optionRefs.current.delete(t);
        }}
        role="option"
        aria-selected={t === theme}
        tabIndex={i === active ? 0 : -1}
        className={`theme-option${i === active ? " is-active" : ""}`}
        onClick={() => choose(t)}
        onPointerMove={(e) => {
          // Only a real mouse movement previews, not the list scrolling under a still cursor.
          const last = pointer.current;
          if (e.pointerType !== "mouse" || (last.x === e.screenX && last.y === e.screenY)) return;
          pointer.current = { x: e.screenX, y: e.screenY };
          if (i !== active) preview(i, false);
        }}
        onFocus={() => {
          if (i !== active) preview(i, false);
        }}
      >
        <Swatch theme={t} />
        <span className="theme-option-text">
          <span className="theme-option-name">{META[t].label}</span>
          <span className="theme-option-story">{META[t].story}</span>
        </span>
        <svg className="theme-option-check" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12.5l4.2 4.2L19 7" />
        </svg>
      </button>
    );
  };

  const grouped = tab === "all";
  const showRecent = grouped && !family && recent.length > 1;

  return (
    <div className="theme-menu" ref={rootRef}>
      <button
        ref={buttonRef}
        className="toggle"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={theme ? `Theme: ${META[theme].label}. Choose a theme` : "Choose a theme"}
        onClick={() => (open ? close(false) : openMenu())}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            e.preventDefault();
            openMenu();
          }
        }}
      >
        <span className="toggle-orb" aria-hidden="true" />
        <span className="toggle-text">{theme ? META[theme].label : " "}</span>
        <svg className="toggle-chevron" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3 4.5l3 3 3-3" />
        </svg>
      </button>

      {open && (
        <>
          <div className="theme-backdrop" aria-hidden="true" onClick={() => close(false)} />
          <div
            id={menuId}
            className="theme-panel"
            role="dialog"
            aria-label="Choose a theme"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                close(true);
              }
            }}
          >
            <span className="theme-grip" aria-hidden="true" />
            <div className="theme-head">
              <div className="theme-tabs" role="tablist" aria-label="Tone">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={tab === t.id}
                    className="theme-tab"
                    onClick={() => refilter(t.id, family)}
                  >
                    <span className="theme-tab-latin">{t.latin}</span>
                    <span className="theme-tab-english">{t.english}</span>
                  </button>
                ))}
              </div>
              <div className="theme-chips" role="group" aria-label="Colour">
                {families.map((f) => (
                  <button
                    key={f}
                    className="theme-chip"
                    aria-pressed={family === f}
                    title={f}
                    onClick={() => refilter(tab, family === f ? null : f)}
                  >
                    <i style={{ background: FAMILY_LABELS[f].swatch }} aria-hidden="true" />
                    {FAMILY_LABELS[f].latin}
                  </button>
                ))}
              </div>
            </div>

            <div className="theme-body" ref={bodyRef}>
              {showRecent && (
                <div className="theme-recent">
                  <p className="theme-group-title">Nuper · recent</p>
                  <div className="theme-recent-row">
                    {recent.map((t) => (
                      <button key={t} className="theme-recent-item" onClick={() => choose(t)} aria-label={`${META[t].label} (recent)`}>
                        <Swatch theme={t} small />
                        <span>{META[t].label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div role="listbox" aria-label="Themes" className="theme-list" onKeyDown={onListKey}>
                {visible.length === 0 && <p className="theme-empty">No theme in this colour here.</p>}
                {grouped
                  ? TONES.map((g) => {
                      const items = visible.filter((t) => META[t].mode === g.id);
                      if (!items.length) return null;
                      return (
                        <div key={g.id} role="group" aria-label={`${g.latin}, ${g.english}`} className="theme-group">
                          <p className="theme-group-title" aria-hidden="true">
                            {g.latin} · {g.english} <span>{items.length}</span>
                          </p>
                          <div className="theme-grid">{items.map(option)}</div>
                        </div>
                      );
                    })
                  : <div className="theme-grid">{visible.map(option)}</div>}
              </div>
            </div>

            <button className="theme-surprise" onClick={surprise}>
              <span aria-hidden="true">✦</span> Fortuna — surprise me
              {(tab !== "all" || family) && <span className="theme-surprise-scope"> · from these {visible.length}</span>}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
