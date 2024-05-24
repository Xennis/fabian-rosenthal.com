import { Client, isFullPage, iteratePaginatedAPI } from "@notionhq/client"
import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  timeoutMs: 1000 * 10,
})

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
