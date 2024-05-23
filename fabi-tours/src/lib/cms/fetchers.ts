import { unstable_cache } from "next/cache"

import { processPlace } from "@/lib/cms/collections/places"
import { fetchDatabasePages } from "@/lib/cms/notion/fetch"

// Avoid calling the Notion API too often (e.g. while developing)
export async function getCachedPlaces() {
  return await unstable_cache(
    async () => {
      return fetchDatabasePages(process.env.NOTION_PLACES_DB_ID!, processPlace)
    },
    ["cms-places"],
    {
      revalidate: 5 * 60,
    },
  )()
}
