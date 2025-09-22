// components/SiteChrome.tsx
import React from "react";
import { ArrowRight } from "lucide-react";

/* ===== BRAND ===== */
export function BTCBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`btc-badge ${className}`}>
      <span className="btc-glyph" aria-hidden>₿</span>
    </span>
  );
}
export function WordmarkBP() {
  return (
    <span className="bp-wordmark inline-flex items-baseline gap-3">
      <span className="bp-main font-extrabold tracking-tight leading-none">Bitcoin</span>
      <span aria-hidden className="bp-divider" />
      <span className="bp-sub uppercase tracking-[0.16em] font-semibold">Peter&nbsp;Todd</span>
    </span>
  );
}

/* ===== BACKGROUND ===== */
export function Background() {
  return (
    <>
      <div className="bg-grid" />
      <div className="bg-rings" />
      <div className="bg-noise" />
      <div className="bg-aurora" />
      <div className="bg-orb o1" />
      <div className="bg-orb o2" />
    </>
  );
}

/* ===== UI ===== */
export function FrameCard({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={`frame ${glow ? "frame-glow" : ""} ${className}`}>
      <div className="frame-inner">{children}</div>
    </div>
  );
}

/* ===== NAV & FOOTER (как на главной) ===== */
export function Nav() {
  return (
    <nav className="sticky top-0 z-40 w-full glass" aria-label="Primary">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] btn-ghost px-3 py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <a href="/" className="group inline-flex items-center gap-2 sm:gap-3">
          <BTCBadge className="h-9 w-9" />
          <WordmarkBP />
        </a>
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-white/75">
          <a href="/#vision" className="hover:text-white transition">Vision</a>
          <a href="/#tiers" className="hover:text-white transition">Tiers</a>
          <a href="/#onchain" className="hover:text-white transition">On-chain</a>
          <a href="/faq" className="hover:text-white transition">FAQ</a>
          <a href="/#apply" className="hover:text-white transition inline-flex items-center gap-2">
            Apply <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <a href="/#apply" className="md:hidden btn-primary px-3 py-2 text-sm">Join</a>
        <a href="/#apply" className="hidden md:inline-flex btn-primary">Join Whitelist</a>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="relative py-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/75 text-sm">
        <a href="/" className="flex items-center gap-3 hover:text-white transition">
          <BTCBadge className="h-9 w-9" />
          <WordmarkBP />
        </a>
        <div className="flex items-center gap-6">
          <a href="/terms" className="hover:text-white transition">Terms</a>
          <a href="/privacy" className="hover:text-white transition">Privacy</a>
          <a href="/imprint" className="hover:text-white transition">Imprint</a>
          <span className="text-white/60">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
// В САМОМ НИЗУ файла
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh flex flex-col body-bg text-white overflow-x-hidden">
      <Background />
      <Nav />
      <main id="content" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
