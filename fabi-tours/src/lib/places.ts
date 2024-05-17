import { Client, isFullPage, iteratePaginatedAPI } from "@notionhq/client"
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import type { Feature, GeoJsonProperties, Geometry, Position } from "geojson"
import type { GeoJSONSourceRaw } from "mapbox-gl"

import { propsFirstPlainText, propsMultiSelect, propsUrl } from "@/lib/notion"

export type PlaceProperties = {
  title: string
  tags: Array<string>
  googleMaps: string | null
  komoot: string | null
  icon: string
}

export const castToPlaceProperties = (props: GeoJsonProperties): PlaceProperties | null => {
  if (props === null) {
    return null
  }
  return {
    ...props,
    // Convert '["a","b"]' back to an actual array
    tags: JSON.parse(props.tags),
  } as PlaceProperties
}

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  timeoutMs: 1000 * 10,
})

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

const tagsToIcon = (tags: Array<string>) => {
  switch (tags[0]) {
    case "viewpoint":
      return "viewpoint"
    default:
      return "theatre"
  }
}

export const fetchPlaces = async (): Promise<GeoJSONSourceRaw> => {
  const features: Array<Feature<Geometry, PlaceProperties>> = []
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

const processPage = (page: PageObjectResponse): Feature<Geometry, PlaceProperties> | null => {
  const title = propsFirstPlainText(page.properties, "Name")
  const tags = propsMultiSelect(page.properties, "Tags")
  const position = stringToPosition(propsFirstPlainText(page.properties, "Location"))
  if (!title || !tags || !position) {
    console.warn(`page with id=${page.id} has invalid properties`)
    return null
  }
  const googleMaps = propsUrl(page.properties, "Google Maps")
  const komoot = propsUrl(page.properties, "Komoot")

  return {
    type: "Feature",
    properties: {
      title: title,
      tags: tags,
      googleMaps: googleMaps,
      komoot: komoot,
      icon: tagsToIcon(tags),
    },
    geometry: {
      type: "Point",
      coordinates: position,
    },
  }
}
