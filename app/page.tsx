"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Zap, Coins, PieChart, Crown, Star, Check, ChevronDown } from "lucide-react";

/* =========================
   BRAND: минимал ₿ + слово-знак
   (лого появится ТОЛЬКО в шапке и футере)
========================= */

function BTCBadge({ className = "" }) {
  return (
    <span className={`btc-badge ${className}`}>
      <span className="btc-glyph" aria-hidden>₿</span>
    </span>
  );
}

function WordmarkBP() {
  return (
    <span className="bp-wordmark inline-flex items-baseline gap-3">
      <span className="bp-main font-extrabold tracking-tight leading-none">Bitcoin</span>
      <span aria-hidden className="bp-divider" />
      <span className="bp-sub uppercase tracking-[0.16em] font-semibold">Peter&nbsp;Todd</span>
    </span>
  );
}

/* =========================
   BACKGROUND + cursor sheen (вместо свечения)
========================= */

function Background() {
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

/** Диагональный световой "sheen"-слой, мягко следует за курсором (без круглого блика) */
function MouseSheen() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    let raf = 0;
    const onMove = (e) => {
      const x = e.clientX + "px";
      const y = e.clientY + "px";
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.setProperty("--mx", x);
          ref.current.style.setProperty("--my", y);
        }
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="mouse-sheen" aria-hidden />;
}

/* =========================
   UI helpers
========================= */

function FrameCard({ children, className = "", glow = false }) {
  return (
    <div className={`frame ${glow ? "frame-glow" : ""} ${className}`}>
      <div className="frame-inner">{children}</div>
    </div>
  );
}

/* ===== кастомный тёмный select для Tiers ===== */

const TIER_OPTIONS = [
  { label: "Strategic Investor (≥ 1 BTC)", value: "Strategic Investor", note: "1% equity • x10 airdrop" },
  { label: "Premium Supporter (≥ 0.1 BTC)", value: "Premium Supporter", note: "x5 airdrop • priority access" },
  { label: "Early Partner (≥ 0.01 BTC)", value: "Early Partner", note: "x2 airdrop • early perks" },
];

