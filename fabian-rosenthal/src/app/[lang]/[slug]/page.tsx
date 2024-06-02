import { type Metadata } from "next"
import { Render } from "@react-notion-cms/render"

import { Headline } from "@/components/layout/headline"
import { getCachedPage, getCachedPageContent, getCachedPages } from "@/lib/cms/fetchers"
import { notFound } from "next/navigation"
import { pageTitle } from "@/content/config"
import { classNames } from "@/lib/tw"
import { Hero } from "@/components/layout/hero"
import { GdprIframe } from "@/components/gdpr-iframe"
import { CalComIframe } from "@/components/calcom"
import { getDictionary } from "@/content/dictionaries"
import { getCollections } from "@/content/collections"
import { AuthorHeader } from "@/components/author-header"
import { Projects } from "@/components/projects"

import "./page.css"

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
    description: page.metaDescription,
    alternates: {
      canonical: page.canonical,
      languages: page.languages,
    },
    openGraph: {
      description: page.metaDescription,
      siteName: pageTitle,
      title: page.metaTitle,
      type: "website",
    },
    title: page.metaTitle,
  }
}

export default async function SlugPage({ params }: { params: { lang: string; slug: string } }) {
  const page = await getCachedPage(params)
  if (page === null) {
    notFound()
  }
  const content = await getCachedPageContent(page.blockId)

  return (
    <div className={classNames(params.slug, "default")}>
      {page.pageTitle !== null && (
        <Headline subtitle={page.pageSubtitle !== null ? page.pageSubtitle : undefined}>{page.pageTitle}</Headline>
      )}
      <div className="max-width-regular">
        <Render blocks={content} options={{ formatDateFn: (date) => date.toString(), resolveLinkFn: (nId) => null }} />
      </div>
      <EndComponent params={params} />
    </div>
  )
}

const EndComponent = ({ params }: { params: { lang: string; slug: string } }) => {
  switch (params.slug) {
    case "about":
      return (
        <div className="max-width-regular">
          <About lang={params.lang} />
        </div>
      )
    case "newsletter":
      return (
        <div className="max-width-regular">
          <Newsletter lang={params.lang} />
        </div>
      )
    case "voluntary-support":
      return <Booking lang={params.lang} />
    default:
      return <></>
  }
}

const About = ({ lang }: { lang: string }) => {
  const dictionary = getDictionary(lang)
  const collections = getCollections(lang)

  return (
    <>
      <AuthorHeader
        socialLinks={collections.socialLinks}
        dictionary={{
          ...dictionary.component.authorHeader,
          socialLinksAriaLabel: dictionary.footer.socialLinksAriaLabel,
        }}
        includeJsonLd={true}
      />
      <Projects projects={collections.projects} dictionary={dictionary.component.projects} />
    </>
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

const Newsletter = ({ lang }: { lang: string }) => {
  const dictionary = getDictionary(lang)
  const collections = getCollections(lang)

  return (
    <GdprIframe
      config={{
        ...collections.gdprIframe.substack,
        storageKey: "substack-consent",
      }}
      dictionary={dictionary.component.gdprIframe}
    >
      <iframe
        src="https://fabianrosenthal.substack.com/embed"
        className="h-[500px] w-full border-0 bg-none"
        scrolling="no"
      />
    </GdprIframe>
  )
}
