export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bitcoinpetertodd.com/",
  title: "The Future of Bitcoin — Transparent, Strategic, On-Chain",
  description:
    "Whitelist application for strategic Bitcoin supporters led by Peter Todd. Transparent tiers, on-chain guarantees, and early-partner access.",
  themeColor: "#f2c14e",
  twitterHandle: "@peter_todd_btc", // поправь при необходимости
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@bitcoinpetertodd.com",
  sameAs: [
    "https://twitter.com/peter_todd_btc",
    "https://www.linkedin.com/company/peter-todd-bitcoin/",
  ],
} as const;
