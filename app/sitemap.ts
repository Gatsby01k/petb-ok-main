import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://bitcoinpetertodd.com";
  const now = new Date().toISOString();

  const routes: string[] = ["/", "/faq", "/terms", "/privacy"].filter(Boolean);

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
