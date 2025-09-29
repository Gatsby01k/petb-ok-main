import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function sitemap(): MetadataRoute.Sitemap {
  const h = headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "www.bitcoinpetertodd.com";
  const proto = h.get("x-forwarded-proto") || "https";
  const base = `${proto}://${host}`;
  const lastmod = new Date();

  const routes = [
    "/",          // главная
    "/terms",
    "/privacy",
    "/imprint",
    "/faq",
    "/proof",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: lastmod,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
