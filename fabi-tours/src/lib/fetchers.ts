import { unstable_cache } from "next/cache"

import { fetchPlaces } from "@/lib/places"

// Avoid calling the Notion API too often (e.g. while developing)
export async function getCachedPlaces() {
  return await unstable_cache(
    async () => {
      return fetchPlaces()
    },
    ["places"],
    {
      revalidate: 5 * 60,
    },
  )()
}
