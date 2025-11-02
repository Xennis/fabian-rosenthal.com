import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import {
  getCachedBlogPosts,
  getCachedBlogTags,
  getCachedPageContent,
  getCachedPages,
  tagCmsData,
  tagPageContent,
} from "@/lib/cms/fetchers"

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization")
  if (!authHeader) {
    return NextResponse.json({}, { status: 401 })
  }
  if (authHeader.replace("Bearer ", "") !== process.env.API_AUTH_TOKEN) {
    return NextResponse.json({}, { status: 403 })
  }

  let count = 0
  let date: Date | null = null

  try {
    const body = await request.json()
    date = new Date(body.date)
  } catch (error) {
    console.debug("invalid request", error)
    return NextResponse.json({}, { status: 400 })
  }

  revalidateTag(tagCmsData, "max")
  const [pages, blogPosts] = await Promise.all([getCachedPages(), getCachedBlogPosts()])
  for (const p of [...pages, ...blogPosts]) {
    if (p.lastEdited >= date) {
      const tag = tagPageContent(p.notionId)
      console.debug(`revalidate tag ${tag}`)
      revalidateTag(tag, "max")
      await getCachedPageContent(p.notionId)
      count++
    }
  }
  // fill cache
  const tags = await getCachedBlogTags()

  return NextResponse.json({
    databasePages: {
      pages: pages.length,
      blogPosts: blogPosts.length,
    },
    other: {
      blogTags: tags.length,
    },
    pageContent: count,
  })
}
