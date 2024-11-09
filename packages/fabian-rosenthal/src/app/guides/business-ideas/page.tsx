import { notFound, redirect } from "next/navigation"

import { getCachedBusinessIdeasPages } from "@/lib/cms/fetchers"
import { businessIdeasPage } from "@/content/config"

export default async function BusinessIdeasPage() {
  const pages = await getCachedBusinessIdeasPages()
  const homePage = pages.find((p) => p.homePage) ?? null
  if (homePage === null) {
    notFound()
  }
  redirect(businessIdeasPage(homePage.slug))
}
