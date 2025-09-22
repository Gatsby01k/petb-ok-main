// app/sitemap.ts
import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function sitemap(): MetadataRoute.Sitemap {
  const h = headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "www.bitcoinpetertodd.com";
  const proto = h.get("x-forwarded-proto") || "https";
  const base = `${proto}://${host}`;
  return [{ url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
