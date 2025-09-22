import type { Metadata } from "next";

export const metadata: Metadata = { title: "FAQ • Bitcoin Peter Todd" };

const faqs = [
  { q: "Is this a public offer?", a: "No. Access is only through our whitelist with fixed allocations and on-chain confirmation." },
  { q: "What does on-chain recording mean?", a: "Every contribution is written to the blockchain and permanently verifiable." },
  { q: "How is rev-share distributed?", a: "Revenue share is paid automatically under DAO rules based on token balances." },
  { q: "Can I exit?", a: "Yes. After the lock-up, allocations can be transferred or traded on supported markets." },
] as const;

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-16 text-white">
      <h1 className="text-3xl font-extrabold">FAQ</h1>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {faqs.map((i, idx) => (
          <div key={idx} className="frame"><div className="frame-inner">
            <h2 className="text-lg font-bold">{i.q}</h2>
            <p className="mt-2 text-white/85">{i.a}</p>
          </div></div>
        ))}
      </div>
    </main>
  );
}
