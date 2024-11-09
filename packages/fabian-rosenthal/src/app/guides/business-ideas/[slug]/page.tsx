import type { Metadata } from "next"
import { getCachedBusinessIdeasPages, getCachedPageContent } from "@/lib/cms/fetchers"
import { notFound } from "next/navigation"
import { Headline } from "@/components/layout/headline"
import { Render } from "@xennis/react-notion-cms-render"
import "@xennis/react-notion-cms-render/dist/styles.css"

import { businessIdeas, pageTitle } from "@/content/config"
import { formatDate } from "@/lib/date"
import { Link } from "@/components/layout/link"

export async function generateStaticParams() {
  return (await getCachedBusinessIdeasPages()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata | null> {
  const params = await props.params
  const pages = await getCachedBusinessIdeasPages()
  const page = pages.find((p) => p.slug === params.slug) ?? null
  if (page === null) {
    return null
  }

  return {
    // description: page.metaDescription,
    openGraph: {
      // description: page.metaDescription,
      siteName: pageTitle,
      title: page.title,
      type: "website",
      url: page.canonical,
    },
    title: page.title,
  }
}

export default async function SlugPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const pages = await getCachedBusinessIdeasPages()
  const page = pages.find((p) => p.slug === params.slug) ?? null
  if (page === null) {
    notFound()
  }
  const content = await getCachedPageContent(page.notionId)

  const resolveLinkFn = (nId: string) => {
    const resolvedPage = pages.find((p) => p.notionId === nId) ?? null
    if (resolvedPage === null) {
      return null
    }
    return {
      href: resolvedPage.canonical,
      icon: resolvedPage.icon,
    }
  }

  return (
    <div className="mx-auto max-w-screen-md">
      <Headline subtitle={page.pageSubtitle ?? undefined}>{page.title}</Headline>
      <Render
        blocks={content}
        options={{
          formatDateFn: (dateString: string) => formatDate(dateString),
          resolveLinkFn: resolveLinkFn,
        }}
      />
      {!page.homePage && (
        <div className="mt-14 border-t border-gray-100 py-4">
          <div className="text-sm text-slate-600">
            Last updated: {formatDate(page.lastEdited)}
            <span className="px-2">·</span>
            Published in <Link href={businessIdeas}>Business Ideas</Link>
          </div>
        </div>
      )}
    </div>
  )
}
