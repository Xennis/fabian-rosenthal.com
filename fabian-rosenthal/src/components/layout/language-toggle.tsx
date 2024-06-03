"use client"

import { useParams, usePathname } from "next/navigation"
import NextLink from "next/link"

import { toggledLangMetadata } from "@/content/i18n"

export function LanguageToggle() {
  const { lang } = useParams() as { lang?: string }
  const pathname = usePathname()

  // Pathname can be null: https://nextjs.org/docs/app/api-reference/functions/use-pathname
  if (lang === undefined || pathname === null) {
    return <></>
  }

  const targetLang = toggledLangMetadata(lang)
  const href = pathname.replace(`/${lang}`, `/${targetLang.lang}`)

  return (
    <NextLink
      title={targetLang.srLabel}
      className="border-s-2 ps-6 text-lg hover:grayscale md:ps-3"
      href={href}
      hrefLang={targetLang.lang}
    >
      <span className="sr-only" lang={targetLang.lang}>
        {targetLang.srLabel}
      </span>
      <span aria-hidden={true}>{targetLang.label}</span>
    </NextLink>
  )
}
