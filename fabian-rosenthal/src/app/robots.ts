import { type MetadataRoute } from "next"

import { host } from "@/lib/links"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // disallow: "/api/*",
    },
    sitemap: `https://${host}/sitemap.xml`,
  }
}
