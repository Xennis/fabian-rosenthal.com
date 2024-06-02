import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { propsPlainTexts, propsNumber, propsSelect } from "@react-notion-cms/fetch"

const langSelects = ["de", "en"] as const
export type PageLang = (typeof langSelects)[number]

export type Page = {
  metaTitle: string
  metaDescription: string
  lang: PageLang
  slug: string
  sitemapPriority: number
  pageTitle: string | null
  pageSubtitle: string | null
  lastEdited: Date
  blockId: string
}

const stringToLang = (lang: string | null): PageLang | null => {
  return langSelects.find((s) => s.toString() === lang) ?? null
}

export const processPages = async (page: PageObjectResponse): Promise<Page | null> => {
  const metaTitle = propsPlainTexts(page.properties, "meta-title")
  const metaDescription = propsPlainTexts(page.properties, "meta-description")
  const lang = stringToLang(propsSelect(page.properties, "lang"))
  const slug = propsPlainTexts(page.properties, "slug")
  const sitemapPriority = propsNumber(page.properties, "sitemap-priority")
  const lastEdited = new Date(page.last_edited_time)

  if (
    !metaTitle ||
    !lang ||
    !slug ||
    !metaDescription ||
    !sitemapPriority ||
    sitemapPriority < 0 ||
    sitemapPriority > 1 ||
    Number.isNaN(lastEdited)
  ) {
    console.warn(`page with id=${page.id} and title="${metaTitle}" has invalid properties`)
    return null
  }

  const pageTitle = propsPlainTexts(page.properties, "page-title")
  const pageSubtitle = propsPlainTexts(page.properties, "page-subtitle")

  return {
    metaTitle: metaTitle,
    metaDescription: metaDescription,
    lang: lang,
    slug: slug,
    sitemapPriority: sitemapPriority,
    pageTitle: pageTitle,
    pageSubtitle: pageSubtitle,
    lastEdited: lastEdited,
    blockId: page.id,
  }
}
