import { type MetadataRoute } from "next"

import { homePage } from "@/content/config"
import { getCachedBlogPosts, getCachedBlogTags, getCachedBusinessIdeasPages, getCachedPages } from "@/lib/cms/fetchers"
import { host } from "@/lib/next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sites: MetadataRoute.Sitemap = [
    {
      url: `https://${host}${homePage}`,
      lastModified: new Date(),
      priority: 1,
    },
  ]

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
