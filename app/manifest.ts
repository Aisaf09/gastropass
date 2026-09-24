import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GastroPass — Digital Loyalty Passes",
    short_name: "GastroPass",
    description:
      "Digital loyalty cards for restaurants, issued straight to Apple Wallet and Google Wallet.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0c0b",
    theme_color: "#0d0c0b",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
