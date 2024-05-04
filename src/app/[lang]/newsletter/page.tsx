import type { Metadata } from "next"

import { Dot } from "@/components/dot"
import { getDictionary } from "@/content/i18n/dictionaries"
import { createAlternativeUrls } from "@/lib/next"
import { newsletterPage } from "@/lib/links"
import { GdprIframe } from "@/components/gdpr-iframe"
import { getCollections } from "@/content/i18n/collections"
import { i18n } from "@/content/i18n/config"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  const data: Metadata =
    params.lang === i18n.defaultLocale
      ? {
          title: "Newsletter",
        }
      : {
          title: "Newsletter",
        }

  return {
    alternates: createAlternativeUrls(newsletterPage),
    ...data,
  }
}

function SubstackIframe() {
  return (
    <iframe
      src="https://fabianrosenthal.substack.com/embed"
      className="h-[500px] w-full border-0 bg-none"
      scrolling="no"
    />
  )
}

export default function NewsletterPage({ params }: { params: { lang: string } }) {
  const dictionary = getDictionary(params.lang)
  const collections = getCollections(params.lang)

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-center leading-tight">
          {dictionary.component.newsletter.headline}
          <Dot />
        </h1>
        <div>{dictionary.component.newsletter.subtitle}</div>
      </div>
      <GdprIframe
        config={{
          ...collections.gdprIframe.substack,
          storageKey: "substack-consent",
        }}
        dictionary={dictionary.component.gdprIframe}
      >
        <SubstackIframe />
      </GdprIframe>
    </>
  )
}
