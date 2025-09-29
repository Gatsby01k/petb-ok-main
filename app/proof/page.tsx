import type { Metadata } from "next";
import { headers } from "next/headers";
import { PageShell, FrameCard } from "../../components/SiteChrome";

export const metadata: Metadata = {
  title: "Proof of Authenticity • Bitcoin Peter Todd",
  description: "PGP-signed proof and public key for bitcoinpetertodd.com",
};

function getBaseUrl() {
  const h = headers();
  const host = h.get("x-forwarded-host") || h.get("host");
  const proto = h.get("x-forwarded-proto") || "https";
  const envBase = process.env.NEXT_PUBLIC_SITE_URL;
  return envBase || (host ? `${proto}://${host}` : "https://www.bitcoinpetertodd.com");
}

export default async function ProofPage() {
  const base = getBaseUrl();
  let proof = "proof.txt.asc not found";
  try {
    const res = await fetch(`${base}/proof.txt.asc`, { cache: "no-store" });
    if (res.ok) proof = await res.text();
  } catch {
    // ignore
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <FrameCard glow>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Proof of Authenticity</h1>

          <div className="mt-4 text-white/85">
            Signed with PGP key: <b>info@bitcoinpetertodd.com</b>
          </div>

          <pre className="mt-6 whitespace-pre-wrap rounded-xl p-4 bg-black/40 border border-white/10 text-sm overflow-x-auto">
{proof}
          </pre>

          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a href="/publickey.asc" target="_blank" rel="noopener" className="underline">
              Download public key
            </a>
            <a href="/proof.txt.asc" target="_blank" rel="noopener" className="underline">
              Download signed message
            </a>
          </div>
        </FrameCard>
      </div>
    </PageShell>
  );
}
