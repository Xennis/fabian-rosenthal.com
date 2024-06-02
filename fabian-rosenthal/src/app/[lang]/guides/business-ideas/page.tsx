import { notFound, redirect } from "next/navigation"

import { getCachedBusinessIdeasPages } from "@/lib/cms/fetchers"
import { i18n } from "@/content/i18n"
import { businessIdeasPage } from "@/content/config"

export default async function BusinessIdeasPage({ params }: { params: { lang: string } }) {
  if (params.lang !== i18n.defaultLocale) {
    notFound()
  }
  const pages = await getCachedBusinessIdeasPages()
  const homePage = pages.find((p) => p.homePage) ?? null
  if (homePage === null) {
    notFound()
  }
  redirect(businessIdeasPage(params.lang, homePage.slug))
}
