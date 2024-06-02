import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { propsPlainTexts } from "@react-notion-cms/fetch"
import { type IconResponse } from "@react-notion-cms/render"

export type Page = {
  title: string
  lang: "en"
  slug: string
  sitemapPriority: number
  lastEdited: Date
  blockId: string
  icon: IconResponse
}

export const processBusinessIdeasPages = async (page: PageObjectResponse): Promise<Page | null> => {
  const title = propsPlainTexts(page.properties, "Page")
  const lastEdited = new Date(page.last_edited_time)

  if (!title || Number.isNaN(lastEdited)) {
    console.warn(`page with id=${page.id} and title="${title}" has invalid properties`)
    return null
  }

  return {
    title: title,
    lang: "en",
    slug: page.url.replace("https://www.notion.so/", ""),
    sitemapPriority: 0.5,
    lastEdited: lastEdited,
    blockId: page.id,
    icon: page.icon,
  }
}
