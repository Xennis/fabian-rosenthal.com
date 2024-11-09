import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { propsPlainTexts, propsNumber } from "@xennis/react-notion-cms-fetch"

export type Page = {
  lastEdited: Date
  metaDescription: string
  metaTitle: string
  notionId: string
  pageSubtitle: string | null
  pageTitle: string | null
  sitemapPriority: number
  slug: string
}

export const processPages = async (page: PageObjectResponse): Promise<Page | null> => {
  const lastEdited = new Date(page.last_edited_time)
  const metaDescription = propsPlainTexts(page.properties, "meta-description")
  const metaTitle = propsPlainTexts(page.properties, "meta-title")
  const sitemapPriority = propsNumber(page.properties, "sitemap-priority")
  const slug = propsPlainTexts(page.properties, "slug")

  if (
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
