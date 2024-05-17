import { type Metadata } from "next"

import Mapbox from "@/components/mapbox"
import { LanguageToggle } from "@/components/layout/language-toggle"
import { createAlternativeUrls } from "@/lib/next"
import { homePage, legalPage } from "@/content/links"
import NextLink from "next/link"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  return {
    alternates: createAlternativeUrls(homePage, params.lang),
  }
}

export default function LangHomePage({ params }: { params: { lang: string } }) {
  return (
    <div className="flex h-screen flex-col">
      <header className="h-[40px]">
        <div className="flex justify-between">
          <div>Hello {params.lang}</div>
          <NextLink href={legalPage(params.lang)}>Impressum</NextLink>
          <LanguageToggle />
        </div>
      </header>
      <Mapbox lang={params.lang} className="flex-1" />
    </div>
  )
}
