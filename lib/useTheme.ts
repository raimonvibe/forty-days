"use client";

import { useEffect, useState } from "react";
import { isTheme, type Theme } from "./themes";

// Follows the theme on <html data-theme>, which the toggle changes.
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setTheme(isTheme(el.dataset.theme) ? el.dataset.theme : "dark");
    read();
    const obs = new MutationObserver(read);
    obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return theme;
}
