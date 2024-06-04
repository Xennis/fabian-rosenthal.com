import { type MetadataRoute } from "next"

import { aboutPage, blogPagePost, blogTagPage, homePage, host } from "@/content/config"
import { i18n } from "@/content/i18n"
import { getCachedBlogPosts, getCachedBlogTags, getCachedBusinessIdeasPages, getCachedPages } from "@/lib/cms/fetchers"

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
    ;(await getCachedBlogPosts()).forEach((p) => {
      sites.push({
        url: `https://${host}${blogPagePost(p.lang, p.slug)}`,
        lastModified: p.lastEdited,
        priority: p.sitemapPriority,
      })
    })
    ;(await getCachedBlogTags()).forEach((t) => {
      sites.push({
        url: `https://${host}${blogTagPage(i18n.defaultLocale, t)}`,
        lastModified: new Date(),
        priority: 0.6,
      })
    })
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
