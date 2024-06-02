import { type MetadataRoute } from "next"

import { aboutPage, homePage, host } from "@/content/config"
import { i18n } from "@/content/i18n"
import { getCachedBusinessIdeasPages, getCachedPages } from "@/lib/cms/fetchers"

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
      ],
    )
  })

  const pages = await getCachedPages()
  pages.forEach((p) =>
    sites.push({
      url: `https://${host}${p.canonical}`,
      lastModified: p.lastEdited,
      priority: p.sitemapPriority,
    }),
  )

  if (process.env.VERCEL_ENV !== "production") {
    ;(await getCachedBusinessIdeasPages()).forEach((p) =>
      sites.push({
        url: `https://${host}${p.canonical}`,
        lastModified: p.lastEdited,
        priority: p.sitemapPriority,
      }),
    )
  }

  return sites
}
