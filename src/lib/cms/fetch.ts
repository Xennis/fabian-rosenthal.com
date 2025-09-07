import { fetchDatabasePages } from "@xennis/react-notion-cms-fetch"
import { fetchBlocksChildren } from "@xennis/react-notion-cms-render"
import { Client } from "@notionhq/client"
import type { QueryDataSourceParameters } from "@notionhq/client/build/src/api-endpoints"
import { isFullDatabase } from "@notionhq/client/build/src/helpers"

import { Page, processPages } from "@/lib/cms/pages"
import { downloadImageToPublicDir } from "@/lib/cms/image"
import { BlogPost, processBlogPosts } from "@/lib/cms/blog-posts"
import { blogPagePost } from "@/content/config"

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  timeoutMs: 20 * 1000,
})

export const fetchPageContent = async (blockId: string) => {
  return fetchBlocksChildren(
    notionClient,
    {
      block_id: blockId,
      page_size: 100,
    },
    {
      resolveImageFn: (url: string, meta: { blockId: string; lastEditedTime: Date }) =>
        downloadImageToPublicDir(url, `image-${meta.blockId}`, meta.lastEditedTime),
    },
  )
}

export const fetchPage = (pageId: string) => notionClient.pages.retrieve({ page_id: pageId })

export const fetchPages = async (): Promise<Array<Page>> =>
  fetchDatabasePages(notionClient, processPages, {
    data_source_id: await mustGetFirstDataSourceId(process.env.NOTION_PAGES_DB_ID!),
    page_size: 100,
    filter: {
      property: "archived",
      type: "checkbox",
      checkbox: {
        equals: false,
      },
    },
  })

export const fetchBlogPosts = async (draftMode?: boolean): Promise<Array<BlogPost & { canonical: string }>> => {
  const filter: QueryDataSourceParameters["filter"] =
    draftMode === true
      ? undefined
      : {
          property: "public",
          type: "checkbox",
          checkbox: {
            equals: true,
          },
        }
  const posts = await fetchDatabasePages(notionClient, processBlogPosts, {
    data_source_id: await mustGetFirstDataSourceId("0decc798-b1fd-4d76-87c8-2ffc8f5e5fa4"),
    page_size: 100,
    filter: filter,
    sorts: [
      {
        property: "publish-date",
        direction: "descending",
      },
    ],
  })
  return posts.map((p) => ({
    ...p,
    canonical: blogPagePost(p.slug),
  }))
}

// Workaround for @notionhq/client v5.
const mustGetFirstDataSourceId = async (database_id: string): Promise<string> => {
  const db = await notionClient.databases.retrieve({ database_id: database_id })
  if (isFullDatabase(db) && db.data_sources.length > 0) {
    return db.data_sources[0].id
  }
  throw Error("No data source found in database " + database_id)
}
