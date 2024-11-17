import { notFound, redirect } from "next/navigation"
import { getCachedBusinessIdeasPages } from "@/lib/cms/fetchers"
import { businessIdeasPage } from "@/content/config"
import type { Metadata } from "next"
import { Page } from "@/lib/cms/business-ideas"

const findHomePage = async (): Promise<(Page & { canonical: string }) | null> => {
  const pages = await getCachedBusinessIdeasPages()
  return pages.find((p) => p.homePage) ?? null
}

export async function generateMetadata(): Promise<Metadata | null> {
  const page = await findHomePage()
  if (page === null) {
    return null
  }

  return {
    alternates: {
      canonical: page.canonical,
    },
  }
}

export default async function BusinessIdeasPage() {
  const page = await findHomePage()
  if (page === null) {
    notFound()
  }
  redirect(businessIdeasPage(page.slug))
}
