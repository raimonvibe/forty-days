"use client";

import { useEffect, useState } from "react";
import { roman } from "../lib/roman";

// The page is prerendered, so the build year is the first guess; the
// visitor's clock corrects it after load.
export default function Year({ numeral = false }: { numeral?: boolean }) {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{numeral ? roman(year) : year}</>;
}
