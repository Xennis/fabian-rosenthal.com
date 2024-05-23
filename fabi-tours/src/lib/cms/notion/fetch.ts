import { Client, isFullBlock, isFullPage, iteratePaginatedAPI } from "@notionhq/client"
import { type BlockObjectResponse, type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  timeoutMs: 1000 * 10,
})

type BlockObjectResponseWithChildren = BlockObjectResponse & { _children?: Array<BlockObjectResponseWithChildren> }

export const fetchDatabasePages = async <T>(
  databaseId: string,
  processFn: (page: PageObjectResponse) => T | null,
): Promise<Array<T>> => {
  const result: Array<T> = []
  for await (const item of iteratePaginatedAPI(notionClient.databases.query, {
    database_id: databaseId,
    page_size: 50,
  })) {
    if (isFullPage(item)) {
      const fnResult = processFn(item)
      if (fnResult !== null) {
        result.push(fnResult)
      }
    }
  }
  console.info(`fetched ${result.length} pages from notion database ${databaseId}`)
  return result
}

export const fetchBlocksChildren = async (blockId: string) => {
  const result: Array<BlockObjectResponseWithChildren> = []
  for await (const block of iteratePaginatedAPI(notionClient.blocks.children.list, {
    block_id: blockId,
    page_size: 100,
  })) {
    if (isFullBlock(block)) {
      if (!block.has_children) {
        result.push(block)
      }
      const childId =
        block.type === "synced_block" && block.synced_block.synced_from !== null
          ? block.synced_block.synced_from.block_id
          : block.id

      result.push({
        ...block,
        _children: await fetchBlocksChildren(childId),
      })
    }
  }
  console.info(`fetched children from notion block ${blockId}`)
  return result
}
