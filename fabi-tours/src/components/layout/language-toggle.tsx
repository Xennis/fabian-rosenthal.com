"use client"

import { useParams, usePathname, useSearchParams } from "next/navigation"
import NextLink from "next/link"

import { toggledLangMetadata } from "@/content/i18n"

export function LanguageToggle() {
  const { lang } = useParams() as { lang?: string }
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Pathname can be null: https://nextjs.org/docs/app/api-reference/functions/use-pathname
  if (lang === undefined || pathname === null) {
    return <></>
  }

  const targetLang = toggledLangMetadata(lang)
  const newPathname = pathname.replace(`/${lang}`, `/${targetLang.lang}`)
  const href = `${newPathname}?${searchParams.toString()}`

  return (
    <NextLink className="border-s-2 border-black ps-3 text-lg hover:underline" href={href} hrefLang={targetLang.lang}>
      <span className="sr-only" lang={targetLang.lang}>
        {targetLang.srLabel}
      </span>
      <span aria-hidden={true}>{targetLang.label}</span>
    </NextLink>
  )
}
