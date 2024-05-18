import { Client, isFullPage, iteratePaginatedAPI } from "@notionhq/client"
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import type { Feature, GeoJsonProperties, Geometry, Position } from "geojson"
import type { GeoJSONSourceRaw } from "mapbox-gl"

import { propsFirstPlainText, propsMultiSelect, propsNumber, propsUrl } from "@/lib/notion"

export type PlaceTag = "cafe" | "viewpoint" | "wildliferefuge" | "unknown"

export type PlaceProperties = {
  title: string
  mainTag: PlaceTag
  tags: Array<PlaceTag>
  address: string
  rating: number
  googleMaps: string
  komoot: string | null
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

export const tagColors = {
  cafe: "#fbb03b",
  viewpoint: "#3bb2d0",
  wildliferefuge: "#6fdf41",
  unknown: "#000000",
}

const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
  timeoutMs: 1000 * 10,
})

const stringToTag = (raw: string): PlaceTag => {
  switch (raw) {
    case "cafe":
    case "viewpoint":
    case "wildliferefuge":
      return raw
  }
  return "unknown"
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
  const address = propsFirstPlainText(page.properties, "Address")
  const rating = propsNumber(page.properties, "Rating")
  const googleMaps = propsUrl(page.properties, "Google Maps")
  if (!title || !tags || !position || !address || !rating || !googleMaps) {
    console.warn(`page with id=${page.id} has invalid properties`)
    return null
  }
  // Optional:
  const komoot = propsUrl(page.properties, "Komoot")

  const typedTags = tags.map((t) => stringToTag(t))

  return {
    type: "Feature",
    properties: {
      title: title,
      mainTag: typedTags[0],
      tags: typedTags,
      address: address,
      rating: rating,
      googleMaps: googleMaps,
      komoot: komoot,
    },
    geometry: {
      type: "Point",
      coordinates: position,
    },
  }
}
