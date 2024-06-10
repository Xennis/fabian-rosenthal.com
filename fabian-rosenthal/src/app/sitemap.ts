import { type MetadataRoute } from "next"
import { headers } from "next/headers"

import { homePage } from "@/content/config"
import { i18n } from "@/content/i18n"
import { getCachedBlogPosts, getCachedBlogTags, getCachedBusinessIdeasPages, getCachedPages } from "@/lib/cms/fetchers"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = headers()
  const host = headersList.get("host")!

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
  ;(await getCachedBlogPosts()).forEach((p) => {
    sites.push({
      url: `https://${host}${p.canonical}`,
      lastModified: p.lastEdited,
      priority: 0.8,
    })
  })
  ;(await getCachedBlogTags()).forEach((t) => {
    sites.push({
      url: `https://${host}${t.canonical}`,
      lastModified: new Date(),
      priority: 0.6,
    })
  })
  ;(await getCachedBusinessIdeasPages()).forEach((p) =>
    sites.push({
      url: `https://${host}${p.canonical}`,
      lastModified: p.lastEdited,
      priority: 0.6,
    }),
  )

  return sites
}
