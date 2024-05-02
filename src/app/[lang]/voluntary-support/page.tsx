import type { Metadata } from "next"

import { Dot } from "@/components/dot"
import { getDictionary } from "@/content/i18n/dictionaries"
import { createAlternativeUrls } from "@/lib/next"
import { newsletterPage } from "@/lib/links"
import { GdprIframe } from "@/components/gdpr-iframe"
import { getPiece } from "@/content/i18n/pieces"
import CalComIframe from "@/components/calcom"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata | null> {
  const dictionary = getDictionary(params.lang)
  return {
    title: dictionary.pages.voluntarySupport.title,
    alternates: createAlternativeUrls(newsletterPage),
  }
}

export default function VoluntarySupportPage({ params }: { params: { lang: string } }) {
  const dictionary = getDictionary(params.lang)
  const piece = getPiece(params.lang)

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-center leading-tight">
          {dictionary.component.voluntarySupport.headline}
          <Dot />
        </h1>
        <div>{dictionary.component.voluntarySupport.subtitle}</div>
      </div>
      <GdprIframe
        config={{
          storageKey: "calcom-consent",
          ...piece.gdprIframe.calcom,
        }}
        dictionary={dictionary.component.gdprIframe}
      >
        <CalComIframe />
      </GdprIframe>
    </>
  )
}
