import { unstable_cache } from "next/cache"
import type { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types"
import { fetchDatabasePages } from "@react-notion-cms/fetch"
import { fetchBlocksChildren } from "@react-notion-cms/render"

import { processPages } from "@/lib/cms/pages"
import { i18n } from "@/content/i18n"
import { Client } from "@notionhq/client"
import { processBusinessIdeasPages } from "@/lib/cms/business-ideas"

export const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  timeoutMs: 20 * 1000,
})

export async function getCachedPages() {
  return await unstable_cache(
    async () => {
      const pages = await fetchDatabasePages(notionClient, processPages, {
        database_id: process.env.NOTION_PAGES_DB_ID!,
        page_size: 50,
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
      return fetchBlocksChildren(notionClient, blockId)
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
          canonical: `/en/guides/business-ideas/${p.slug}`,
        }
      })
    },
    ["cms-business-ideas-pages"],
    {
      revalidate: 15 * 60,
    },
  )()
}
