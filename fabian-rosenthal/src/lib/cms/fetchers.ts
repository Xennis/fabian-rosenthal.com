import { unstable_cache } from "next/cache"
import type { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types"
import { fetchDatabasePages } from "@react-notion-cms/fetch"
import { fetchBlocksChildren } from "@react-notion-cms/render"

import { processPages } from "@/lib/cms/pages"
import { i18n } from "@/content/i18n"
import { Client } from "@notionhq/client"
import { processBusinessIdeasPages } from "@/lib/cms/business-ideas"
import { downloadImageToPublicDir } from "@/lib/cms/image"
import { businessIdeasPage } from "@/content/config"
import { processBlogPosts } from "@/lib/cms/blog-posts"

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  timeoutMs: 20 * 1000,
})

export async function getCachedPages() {
  return await unstable_cache(
    async () => {
      const pages = await fetchDatabasePages(notionClient, processPages, {
        database_id: process.env.NOTION_PAGES_DB_ID!,
        page_size: 100,
      })
      return pages.map((p) => {
        const languages: AlternateURLs["languages"] = {}
        i18n.locales.forEach((lang) => {
          languages[lang] = `/${lang}/${p.slug}`
        })
        return {
          ...p,
          canonical: `/${p.lang}/${p.slug}`,
          languages: languages,
        }
      })
    },
    ["cms-pages"],
    {
      revalidate: 5 * 60,
    },
  )()
}

export async function getCachedPage({ lang, slug }: { lang: string; slug: string }) {
  const page = (await getCachedPages()).find((p) => p.lang.toString() === lang && p.slug === slug)
  return page ?? null
}

export async function getCachedPageContent(blockId: string) {
  return await unstable_cache(
    async () => {
      return fetchBlocksChildren(
        notionClient,
        {
          block_id: blockId,
          page_size: 100,
        },
        {
          resolveImageFn: downloadImageToPublicDir,
        },
      )
    },
    [`cms-page-${blockId}`],
    {
      revalidate: 15 * 60,
    },
  )()
}

export async function getCachedBusinessIdeasPages() {
  return await unstable_cache(
    async () => {
      const pages = await fetchDatabasePages(notionClient, processBusinessIdeasPages, {
        database_id: process.env.NOTION_GUIDE_BUSINESS_IDEAS_DB_ID!,
        page_size: 100,
      })
      return pages.map((p) => {
        return {
          ...p,
          canonical: businessIdeasPage(i18n.defaultLocale, p.slug),
        }
      })
    },
    ["cms-business-ideas-pages"],
    {
      revalidate: 15 * 60,
    },
  )()
}

export const getCachedBlogPosts = unstable_cache(
  async () => {
    return await fetchDatabasePages(notionClient, processBlogPosts, {
      database_id: "0decc798-b1fd-4d76-87c8-2ffc8f5e5fa4",
      page_size: 100,
    })
  },
  ["cms-blog-posts"],
  {
    revalidate: 15 * 60,
  },
)

export const getCachedBlogTags = unstable_cache(
  async () => {
    const tags = new Set<string>()
    ;(await getCachedBlogPosts()).forEach((p) => {
      p.tags.forEach((t) => tags.add(t))
    })
    return Array.from(tags)
  },
  ["cms-blog-tags"],
  {
    revalidate: 15 * 60,
  },
)
