// app/robots.ts
import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function robots(): MetadataRoute.Robots {
  const h = headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "www.bitcoinpetertodd.com";
  const proto = h.get("x-forwarded-proto") || "https";
  const base = `${proto}://${host}`;
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${base}/sitemap.xml`, host: base };
}
