// app/proof/page.tsx
import React from "react";

export const metadata = {
  title: "Proof of Authenticity • BitcoinPeterTodd",
  description: "PGP-signed proof and public key for bitcoinpetertodd.com",
};

export default async function ProofPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/proof.txt.asc`, {
    // при сборке на сервере хватит обычного fetch к static-файлу
    cache: "no-store",
  }).catch(() => null);
  const txt = res && res.ok ? await res.text() : "proof.txt.asc not found";

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-semibold mb-4">🔑 Proof of Authenticity</h1>
      <p className="mb-6">
        Signed with PGP key: <b>info@bitcoinpetertodd.com</b>
      </p>

      <pre className="whitespace-pre-wrap rounded-xl p-4 bg-black/40 border border-white/10 text-sm overflow-x-auto">
{txt}
      </pre>

      <div className="mt-6 space-x-4">
        <a className="underline" href="/publickey.asc" target="_blank" rel="noopener">
          Download public key
        </a>
        <a className="underline" href="/proof.txt.asc" target="_blank" rel="noopener">
          Download signed message
        </a>
      </div>
    </main>
  );
}
