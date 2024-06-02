import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { propsCheckbox, propsPlainTexts } from "@react-notion-cms/fetch"
import { type IconResponse } from "@react-notion-cms/render"

import { downloadImageToPublicDir } from "@/lib/cms/image"

export type Page = {
  title: string
  lang: "en"
  slug: string
  sitemapPriority: number
  lastEdited: Date
  blockId: string
  icon: IconResponse
  homePage: boolean
}

export const processBusinessIdeasPages = async (page: PageObjectResponse): Promise<Page | null> => {
  const title = propsPlainTexts(page.properties, "Page")
  const lastEdited = new Date(page.last_edited_time)

  if (!title || Number.isNaN(lastEdited)) {
    console.warn(`page with id=${page.id} and title="${title}" has invalid properties`)
    return null
  }

  let slug = propsPlainTexts(page.properties, "slug")
  if (!slug) {
    // If no slug is set use the one from Notion.
    slug = page.url.replace("https://www.notion.so/", "")
  }
  const homePage = propsCheckbox(page.properties, "home-page") ?? false
  const icon = page.icon
  if (icon !== null && icon.type === "file") {
    icon.file.url = await downloadImageToPublicDir(icon.file.url, { blockId: page.id, lastEditedTime: lastEdited })
  }

  return {
    title: title,
    lang: "en",
    slug: slug,
    sitemapPriority: 0.5,
    lastEdited: lastEdited,
    blockId: page.id,
    icon: page.icon,
    homePage: homePage,
  }
}
