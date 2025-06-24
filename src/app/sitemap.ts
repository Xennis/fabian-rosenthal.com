import { type MetadataRoute } from "next"

import { getCachedBlogPosts, getCachedBlogTags, getCachedPages } from "@/lib/cms/fetchers"
import { host } from "@/lib/next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sites: MetadataRoute.Sitemap = [
    {
      url: `https://${host}`,
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

  return sites
}
