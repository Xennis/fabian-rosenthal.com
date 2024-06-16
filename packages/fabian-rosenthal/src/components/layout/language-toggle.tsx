"use client"

import { useParams, usePathname } from "next/navigation"
import NextLink from "next/link"

import { i18n, toggledLangMetadata } from "@/content/i18n"
import { blogPage, businessIdeas } from "@/content/config"

export function LanguageToggle() {
  const { lang } = useParams() as { lang?: string }
  const pathname = usePathname()

  // Pathname can be null: https://nextjs.org/docs/app/api-reference/functions/use-pathname
  if (lang === undefined || pathname === null) {
    return <></>
  }

  const targetLang = toggledLangMetadata(lang)
  let href = pathname.replace(`/${lang}`, `/${targetLang.lang}`)
  // Special case: Some pages are not available in the non-default locale
  if (pathname.startsWith(`${blogPage(i18n.defaultLocale)}/`)) {
    href = blogPage(targetLang.lang)
  } else if (pathname.startsWith(businessIdeas(i18n.defaultLocale))) {
    href = blogPage(targetLang.lang)
  }

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
