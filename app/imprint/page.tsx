import type { Metadata } from "next";

export const metadata: Metadata = { title: "Imprint • Bitcoin Peter Todd" };

export default function ImprintPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-white">
      <h1 className="text-3xl font-extrabold">Imprint</h1>
      <div className="mt-6 space-y-4 text-white/85 leading-relaxed">
        <p><strong>Peter Todd Bitcoin</strong><br/>Blockchain Innovation &amp; Strategic Investments</p>
        <p>
          Contact: <a href="mailto:info@bitcoinpetertodd.com" className="text-yellow-300">info@bitcoinpetertodd.com</a><br/>
          Investors: <a href="mailto:invest@bitcoinpetertodd.com" className="text-yellow-300">invest@bitcoinpetertodd.com</a>
        </p>
        <p>LinkedIn: <a href="https://www.linkedin.com/company/peter-todd-bitcoin/" target="_blank" rel="noreferrer" className="text-yellow-300">linkedin.com/company/peter-todd-bitcoin</a></p>
      </div>
    </main>
  );
}
