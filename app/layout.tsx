import "./globals.css";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { site } from "@/lib/seo"; // из SEO-пакета
// import GA from "@/components/GA"; // опционально (Google Analytics)

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

function getBaseUrl() {
  const h = headers();
  const host = h.get("x-forwarded-host") || h.get("host");
  const proto = h.get("x-forwarded-proto") || "https";
  const envBase = process.env.NEXT_PUBLIC_SITE_URL;
  return envBase || (host ? `${proto}://${host}` : site.url);
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const title = site.title;
  const description = site.description;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: "%s • Peter Todd Bitcoin",
    },
    description,
    keywords: [
      "Bitcoin",
      "Peter Todd",
      "strategic investment",
      "on-chain transparency",
      "whitelist",
    ],
    alternates: { canonical: baseUrl },
    openGraph: {
      type: "website",
      url: baseUrl,
      siteName: "Peter Todd Bitcoin",
      title,
      description,
      images: [
        {
          url: "/og/og-default.png",
          width: 1200,
          height: 630,
          alt: "Peter Todd Bitcoin — Whitelist Application",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og/og-default.png"],
      creator: site.twitterHandle,
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icons/icon-32.png", sizes: "32x32" },
        { url: "/icons/icon-192.png", sizes: "192x192" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    category: "finance",
    applicationName: "Peter Todd Bitcoin",
    creator: "Peter Todd",
    publisher: "Peter Todd",
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen text-white selection:bg-amber-300 selection:text-black">
        {/* <GA /> */}
        {children}
      </body>
    </html>
  );
}
