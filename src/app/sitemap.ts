import { MetadataRoute } from "next"

import { aboutPage, host, legalNoticePage } from "@/lib/links"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `https://${host}`,
      priority: 1,
    },
    {
      url: `https://${host}${aboutPage}`,
      priority: 0.7,
    },
    {
      url: `https://${host}${legalNoticePage}`,
      priority: 0.1,
    },
  ]
}
