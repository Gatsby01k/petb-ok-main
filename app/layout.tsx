import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peter Todd Bitcoin",
  description: "Next‑gen Bitcoin project concept — on‑chain proof, DAO governance, and investor tiers.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Peter Todd Bitcoin",
    description: "Awwwards‑style concept: on‑chain proof, DAO governance, investor tiers.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Peter Todd Bitcoin",
    description: "Awwwards‑style concept: on‑chain proof, DAO governance, investor tiers."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white selection:bg-amber-300 selection:text-black">{children}</body>
    </html>
  );
}
