import { MetadataRoute } from "next"

import { aboutPage, homePage, host, legalPage } from "@/lib/links"
import { i18n } from "@/content/i18n/config"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sites: MetadataRoute.Sitemap = []
  i18n.locales.forEach((lang) => {
    sites.push(
      ...[
        {
          url: `https://${host}${homePage(lang)}`,
          priority: 1,
        },
        {
          url: `https://${host}${aboutPage(lang)}`,
          priority: 0.7,
        },
        {
          url: `https://${host}${legalPage(lang)}`,
          priority: 0.1,
        },
      ],
    )
  })

  return sites
}
