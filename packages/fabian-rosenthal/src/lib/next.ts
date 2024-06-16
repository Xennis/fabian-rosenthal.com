import { type AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types"

import { i18n } from "@/content/i18n"

export const createAlternativeUrls = (pageFn: (lang: string) => string, lang: string): AlternateURLs => {
  const languages: AlternateURLs["languages"] = {}
  i18n.locales.forEach((lang) => {
    languages[lang] = pageFn(lang)
  })
  return {
    canonical: pageFn(lang),
    languages: languages,
  }
}

const getHost = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    const url = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    if (url) {
      return url
    }
  }
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
    const url = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL
    if (url) {
      return url
    }
  }
  return `localhost:${process.env.PORT || 3000}`
}

export const host = getHost()
