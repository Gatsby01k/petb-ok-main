import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bitcoin Peter Todd",
    short_name: "Bitcoin PT",
    description:
      "Investments and strategic support: Peter Todd Bitcoin is launching a next-generation blockchain, offering a limited circle of investors a unique opportunity to become co-owners of the project. Every contribution is recorded on-chain, ensuring transparency and legal integrity.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0b0b0f",
    theme_color: "#f2c14e",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  };
}
