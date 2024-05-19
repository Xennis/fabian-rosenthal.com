import { type MetadataRoute } from "next"

import { aboutPage, homePage, host, legalPage, voluntarySupport } from "@/content/config"
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
          url: `https://${host}${aboutPage(lang)}`,
          lastModified: new Date(),
          priority: 0.8,
        },
        // {
        //   url: `https://${host}${newsletterPage(lang)}`,
        //   lastModified: new Date(),
        //   priority: 0.8,
        // },
        {
          url: `https://${host}${voluntarySupport(lang)}`,
          lastModified: new Date(),
          priority: 0.7,
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
