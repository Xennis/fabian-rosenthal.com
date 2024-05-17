import { type MetadataRoute } from "next"

import { homePage, host, legalPage } from "@/content/config"
import { i18n } from "@/content/i18n"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sites: MetadataRoute.Sitemap = []
  i18n.locales.forEach((lang) => {
    sites.push(
      ...[
        {
          url: `https://${host}${homePage(lang)}`,
          lastModified: new Date(),
          priority: 1,
        },
        {
          url: `https://${host}${legalPage(lang)}`,
          lastModified: new Date(),
          priority: 0.1,
        },
      ],
    )
  })

  return sites
}
