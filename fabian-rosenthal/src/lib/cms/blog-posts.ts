import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { propsPlainTexts, propsMultiSelectNames, propsStartDate } from "@react-notion-cms/fetch"
import { i18n } from "@/content/i18n"

export type BlogPost = {
  blockId: string
  lang: string
  lastEdited: Date
  metaDescription: string
  pageSubtitle: string | null
  publishDate: Date
  sitemapPriority: number
  slug: string
  title: string
}

export const processPages = async (page: PageObjectResponse): Promise<BlogPost | null> => {
  const lastEdited = new Date(page.last_edited_time)
  const metaDescription = propsPlainTexts(page.properties, "meta-description")
  const publishDate = propsStartDate(page.properties, "publish-date")
  const slug = propsPlainTexts(page.properties, "slug")
  const tags = propsMultiSelectNames(page.properties, "tags")
  const title = propsPlainTexts(page.properties, "title")

  if (Number.isNaN(lastEdited.getTime()) || !metaDescription || !publishDate || !slug || !tags || !title) {
    console.warn(`page with id=${page.id} and title="${title}" has invalid properties`)
    return null
  }

  const pageSubtitle = propsPlainTexts(page.properties, "page-subtitle")

  return {
    blockId: page.id,
    lang: i18n.defaultLocale,
    lastEdited: lastEdited,
    metaDescription: metaDescription,
    pageSubtitle: pageSubtitle,
    publishDate: publishDate,
    sitemapPriority: 0.8,
    slug: slug,
    title: title,
  }
}
