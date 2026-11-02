import { ImageResponse } from "next/og";
import { DayFive, loadFonts } from "../lib/brand";

export const contentType = "image/png";

export function generateImageMetadata() {
  return [
    { id: "32", size: { width: 32, height: 32 }, contentType },
    { id: "192", size: { width: 192, height: 192 }, contentType },
    { id: "512", size: { width: 512, height: 512 }, contentType },
  ];
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const size = Number(await id);
  return new ImageResponse(<DayFive size={size} />, {
    width: size,
    height: size,
    fonts: await loadFonts(),
  });
}
