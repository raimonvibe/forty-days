"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { colorAt, PALETTES } from "../lib/colors";
import { isTheme, META, THEMES, type Theme } from "../lib/themes";

const KEY = "xl.theme";
const GROUPS: { mode: "dark" | "light"; title: string }[] = [
  { mode: "dark", title: "Noctes · dark" },
  { mode: "light", title: "Dies · light" },
];
// Menu order: night themes first, then day themes, each in the order they were made.
const ORDER: Theme[] = GROUPS.flatMap((g) => THEMES.filter((t) => META[t].mode === g.mode));
const DOTS = [0, 0.25, 0.5, 0.75, 1];

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  // The chosen theme; hovering or arrowing through the menu previews others without choosing them.
  const [theme, setTheme] = useState<Theme | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pointer = useRef({ x: -1, y: -1 });
  const menuId = useId();

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(isTheme(current) ? current : "dark");
  }, []);

  const choose = useCallback((t: Theme) => {
    apply(t);
    try {
      localStorage.setItem(KEY, t);
    } catch {}
    setTheme(t);
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  // Closing without choosing puts the chosen theme back.
  const close = useCallback(
    (refocus: boolean) => {
      if (theme) apply(theme);
      setOpen(false);
      if (refocus) buttonRef.current?.focus();
    },
    [theme],
  );

  const preview = useCallback((i: number) => {
    setActive(i);
    apply(ORDER[i]);
  }, []);

  function openMenu() {
    const i = Math.max(0, ORDER.indexOf(theme ?? "dark"));
    setActive(i);
    setOpen(true);
  }

  // Focus the current theme when the menu opens, and keep the active one in view.
  useEffect(() => {
    if (!open) return;
    const el = optionRefs.current[active];
    el?.focus({ preventScroll: true });
    el?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  // A tap or click anywhere outside closes the menu.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, close]);

  function onMenuKey(e: React.KeyboardEvent) {
    const last = ORDER.length - 1;
    const go = (i: number) => {
      e.preventDefault();
      preview(i);
    };
    switch (e.key) {
      case "ArrowDown":
        return go(active === last ? 0 : active + 1);
      case "ArrowUp":
        return go(active === 0 ? last : active - 1);
      case "Home":
        return go(0);
      case "End":
        return go(last);
      case "Escape":
        e.preventDefault();
        return close(true);
      case "Tab":
        return close(false);
    }
  }

  function surprise() {
    const others = ORDER.filter((t) => t !== theme);
    choose(others[Math.floor(Math.random() * others.length)]);
  }

  return (
    <div className="theme-menu" ref={rootRef}>
      <button
        ref={buttonRef}
        className="toggle"
        aria-haspopup="listbox"
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
        <div className="theme-panel" onKeyDown={onMenuKey}>
          <div id={menuId} role="listbox" aria-label="Themes" className="theme-list">
            {GROUPS.map((g) => (
              <div key={g.mode} role="group" aria-label={g.title} className="theme-group">
                <p className="theme-group-title" aria-hidden="true">
                  {g.title}
                </p>
                {ORDER.map((t, i) =>
                  META[t].mode !== g.mode ? null : (
                    <button
                      key={t}
                      ref={(el) => {
                        optionRefs.current[i] = el;
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
                        if (i !== active) preview(i);
                      }}
                      onFocus={() => {
                        if (i !== active) preview(i);
                      }}
                    >
                      {/* The swatch wears its own theme: background, title gradient and day colours. */}
                      <span className="theme-swatch" data-theme={t} aria-hidden="true">
                        <span className="theme-swatch-xl">XL</span>
                        <span className="theme-swatch-days">
                          {DOTS.map((d) => (
                            <i key={d} style={{ background: colorAt(d, PALETTES[t]) }} />
                          ))}
                        </span>
                      </span>
                      <span className="theme-option-text">
                        <span className="theme-option-name">{META[t].label}</span>
                        <span className="theme-option-story">{META[t].story}</span>
                      </span>
                      <svg className="theme-option-check" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12.5l4.2 4.2L19 7" />
                      </svg>
                    </button>
                  ),
                )}
              </div>
            ))}
          </div>
          <button className="theme-surprise" onClick={surprise}>
            <span aria-hidden="true">✦</span> Fortuna — surprise me
          </button>
        </div>
      )}
    </div>
  );
}
