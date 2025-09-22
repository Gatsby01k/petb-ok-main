import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms • Bitcoin Peter Todd" };

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-white">
      <h1 className="text-3xl font-extrabold">Terms of Participation</h1>
      <div className="mt-6 space-y-4 text-white/85 leading-relaxed">
        <p>Participation is available through our whitelist. Allocations and rewards are recorded on-chain and reflected in your investor dashboard.</p>
        <p>By submitting an application you confirm your intent to participate and agree to project tokenomics and DAO governance.</p>
      </div>
    </main>
  );
}
