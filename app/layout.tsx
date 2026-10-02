import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const display = localFont({
  src: "./fonts/Utendo-Bold.ttf",
  weight: "700",
  style: "normal",
  variable: "--font-utendo",
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
export const viewport: Viewport = { themeColor: "#03465E" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
