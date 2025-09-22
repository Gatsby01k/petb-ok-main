import React from "react";
import { site } from "../lib/seo";

type Props = { data: object };

function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Peter Todd Bitcoin",
    url: site.url,
    logo: `${site.url}/og/og-default.png`,
    sameAs: site.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: site.contactEmail,
        contactType: "customer support",
        areaServed: "Worldwide",
      },
    ],
  };
  return <JsonLd data={data} />;
}

export function ServiceJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Whitelist Application",
    provider: {
      "@type": "Organization",
      name: "Peter Todd Bitcoin",
      url: site.url,
    },
    areaServed: "Worldwide",
    description:
      "Strategic participation tiers for supporters seeking on-chain transparency and Bitcoin-native guarantees.",
    offers: [
      {
        "@type": "Offer",
        name: "Strategic Investor",
        priceCurrency: "BTC",
        price: "1",
        url: `${site.url}#apply`,
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Premium Supporter",
        priceCurrency: "BTC",
        price: "0.2",
        url: `${site.url}#apply`,
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Early Partner",
        priceCurrency: "BTC",
        price: "0",
        url: `${site.url}#apply`,
        availability: "https://schema.org/PreOrder",
      },
    ],
  };
  return <JsonLd data={data} />;
}

export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: i.answer,
      },
    })),
  };
  return <JsonLd data={data} />;
}
