import { Client, isFullPage, iteratePaginatedAPI } from "@notionhq/client"
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import type { Feature, Position } from "geojson"
import type { GeoJSONSourceRaw } from "mapbox-gl"

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  timeoutMs: 1000 * 10,
})

const propsFirstPlainText = (properties: PageObjectResponse["properties"], name: string) => {
  const prop = properties[name]
  if (prop?.type === "rich_text" && prop.rich_text.length > 0) {
    return prop.rich_text[0].plain_text
  }
  if (prop?.type === "title" && prop.title.length > 0) {
    return prop.title[0].plain_text
  }
  return null
}

const stringToPosition = (raw: string | null): Position | null => {
  if (!raw) {
    return null
  }
  const split = raw.split(",")
  if (split.length !== 2) {
    console.warn(`invalid location: ${raw}`)
    return null
  }
  const lng = Number(split[0])
  const lat = Number(split[1])
  if (Number.isNaN(lng) || Number.isNaN(lat)) {
    console.warn(`invalid location: ${raw}`)
    return null
  }
  return [lng, lat]
}

export const fetchPlaces = async (): Promise<GeoJSONSourceRaw> => {
  const features = []
  for await (const block of iteratePaginatedAPI(notionClient.databases.query, {
    database_id: process.env.NOTION_PLACES_DB_ID!,
    page_size: 50,
  })) {
    if (isFullPage(block)) {
      const feature = processPage(block)
      if (feature !== null) {
        features.push(feature)
      }
    }
  }
  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: features,
    },
  }
}

const processPage = (page: PageObjectResponse): Feature | null => {
  const title = propsFirstPlainText(page.properties, "Name")
  const icon = propsFirstPlainText(page.properties, "Icon")
  const position = stringToPosition(propsFirstPlainText(page.properties, "Location"))
  if (!title || !icon || !position) {
    console.warn(`page with id=${page.id} has invalid properties`)
    return null
  }

  return {
    type: "Feature",
    properties: {
      description:
        '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
      icon: icon,
    },
    geometry: {
      type: "Point",
      coordinates: position,
    },
  }
}
