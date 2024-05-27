import { type Metadata } from "next"
import { Render } from "@react-notion-cms/render"

import { Headline } from "@/components/layout/headline"
import { getCachedPage, getCachedPageContent, getCachedPages } from "@/lib/cms/fetchers"
import { notFound } from "next/navigation"
import { pageTitle } from "@/content/config"
import { classNames } from "@/lib/tw"
import { Hero } from "@/components/layout/hero"
import { GdprIframe } from "@/components/gdpr-iframe"
import CalComIframe from "@/components/calcom"
import { getDictionary } from "@/content/dictionaries"
import { getCollections } from "@/content/collections"

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  return (await getCachedPages()).filter((p) => p.lang.toString() === params.lang).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}): Promise<Metadata | null> {
  const page = await getCachedPage(params)
  if (page === null) {
    return null
  }

  return {
    description: page.description,
    alternates: {
      canonical: page.canonical,
      languages: page.languages,
    },
    openGraph: {
      description: page.description,
      siteName: pageTitle,
      title: page.title,
      type: "website",
    },
    title: page.title,
  }
}

export default async function SlugPage({ params }: { params: { lang: string; slug: string } }) {
  const page = await getCachedPage(params)
  if (page === null) {
    notFound()
  }
  const content = await getCachedPageContent(page.blockId)

  return (
    <div className={classNames(params.slug === "legal" ? "text-center" : "")}>
      <Headline subtitle={page.subtitle !== null ? page.subtitle : undefined}>{page.title}</Headline>
      <div className="max-width-regular">
        <Render blocks={content} options={{ formatDateFn: (date) => date.toString(), resolveLinkFn: (nId) => nId }} />
      </div>
      {params.slug === "voluntary-support" && <Booking lang={params.lang} />}
    </div>
  )
}

const Booking = ({ lang }: { lang: string }) => {
  const dictionary = getDictionary(lang)
  const collections = getCollections(lang)
  return (
    <section id="booking" className="pt-10">
      <Hero headline={dictionary.component.voluntarySupport.bookingHeadline}>
        <p className="mt-4 text-lg tracking-tight text-white">
          <b>{dictionary.component.voluntarySupport.bookingInfoPrefix}</b>
          {` ${dictionary.component.voluntarySupport.bookingInfo}`}
        </p>
      </Hero>
      <div className="pt-12"></div>
      <GdprIframe
        config={{
          storageKey: "calcom-consent",
          ...collections.gdprIframe.calcom,
        }}
        dictionary={dictionary.component.gdprIframe}
      >
        <CalComIframe calLink="fabian.rosenthal/voluntary-support" />
      </GdprIframe>
    </section>
  )
}
