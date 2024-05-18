import type { MetadataRoute } from "next"

import { brandColor } from "@/content/config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FabiTours",
    short_name: "FabiTours",
    description: "Discover the green spaces of Hamburg",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: brandColor,
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
    ],
  }
}
