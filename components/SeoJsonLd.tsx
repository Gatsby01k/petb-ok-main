// components/SeoJsonLd.tsx
import React from "react";
import { site } from "../lib/seo";

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Peter Todd Bitcoin",
    url: site.url,
    logo: `${site.url}/favicon.ico`, // минимально и по делу
    sameAs: site.sameAs,
    contactPoint: [{ "@type": "ContactPoint", email: site.contactEmail, contactType: "customer support", areaServed: "Worldwide" }],
  };
  return <JsonLd data={data} />;
}

export function ServiceJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Whitelist Application",
    provider: { "@type": "Organization", name: "Peter Todd Bitcoin", url: site.url },
    areaServed: "Worldwide",
    description:
      "Strategic participation with on-chain transparency and DAO governance.",
    offers: [
      { "@type": "Offer", name: "Strategic Investor", priceCurrency: "BTC", price: "1",    url: `${site.url}#apply`, availability: "https://schema.org/InStock" },
      { "@type": "Offer", name: "Premium Supporter",  priceCurrency: "BTC", price: "0.1",  url: `${site.url}#apply`, availability: "https://schema.org/InStock" },
      { "@type": "Offer", name: "Early Partner",      priceCurrency: "BTC", price: "0.01", url: `${site.url}#apply`, availability: "https://schema.org/PreOrder" },
    ],
  };
  return <JsonLd data={data} />;
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } })),
  };
  return <JsonLd data={data} />;
}
