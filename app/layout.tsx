import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT, SITE_URL } from "../lib/brand";
import { THEMES } from "../lib/themes";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_SHORT}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_SHORT,
  keywords: [
    "forty days",
    "40 days",
    "40 day challenge",
    "quadraginta dies",
    "day counter",
    "habit tracker",
    "streak tracker",
    "discipline",
    "self-control",
    "renewal",
    "forty days in the wilderness",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: "XL — Forty days. One quiet vow.",
    description: "Forty boxes. One for each day kept. Quod incepi, perficiam.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "XL — Forty days. One quiet vow.",
    description: "Forty boxes. One for each day kept. Quod incepi, perficiam.",
  },
  appleWebApp: { capable: true, title: SITE_SHORT, statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0a10" },
    { media: "(prefers-color-scheme: light)", color: "#f3eee3" },
  ],
};

// Sets the theme before first paint so there is no flash.
const themeScript = `(function(){try{var t=localStorage.getItem('xl.theme');if(${JSON.stringify(THEMES)}.indexOf(t)<0){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="la" suppressHydrationWarning className={`${serif.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
