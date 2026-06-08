import type { Metadata, Viewport } from "next";
import { Baloo_2, Fredoka, M_PLUS_Rounded_1c, Mochiy_Pop_One } from "next/font/google";
import "./globals.css";

const display = Baloo_2({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = M_PLUS_Rounded_1c({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

const accent = Fredoka({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-accent",
  display: "swap",
});

const jp = Mochiy_Pop_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "もこもこ Mochi Box — Kawaii Mystery Boxy",
  description:
    "Ručně skládané kawaii mystery boxy plné roztomilých plyšáků, samolepek, papírnictví a japonských sladkostí.",
  icons: {
    icon: "/favicon.png",
    apple: "/mochi-box-logo.png",
  },
  openGraph: {
    title: "もこもこ Mochi Box — Kawaii Mystery Boxy",
    description:
      "Ručně skládané kawaii mystery boxy plné roztomilých plyšáků, samolepek a japonských sladkostí.",
    images: [{ url: "/mochi-box-logo.png", width: 1024, height: 1024, alt: "Mochi Box" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${display.variable} ${body.variable} ${accent.variable} ${jp.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
