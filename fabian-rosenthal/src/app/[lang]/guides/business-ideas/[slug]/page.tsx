import type { Metadata } from "next"
import { getCachedBusinessIdeasPages, getCachedPageContent } from "@/lib/cms/fetchers"
import { notFound } from "next/navigation"
import { Headline } from "@/components/layout/headline"
import { Render } from "@react-notion-cms/render"

import "@react-notion-cms/render/dist/styles.css"
import { pageTitle } from "@/content/config"

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  // TODO: Remove here + add sitemap
  if (process.env.VERCEL_ENV === "production") {
    // If nothing is returned an error is raised, i.e. the build fails
    return [{ slug: "abc" }]
  }
  return (await getCachedBusinessIdeasPages())
    .filter((p) => p.lang.toString() === params.lang)
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string }
}): Promise<Metadata | null> {
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
    },
    title: page.title,
  }
}

export default async function SlugPage({ params }: { params: { lang: string; slug: string } }) {
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
    <div>
      <Headline>{page.title}</Headline>
      <div className="max-width-regular">
        <Render
          blocks={content}
          options={{ formatDateFn: (date: Date) => date.toLocaleDateString(params.lang), resolveLinkFn: resolveLinkFn }}
        />
      </div>
    </div>
  )
}
