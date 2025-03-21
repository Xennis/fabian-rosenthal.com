import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { propsCheckbox, propsPlainTexts } from "@xennis/react-notion-cms-fetch"
import { type IconResponse } from "@xennis/react-notion-cms-render"

import { downloadImageToPublicDir } from "@/lib/cms/image"

export type Page = {
  homePage: boolean
  icon: IconResponse
  lastEdited: Date
  notionId: string
  pageSubtitle: string | null
  slug: string
  title: string
}

export const processBusinessIdeasPages = async (page: PageObjectResponse): Promise<Page | null> => {
  const lastEdited = new Date(page.last_edited_time)
  const title = propsPlainTexts(page.properties, "Page")

  if (Number.isNaN(lastEdited.getTime()) || !title) {
    console.warn(`page with id=${page.id} and title="${title}" has invalid properties`)
    return null
  }

  const homePage = propsCheckbox(page.properties, "home-page") ?? false
  const icon = page.icon
  if (icon !== null && icon.type === "file") {
    icon.file.url = await downloadImageToPublicDir(icon.file.url, `page-icon-${page.id}`, lastEdited)
  }
  const pageSubtitle = propsPlainTexts(page.properties, "page-subtitle")
  let slug = propsPlainTexts(page.properties, "slug")
  if (!slug) {
    // If no slug is set use the one from Notion.
    slug = page.url.replace("https://www.notion.so/", "")
  }

  return {
    homePage: homePage,
    icon: page.icon,
    lastEdited: lastEdited,
    notionId: page.id,
    pageSubtitle: pageSubtitle,
    slug: slug,
    title: title,
  }
}
