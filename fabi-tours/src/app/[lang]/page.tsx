import { type Metadata } from "next"
import NextLink from "next/link"

import Mapbox from "@/components/mapbox"
import { LanguageToggle } from "@/components/layout/language-toggle"
import { createAlternativeUrls } from "@/lib/next"
import { homePage, legalPage } from "@/content/links"
import { fetchPlaces } from "@/lib/places"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  return {
    alternates: createAlternativeUrls(homePage, params.lang),
  }
}

export default async function LangHomePage({ params }: { params: { lang: string } }) {
  const places = await fetchPlaces()
  return (
    <div className="flex h-screen flex-col">
      <header className="h-[40px]">
        <div className="flex justify-between">
          <div>Hello {params.lang}</div>
          <NextLink href={legalPage(params.lang)}>Impressum</NextLink>
          <LanguageToggle />
        </div>
      </header>
      <Mapbox lang={params.lang} places={places} className="flex-1" />
    </div>
  )
}
