import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { propsPlainTexts, propsNumber, propsSelectName } from "@xennis/react-notion-cms-fetch"

const langSelects = ["de", "en"] as const
export type PageLang = (typeof langSelects)[number]

export type Page = {
  lang: PageLang
  lastEdited: Date
  metaDescription: string
  metaTitle: string
  notionId: string
  pageSubtitle: string | null
  pageTitle: string | null
  sitemapPriority: number
  slug: string
}

const stringToLang = (lang: string | null): PageLang | null => {
  return langSelects.find((s) => s.toString() === lang) ?? null
}

export const processPages = async (page: PageObjectResponse): Promise<Page | null> => {
  const lang = stringToLang(propsSelectName(page.properties, "lang"))
  const lastEdited = new Date(page.last_edited_time)
  const metaDescription = propsPlainTexts(page.properties, "meta-description")
  const metaTitle = propsPlainTexts(page.properties, "meta-title")
  const sitemapPriority = propsNumber(page.properties, "sitemap-priority")
  const slug = propsPlainTexts(page.properties, "slug")

  if (
    !lang ||
    Number.isNaN(lastEdited.getTime()) ||
    !metaDescription ||
    !metaTitle ||
    !sitemapPriority ||
    sitemapPriority < 0 ||
    sitemapPriority > 1 ||
    !slug
  ) {
    console.warn(`page with id=${page.id} and title="${metaTitle}" has invalid properties`)
    return null
  }

  const pageSubtitle = propsPlainTexts(page.properties, "page-subtitle")
  const pageTitle = propsPlainTexts(page.properties, "page-title")

  return {
    lang: lang,
    lastEdited: lastEdited,
    metaDescription: metaDescription,
    metaTitle: metaTitle,
    notionId: page.id,
    pageSubtitle: pageSubtitle,
    pageTitle: pageTitle,
    sitemapPriority: sitemapPriority,
    slug: slug,
  }
}
