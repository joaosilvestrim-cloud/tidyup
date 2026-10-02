import type { Metadata, Viewport } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
export const metadata: Metadata = {
  title: "TidyUp! Midland — A clean home. A little more life.",
  description:
    "Thoughtful residential cleaning in Midland, TX and surrounding areas. Explore Standard, Deep, and Moving Cleaning, and get a personalized estimate.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "TidyUp! Midland — Come home to calm.",
    description: "Discover the right clean for your home in Midland, Texas.",
    type: "website",
    locale: "en_US",
  },
};
export const viewport: Viewport = { themeColor: "#173f35" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
