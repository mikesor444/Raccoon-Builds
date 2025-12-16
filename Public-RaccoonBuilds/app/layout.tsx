import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Raccoon Builds — Arquitectura de vanguardia",
  description:
    "Raccoon Builds diseña y ejecuta arquitectura residencial y comercial de alta precisión, con materiales nobles y tecnología constructiva de próxima generación."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${sans.variable} ${serif.variable} bg-[#05070d] text-slate-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
