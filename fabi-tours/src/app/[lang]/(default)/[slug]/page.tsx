import { type Metadata } from "next"

import { Headline } from "@/components/layout/headline"
import { getCachedPage, getCachedPageContent, getCachedPages } from "@/lib/cms/fetchers"
import { notFound } from "next/navigation"
import { Render } from "@xennis/react-notion-render"

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
      title: page.title,
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
    <div className="text-center">
      <Headline>{page.title}</Headline>
      <Render blocks={content} />
    </div>
  )
}
