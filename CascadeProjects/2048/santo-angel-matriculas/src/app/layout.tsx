import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IE Santo Ángel - Matrículas y Pagos",
  description: "Sistema de matrículas y pensiones - Institución Educativa Santo Ángel (Flandes, Tolima)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-pink-300 to-purple-400" />
          <DecorShapes />
          <div className="relative z-10 w-full px-2 py-0">{children}</div>
        </div>
      </body>
    </html>
  );
}

function DecorShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <span className="absolute left-10 top-16 h-3 w-3 bg-pink-500 rounded-full opacity-70" />
      <span className="absolute right-12 top-24 h-4 w-4 bg-emerald-400 rounded-sm rotate-12 opacity-70" />
      <span className="absolute left-1/2 top-8 h-3 w-10 bg-purple-500/60 rounded-full blur-sm -translate-x-1/2" />
      <span className="absolute left-16 bottom-24 h-3 w-3 rounded-full bg-yellow-400 opacity-80" />
      <span className="absolute right-20 bottom-16 h-3 w-3 rounded-full bg-cyan-400 opacity-80" />
    </div>
  );
}
