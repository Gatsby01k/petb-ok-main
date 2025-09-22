// lib/seo.ts
export const site = {
  url: "https://www.bitcoinpetertodd.com", // используем www, как в проде
  title: "Peter Todd Bitcoin",
  description:
    "Next-generation Bitcoin initiative with on-chain transparency, DAO governance and a private whitelist for strategic supporters.",
  themeColor: "#f2c14e",
  twitterHandle: "@Peter_Todd_BTC",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@bitcoinpetertodd.com",
  sameAs: [
    "https://x.com/Peter_Todd_BTC",
    "https://www.facebook.com/PeterToddBitcoin",
    "https://www.linkedin.com/company/peter-todd-bitcoin/",
    "https://www.instagram.com/petertoddbitcoin/",
    "https://t.me/PeterTodd_Bitcoin",
  ],
} as const;
