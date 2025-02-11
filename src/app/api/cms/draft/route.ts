import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { APIResponseError, isFullPage } from "@notionhq/client"
import { propsPlainTexts } from "@xennis/react-notion-cms-fetch"

import { fetchPage } from "@/lib/cms/fetch"
import { blogPagePost, businessIdeasPage, slugPage } from "@/content/config"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug")

  if (secret !== process.env.API_AUTH_TOKEN || !slug) {
    return new Response("Invalid token", { status: 401 })
  }

  const canonical = await getPostBySlug(slug)
  if (!canonical) {
    return new Response("Invalid canonical", { status: 401 })
  }

  ;(await draftMode()).enable()

  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  redirect(canonical)
}

const getPostBySlug = async (pageId: string) => {
  try {
    const page = await fetchPage(pageId)
    if (isFullPage(page) && page.parent.type === "database_id") {
      return canonicalPathname({
        slug: propsPlainTexts(page.properties, "slug"),
        parentDbId: page.parent.database_id,
      })
    }
  } catch (error) {
    if (error instanceof APIResponseError && error.code === "object_not_found") {
      console.debug(`pageId=${pageId} not found`)
    } else {
      console.warn(`retrieve pageId=${pageId} failed`, error)
    }
  }
  return null
}

const canonicalPathname = ({ slug, parentDbId }: { slug: string | null; parentDbId: string }) => {
  if (slug === null) {
    return null
  }

  switch (parentDbId) {
    case "0decc798-b1fd-4d76-87c8-2ffc8f5e5fa4":
      return blogPagePost(slug)
    case process.env.NOTION_GUIDE_BUSINESS_IDEAS_DB_ID!:
      return businessIdeasPage(slug)
    case process.env.NOTION_PAGES_DB_ID!:
      return slugPage(slug)
  }
  return null
}
