"use client";

import { useEffect, useState } from "react";

const THEMES = ["dark", "light", "vesper", "aurora"] as const;
type Theme = (typeof THEMES)[number];

const LABELS: Record<Theme, string> = { dark: "Nox", light: "Lux", vesper: "Vesper", aurora: "Aurora" };

function nextOf(theme: Theme): Theme {
  return THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme as Theme;
    setTheme(THEMES.includes(current) ? current : "dark");
  }, []);

  function toggle() {
    const next = nextOf(theme ?? "dark");
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("xl.theme", next);
    } catch {}
    setTheme(next);
  }

  // The label names the theme the button switches to.
  const upcoming = theme ? nextOf(theme) : null;

  return (
    <button
      className="toggle"
      onClick={toggle}
      aria-label={upcoming ? `Switch to ${LABELS[upcoming]} theme` : "Switch theme"}
    >
      <span className="toggle-orb" aria-hidden="true" />
      <span className="toggle-text">{upcoming ? LABELS[upcoming] : " "}</span>
    </button>
  );
}
