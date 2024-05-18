import { Client, isFullPage, iteratePaginatedAPI } from "@notionhq/client"
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import type { Feature, Point, Position } from "geojson"

import { propsFirstPlainText, propsMultiSelect, propsNumber, propsUniqueId, propsUrl } from "@/lib/notion"
import { i18n } from "@/content/i18n"

export type Place = Feature<Point, PlaceProperties>

export type PlaceTag = "cafe" | "viewpoint" | "wildliferefuge" | "unknown"

export type PlaceProperties = {
  id: string
  title: string
  mainTag: PlaceTag
  tags: Array<PlaceTag>
  address: string
  rating: number
  googleMaps: string
  komoot: string | null
}

export const tagColors: Record<PlaceTag, string> = {
  cafe: "#fbb03b",
  viewpoint: "#3bb2d0",
  wildliferefuge: "#2a8408",
  unknown: "#000000",
}

export const tagLabel = (lang: string): Record<PlaceTag, string> => {
  if (lang === i18n.defaultLocale) {
    return {
      cafe: "café",
      viewpoint: "viewpoint",
      wildliferefuge: "wildlife refuge",
      unknown: "unknown",
    }
  }
  return {
    cafe: "Café",
    viewpoint: "Aussichtspunkt",
    wildliferefuge: "Naturschutzgebiet",
    unknown: "Unbekannt",
  }
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

export const fetchPlaces = async (): Promise<Array<Place>> => {
  const features: Array<Place> = []
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
  return features
}

const processPage = (page: PageObjectResponse): Place | null => {
  const id = propsUniqueId(page.properties, "ID")
  const title = propsFirstPlainText(page.properties, "Name")
  const tags = propsMultiSelect(page.properties, "Tags")
  const position = stringToPosition(propsFirstPlainText(page.properties, "Location"))
  const address = propsFirstPlainText(page.properties, "Address")
  const rating = propsNumber(page.properties, "Rating")
  const googleMaps = propsUrl(page.properties, "Google Maps")
  if (!id || !title || !tags || !position || !address || !rating || !googleMaps) {
    console.warn(`page with id=${page.id} has invalid properties`)
    return null
  }
  // Optional:
  const komoot = propsUrl(page.properties, "Komoot")

  const typedTags = tags.map((t) => stringToTag(t))

  return {
    type: "Feature",
    properties: {
      id: id.toString(),
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
