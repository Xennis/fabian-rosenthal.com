import { type Metadata } from "next"
import { Render } from "@xennis/react-notion-cms-render"
import { draftMode } from "next/headers"
import NextImage from "next/image"
import NextLink from "next/link"

import { Headline } from "@/components/layout/headline"
import { getCachedBlogPosts, getCachedPageContent, getCachedPages } from "@/lib/cms/fetchers"
import { notFound } from "next/navigation"
import { businessIdeas, pageTitle } from "@/content/config"
import { GdprIframe } from "@/components/gdpr-iframe"
import { getCollections } from "@/content/collections"
import { BlogPostList } from "@/components/blog-post-list"
import { formatDate } from "@/lib/date"
import { Link } from "@/components/layout/link"
import "./page.css"
import { fetchBlogPosts } from "@/lib/cms/fetch"
import bussinessIdeasOgImage from "@/app/guides/business-ideas/[slug]/opengraph-image.png"
import { Dot } from "@/components/dot"

export async function generateStaticParams() {
  return (await getCachedPages()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata | null> {
  const params = await props.params
  const page = (await getCachedPages()).find((p) => p.slug === params.slug)
  if (!page) {
    return null
  }

  return {
    description: page.metaDescription,
    alternates: {
      canonical: page.canonical,
    },
    openGraph: {
      description: page.metaDescription,
      siteName: pageTitle,
      title: page.metaTitle,
      type: "website",
      url: page.canonical,
    },
    title: page.metaTitle,
  }
}

export default async function SlugPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const pages = await getCachedPages()
  const page = pages.find((p) => p.slug === params.slug)
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
            formatDateFn: (dateString) => formatDate(dateString),
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

const EndComponent = ({ params }: { params: { slug: string } }) => {
  switch (params.slug) {
    case "blog":
      return (
        <div className="mx-auto max-w-(--breakpoint-md)">
          <Blog />
        </div>
      )
    case "newsletter":
      return (
        <div className="max-width-regular">
          <Newsletter />
        </div>
      )
    default:
      return <></>
  }
}

const Blog = async () => {
  const { isEnabled } = await draftMode()
  const postsByDate = isEnabled ? await fetchBlogPosts(isEnabled) : await getCachedBlogPosts()

  return (
    <>
      <BlogPostList posts={postsByDate} />
      <div className="mt-4 border-t border-gray-100">
        <h2 className="pt-7 pb-5 text-3xl font-semibold tracking-tight sm:pt-8 sm:pb-6 sm:text-4xl">
          Collections of Articles
          <Dot />
        </h2>
        <NextLink href={businessIdeas} className="hover:grayscale">
          <div className="relative aspect-[1.91/1] w-full sm:max-w-96">
            <NextImage
              src={bussinessIdeasOgImage}
              alt="How to Find Business Ideas - A Practical Guide"
              className="rounded-md sm:rounded-lg"
              fill
              quality={100}
            />
          </div>
        </NextLink>
      </div>
    </>
  )
}

const Newsletter = () => {
  const collections = getCollections()

  return (
    <GdprIframe
      config={{
        ...collections.gdprIframe.substack,
        storageKey: "substack-consent",
      }}
    >
      <iframe
        src="https://fabianrosenthal.substack.com/embed"
        className="h-[500px] w-full border-0 bg-none"
        scrolling="no"
      />
    </GdprIframe>
  )
}
