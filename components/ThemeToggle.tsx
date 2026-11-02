"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) ?? "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("xl.theme", next);
    } catch {}
    setTheme(next);
  }

  const label = theme === "light" ? "Nox" : "Lux";

  return (
    <button className="toggle" onClick={toggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
      <span className="toggle-orb" aria-hidden="true" />
      <span className="toggle-text">{theme ? label : " "}</span>
    </button>
  );
}
