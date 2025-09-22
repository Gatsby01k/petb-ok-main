import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Peter Todd Bitcoin",
    short_name: "PT Bitcoin",
    description:
      "Whitelist application and information hub for strategic Bitcoin supporters.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0b0b0f",
    theme_color: "#f2c14e",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
