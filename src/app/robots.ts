import { MetadataRoute } from "next"

import { host } from "@/lib/links"

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // disallow: "/api/*",
    },
    sitemap: `https://${host}/sitemap.xml`,
  }
}
