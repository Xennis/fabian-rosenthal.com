import type { Metadata } from "next"

import { getDictionary } from "@/content/dictionaries"
import { createAlternativeUrls } from "@/lib/next"
import { newsletterPage } from "@/content/config"
import { GdprIframe } from "@/components/gdpr-iframe"
import { getCollections } from "@/content/collections"
import { i18n } from "@/content/i18n"
import { Headline } from "@/components/layout/headline"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  const data =
    params.lang === i18n.defaultLocale
      ? {
          description: "Subscribe to My Newsletter. Read about my insights and learning journey.",
          title: "Newsletter",
        }
      : {
          description: "Abonniere meinen Newsletter. Meine Einblicke und Erkenntnisse aus der Software-Welt.",
          title: "Newsletter",
        }

  return {
    ...data,
    alternates: createAlternativeUrls(newsletterPage, params.lang),
    openGraph: {
      description: data.description,
      title: data.title,
    },
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
    <div className="max-width-regular">
      <Headline subtitle={dictionary.component.newsletter.subtitle}>
        {dictionary.component.newsletter.headline}
      </Headline>
      <GdprIframe
        config={{
          ...collections.gdprIframe.substack,
          storageKey: "substack-consent",
        }}
        dictionary={dictionary.component.gdprIframe}
      >
        <SubstackIframe />
      </GdprIframe>
    </div>
  )
}
