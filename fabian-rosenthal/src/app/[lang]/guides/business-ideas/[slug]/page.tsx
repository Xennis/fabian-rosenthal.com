import { getCachedBusinessIdeasPages, getCachedPageContent } from "@/lib/cms/fetchers"
import { notFound } from "next/navigation"
import { Headline } from "@/components/layout/headline"
import { Render } from "@react-notion-cms/render"
import { i18n } from "@/content/i18n"

import "@react-notion-cms/render/dist/styles.css"
import "./page.css"

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
  if (params.lang !== i18n.defaultLocale) {
    notFound()
  }
  const pages = await getCachedBusinessIdeasPages()
  const page = pages.find((p) => p.slug === params.slug) ?? null
  if (page === null) {
    notFound()
  }
  const content = await getCachedPageContent(page.blockId)

  const resolveLinkFn = (nId: string) => {
    const resolvedPage = pages.find((p) => p.blockId.replaceAll("-", "") === nId.replaceAll("-", "")) ?? null
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
        <Render blocks={content} options={{ formatDateFn: (date) => date.toString(), resolveLinkFn: resolveLinkFn }} />
      </div>
    </div>
  )
}
