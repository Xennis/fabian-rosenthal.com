import { type Metadata } from "next"

import Mapbox from "@/components/mapbox"
import { createAlternativeUrls } from "@/lib/next"
import { homePage } from "@/content/config"
import { fetchPlaces } from "@/lib/places"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  return {
    alternates: createAlternativeUrls(homePage, params.lang),
  }
}

export default async function LangHomePage({ params }: { params: { lang: string } }) {
  const places = await fetchPlaces()
  return <Mapbox lang={params.lang} places={places} className="flex-1" />
}