function TierSelect({ name, defaultValue }) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(
    TIER_OPTIONS.find((t) => t.value === defaultValue) || TIER_OPTIONS[0]
  );
  const btnRef = React.useRef(null);
  const listRef = React.useRef(null);

  React.useEffect(() => {
    const onDoc = (e) => {
      if (!open) return;
      if (!btnRef.current?.contains(e.target) && !listRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (open && e.key === "Escape") setOpen(false);
  };

  return (
    <div className="relative">
      <input type="hidden" name={name} value={selected.value} />
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className="select-btn"
      >
        <span className="flex flex-col text-left">
          <span className="text-white">{selected.value}</span>
          {selected.note && <span className="text-xs text-white/60">{selected.note}</span>}
        </span>
        <ChevronDown className="h-4 w-4 opacity-80" />
      </button>

      {open && (
        <div ref={listRef} role="listbox" tabIndex={-1} className="select-menu">
          {TIER_OPTIONS.map((opt) => {
            const isActive = opt.value === selected.value;
            return (
              <button
                key={opt.value}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
                className={`select-item ${isActive ? "is-active" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`check ${isActive ? "on" : ""}`}>
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="label">{opt.label}</span>
                    {opt.note && <span className="note">{opt.note}</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* =========================
   DATA
========================= */

const tiers = [
  {
    name: "Strategic Investor",
    min: "From 1 BTC",
    equity: "1% company equity",
    perks: ["x10 $PETB Airdrop", "Permanent DAO council seat", "Revenue share from network fees"],
    icon: Crown,
    accent: "from-yellow-500 to-amber-500",
    badge: "Top Tier",
  },
  {
    name: "Premium Supporter",
    min: "From 0.1 BTC",
    equity: null,
    perks: [
      "x5 $PETB Airdrop",
      "Priority access to all releases",
      "Enhanced yields in staking projects",
      "Access to insights and private analytics",
    ],
    icon: Star,
    accent: "from-amber-500 to-orange-500",
    badge: "Pro",
  },
  {
    name: "Early Partner",
    min: "From 0.01 BTC",
    equity: null,
    perks: ["x2 $PETB Airdrop", "Bonus conditions for future grant rounds"],
    icon: Coins,
    accent: "from-amber-300 to-lime-400",
    badge: "Early",
  },
];

/* =========================
   NAV / HERO / SECTIONS / FOOTER
========================= */

const Nav = () => (
  <nav className="sticky top-0 z-40 w-full glass">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
      <a href="#home" className="group inline-flex items-center gap-2 sm:gap-3">
        <BTCBadge className="h-9 w-9" />
        <WordmarkBP />
      </a>
      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-white/75">
        <a href="#vision" className="hover:text-white transition">Vision</a>
        <a href="#tiers" className="hover:text-white transition">Tiers</a>
        <a href="#onchain" className="hover:text-white transition">On-chain</a>
        <a href="#faq" className="hover:text-white transition">FAQ</a>
        <a href="#apply" className="hover:text-white transition inline-flex items-center gap-2">
          Apply <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <a href="#apply" className="md:hidden btn-primary px-3 py-2 text-sm">Join</a>
      <a href="#apply" className="hidden md:inline-flex btn-primary">Join Whitelist</a>
    </div>
  </nav>
);

/** Hero: ВОЗВРАЩАЮ оригинальные тексты как были у тебя */
function Hero() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yTitleSpring = useSpring(yTitle, { stiffness: 80, damping: 20 });

  return (
    <section id="home" ref={ref} className="relative overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-24 md:pt-28 pb-16 sm:pb-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] sm:text-xs text-white/80 mb-5 sm:mb-6">
          <Sparkles className="h-3.5 w-3.5" /> Awwwards-style concept
        </div>

        <motion.h1 style={{ y: yTitleSpring }} className="text-[9vw] sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.05] drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">
          The future of Bitcoin
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow-[0_2px_8px_rgba(255,200,0,0.25)]">
            powered by Peter Todd
          </span>
        </motion.h1>

        <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-white/85 mx-auto max-w-2xl sm:max-w-3xl">
          Investments and strategic support: Peter Todd Bitcoin is launching a next-generation blockchain, offering a limited circle of investors a unique opportunity to become co-owners of the project. Every contribution is recorded on-chain, ensuring transparency and legal integrity.
        </p>

        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3 sm:gap-4">
          <a href="#apply" className="btn-primary inline-flex items-center gap-2">
            Join <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#tiers" className="btn-ghost">View Tiers</a>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/70 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> On-chain Proof</span>
          <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4"/> High-throughput L1</span>
          <span className="inline-flex items-center gap-2"><PieChart className="h-4 w-4"/> DAO Governance</span>
        </div>
      </div>
    </section>
  );
}

const Vision = () => (
  <section id="vision" className="relative py-16 md:py-24 scroll-mt-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
      <FrameCard glow>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why Peter Todd Bitcoin?</h2>
        <p className="mt-4 text-white/85 leading-relaxed">
          We are designing a sustainable monetary network with a focus on verifiability, modular scalability, and fee-based economics, where participants receive a share of the network’s value.
        </p>
        <ul className="mt-6 space-y-3 text-white/85">
          <li className="flex items-start gap-3"><span className="bullet" /> Uncompromising transparency: funds and shares are managed by smart contracts.</li>
          <li className="flex items-start gap-3"><span className="bullet" /> Legal clarity: KYC/AML processes and shareholder registries.</li>
          <li className="flex items-start gap-3"><span className="bullet" /> DAO synergy: voting, treasury, and on-chain reporting.</li>
        </ul>
      </FrameCard>
      <FrameCard>
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-bold text-white">Tokenomics & Governance</h3>
          <div className="text-xs text-white/70">v0.1</div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 text-white/85">
          <div className="mini-card">
            <div className="mini-k">DAO Council</div>
            <div className="mini-v">Strategists</div>
            <p className="mini-d">Permanent seats for top investors.</p>
          </div>
          <div className="mini-card">
            <div className="mini-k">Network Fees</div>
            <div className="mini-v">Rev-Share</div>
            <p className="mini-d">A portion of fees is distributed to holders under DAO rules.</p>
          </div>
          <div className="mini-card">
            <div className="mini-k">Incentives</div>
            <div className="mini-v">Airdrop</div>
            <p className="mini-d">With multipliers depending on tier participation.</p>
          </div>
          <div className="mini-card">
            <div className="mini-k">Compliance</div>
            <div className="mini-v">Reg-Ready</div>
            <p className="mini-d">A framework for transparent ownership and equity tracking.</p>
          </div>
        </div>
      </FrameCard>
    </div>
  </section>
);

const Tiers = () => (
  <section id="tiers" className="relative py-16 md:py-24 scroll-mt-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Participation Tiers</h2>
        <p className="mt-3 text-white/75">Choose your strategy and unlock the project’s on-chain economy.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: "easeOut" }}
          >
            <FrameCard>
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2">
                  <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${t.accent} grid place-items-center`}>
                    <t.icon className="h-5 w-5 text-black/70" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{t.name}</h3>
                </div>
                <span className="chip">{t.badge}</span>
              </div>
              <div className="mt-4 text-white/85">
                <div className="mini-k uppercase">Minimum</div>
                <div className="text-lg font-semibold">{t.min}</div>
                {t.equity && <div className="equity">{t.equity}</div>}
                <ul className="mt-5 space-y-3">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-3"><span className="bullet" /> {p}</li>
                  ))}
                </ul>
                <a href="#apply" className="btn-line mt-6 inline-flex">
                  Apply <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </div>
            </FrameCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const OnChain = () => (
  <section id="onchain" className="relative py-16 md:py-24 scroll-mt-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
      <FrameCard glow>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">On-chain Confirmations</h2>
        <p className="mt-3 text-white/85">Every contribution is tied to a transaction. Public registries and Merkle proofs confirm participation.</p>
        <div className="mt-6 grid sm:grid-cols-3 gap-4 text-white/85">
          {["TX Explorer", "DAO Snapshot", "Audit Trail"].map((k) => (
            <div key={k} className="mini-card">
              <div className="mini-k">{k}</div>
              <div className="mini-v">Live</div>
              <a href="#" className="mini-link">Open →</a>
            </div>
          ))}
        </div>
      </FrameCard>
      <FrameCard>
        <h3 className="text-xl sm:text-2xl font-bold text-white">How it works</h3>
        <ol className="mt-4 list-decimal pl-5 text-white/85 space-y-2">
          <li>Send BTC to a designated multi-sig address.</li>
          <li>Receive an on-chain receipt and an NFT participation certificate.</li>
          <li>At the end of the round, $PETB is minted and the airdrop is distributed.</li>
          <li>Manage your stake via the DAO and receive fee revenue sharing.</li>
        </ol>
        <div className="mt-6 text-xs text-white/70">Important: demonstration interface only. Ensure legal review and compliance with your local regulation before any real fundraising.</div>
      </FrameCard>
    </div>
  </section>
);

const Apply = () => {
  const [submitting, setSubmitting] = React.useState(false);
  const onSubmitApply = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      fullName: String(fd.get("fullName") || fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      tier: String(fd.get("tier") || ""),
      amount: String(fd.get("amount") || ""),
      message: String(fd.get("message") || ""),
      consent: !!fd.get("consent"),
      hp: String(fd.get("website") || ""),
    };
    try {
      setSubmitting(true);
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      let j = {};
      try { j = await res.json(); } catch {}
      if (!res.ok || j?.ok === false) {
        const details = j?.missing ? ` (${j.missing.join(", ")})` : "";
        throw new Error((j?.error || res.statusText || "Submit failed") + details);
      }
      alert("Application sent. We'll contact you soon.");
      form.reset();
    } catch (err) {
      alert("Error: " + (err?.message || "Unknown"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="apply" className="relative py-16 md:py-24 scroll-mt-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <FrameCard glow>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Whitelist Application</h2>
              <p className="mt-2 text-white/85">Share your contact details and intended tier. We’ll reach out for KYC/AML and on-chain instructions.</p>
            </div>

            <form className="grid sm:grid-cols-2 gap-4" action="/api/apply" method="POST" noValidate onSubmit={onSubmitApply}>
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="sm:col-span-1">
                <label htmlFor="fullName" className="label">Full name</label>
                <input id="fullName" name="fullName" required placeholder="Satoshi Nakamoto" className="input" />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="label">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@domain.com" className="input" />
              </div>

              <div className="sm:col-span-1">
                <label className="label">Participation tier</label>
                <TierSelect name="tier" />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="amount" className="label">Intended contribution (BTC)</label>
                <input id="amount" name="amount" type="number" step="0.00000001" placeholder="1.00" className="input" />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="label">Message</label>
                <textarea id="message" name="message" rows={4} placeholder="Briefly describe your background and expectations" className="input" />
              </div>

              <div className="sm:col-span-2 flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-white/80 text-sm">
                  <input name="consent" type="checkbox" required className="accent-yellow-400" />
                  I agree to personal data processing
                </label>

                <button type="submit" disabled={submitting} aria-busy={submitting} className="btn-primary">
                  {submitting ? "Sending…" : "Submit application"}
                </button>
              </div>
            </form>

            <div className="text-xs text-white/70">
              Disclaimer: this is informational only and not investment advice. Use of the name “Peter Todd” requires appropriate permission/rights. Ensure compliance with applicable regulations.
            </div>
          </div>
        </FrameCard>
      </div>
    </section>
  );
};

const FAQ = () => (
  <section id="faq" className="relative py-16 md:py-24 scroll-mt-24">
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { q: "Is this a public offer?", a: "No. This website is a demonstration concept. A formal legal review and official documentation are required before launch." },
          { q: "What does on-chain recording mean?", a: "Each contribution is linked to a transaction and address, validated by a smart contract, and viewable in a blockchain explorer." },
          { q: "How is rev-share distributed?", a: "Under DAO rules — based on ownership snapshots and votes; details are published in on-chain reports." },
          { q: "Can I exit?", a: "Depends on tokenomics and local regulation: cliff/vesting periods and secondary markets may apply." },
        ].map((item, i) => (
          <FrameCard key={i}>
            <h3 className="text-lg font-bold text-white">{item.q}</h3>
            <p className="mt-2 text-white/85">{item.a}</p>
          </FrameCard>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative py-10 border-t border-white/10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/75 text-sm">
      <a href="#home" className="flex items-center gap-3 hover:text-white transition">
        <BTCBadge className="h-9 w-9" />
        <WordmarkBP />
      </a>
      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-white transition">Terms</a>
        <a href="#" className="hover:text-white transition">Privacy</a>
        <a href="#" className="hover:text-white transition">Imprint</a>
        <span className="text-white/60">© {new Date().getFullYear()}</span>
      </div>
    </div>
    <div className="pb-[env(safe-area-inset-bottom)]" />
  </footer>
);

export default function Page() {
  return (
    <div className="min-h-screen body-bg text-white relative overflow-x-hidden">
      <Background />
      <MouseSheen />
      <Nav />
      <Hero />   {/* ← вернул оригинальные тексты */}
      <section id="vision-anchor"><Vision /></section>
      <Tiers />
      <OnChain />
      <Apply />
      <FAQ />
      <Footer />
    </div>
  );
}
