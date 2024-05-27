import { getCachedBusinessIdeasPage, getCachedBusinessIdeasPages, getCachedPageContent } from "@/lib/cms/fetchers"
import { notFound } from "next/navigation"
import { Headline } from "@/components/layout/headline"
import { Render } from "@react-notion-cms/render"

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  // TODO: Remove here + add sitemap
  if (process.env.VERCEL_ENV === "production") {
    return []
  }
  return (await getCachedBusinessIdeasPages())
    .filter((p) => p.lang.toString() === params.lang)
    .map((p) => ({ slug: p.slug }))
}

export default async function SlugPage({ params }: { params: { lang: string; slug: string } }) {
  const page = await getCachedBusinessIdeasPage(params)
  if (page === null) {
    notFound()
  }
  const content = await getCachedPageContent(page.blockId)

  return (
    <div>
      <Headline>{page.title}</Headline>
      <div className="max-width-regular">
        <Render blocks={content} options={{ formatDateFn: (date) => date.toString(), resolveLinkFn: (nId) => nId }} />
      </div>
    </div>
  )
}
