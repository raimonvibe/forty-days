import { ImageResponse } from "next/og";
import { DayFive, loadFonts } from "../lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<DayFive size={180} />, { ...size, fonts: await loadFonts() });
}
