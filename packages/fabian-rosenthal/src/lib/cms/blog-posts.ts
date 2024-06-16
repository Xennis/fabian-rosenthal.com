import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { propsPlainTexts, propsMultiSelectNames, propsStartDate } from "@xennis/react-notion-cms-fetch"
import { i18n } from "@/content/i18n"
import { downloadImageToPublicDir } from "@/lib/cms/image"

export type Tag = string

export type BlogPost = {
  lang: string
  lastEdited: Date
  metaDescription: string
  notionId: string
  ogImage: string | null
  pageSubtitle: string | null
  publishDate: Date
  slug: string
  tags: Array<Tag>
  title: string
}

export const processBlogPosts = async (page: PageObjectResponse): Promise<BlogPost | null> => {
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

  let ogImage = propsFirstInternalFilesUrl(page.properties, "og-image")
  if (ogImage !== null) {
    ogImage = await downloadImageToPublicDir(ogImage, `page-og-image-${page.id}`, lastEdited)
  }
  const pageSubtitle = propsPlainTexts(page.properties, "page-subtitle")

  return {
    lang: i18n.defaultLocale,
    lastEdited: lastEdited,
    metaDescription: metaDescription,
    notionId: page.id,
    ogImage: ogImage,
    pageSubtitle: pageSubtitle,
    publishDate: publishDate,
    slug: slug,
    tags: tags,
    title: title,
  }
}

const propsFirstInternalFilesUrl = (properties: PageObjectResponse["properties"], name: string) => {
  const prop = properties[name]
  if (prop?.type === "files" && prop.files.length > 0) {
    for (const f of prop.files) {
      if (f.type === "file") {
        return f.file.url
      }
    }
  }
  return null
}

export const tagToString = (tag: Tag) => {
  switch (tag) {
    case "accessibility":
      return "Accessibility"
    case "frontend":
      return "Frontend"
    case "nextjs":
      return "Next.js"
    case "seo":
      return "SEO"
    case "tailwind-css":
      return "Tailwind CSS"
    default:
      return tag.toString()
  }
}
