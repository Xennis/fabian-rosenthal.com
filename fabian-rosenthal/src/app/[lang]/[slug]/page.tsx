import { type Metadata } from "next"
import { Render } from "@react-notion-cms/render"

import { Headline } from "@/components/layout/headline"
import { getCachedBlogPosts, getCachedPageContent, getCachedPages } from "@/lib/cms/fetchers"
import { notFound } from "next/navigation"
import { pageTitle } from "@/content/config"
import { Hero } from "@/components/layout/hero"
import { GdprIframe } from "@/components/gdpr-iframe"
import { CalComIframe } from "@/components/calcom"
import { getDictionary } from "@/content/dictionaries"
import { getCollections } from "@/content/collections"
import { AuthorHeader } from "@/components/author-header"
import { Projects } from "@/components/projects"
import { i18n } from "@/content/i18n"
import { BlogPostList } from "@/components/blog-post-list"
import { formatDate } from "@/lib/date"
import { Link } from "@/components/layout/link"

import "./page.css"

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  return (await getCachedPages()).filter((p) => p.lang.toString() === params.lang).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}): Promise<Metadata | null> {
  const page = (await getCachedPages()).find((p) => p.lang.toString() === params.lang && p.slug === params.slug)
  if (!page) {
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
  const pages = await getCachedPages()
  const page = pages.find((p) => p.lang.toString() === params.lang && p.slug === params.slug)
  if (!page) {
    notFound()
  }
  const content = await getCachedPageContent(page.notionId)

  return (
    <div className={params.slug}>
      <div className="max-width-regular default">
        {page.pageTitle !== null && (
          <Headline subtitle={page.pageSubtitle !== null ? page.pageSubtitle : undefined}>{page.pageTitle}</Headline>
        )}
        <Render
          blocks={content}
          options={{
            formatDateFn: (date) => formatDate(date, params.lang),
            resolveLinkFn: (nId) => {
              const page = pages.find((p) => p.notionId === nId)
              if (!page) {
                return null
              }
              return { href: page.canonical, icon: null }
            },
            htmlComponents: {
              a: (props) => <Link href={props.href ?? "#"} {...props} />,
            },
          }}
        />
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
    case "blog":
      return (
        <div className="max-width-regular">
          <Blog lang={params.lang} />
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

const Blog = async ({ lang }: { lang: string }) => {
  if (lang !== i18n.defaultLocale) {
    return <></>
  }
  const posts = await getCachedBlogPosts()
  const postsByDate = posts.sort((a, b) => {
    // FIXME: Somehow the date is here sometimes a string
    return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
  })

  return <BlogPostList posts={postsByDate} />
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
