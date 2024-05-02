"use client"

import { useParams, usePathname } from "next/navigation"
import NextLink from "next/link"

export function LanguageSwitcher() {
  const { lang } = useParams() as { lang?: string }
  const pathname = usePathname()

  // Pathname can be null: https://nextjs.org/docs/app/api-reference/functions/use-pathname
  if (lang === undefined || pathname === null) {
    return <></>
  }

  // The srLabels are not in the dictionary because they are in the local language.
  const targetLang =
    lang === "de"
      ? {
          label: "🇺🇸",
          srLabel: "Switch to English language",
          lang: "en",
        }
      : {
          label: "🇩🇪",
          srLabel: "Wechsel zur deutsch Sprache",
          lang: "de",
        }

  const href = pathname.replace(`/${lang}`, `/${targetLang.lang}`)
  return (
    <NextLink className="border-s-2 ps-6 text-lg hover:grayscale md:ps-3" href={href} hrefLang={targetLang.lang}>
      <span className="sr-only" lang={targetLang.lang}>
        {targetLang.srLabel}
      </span>
      <span aria-hidden={true}>{targetLang.label}</span>
    </NextLink>
  )
}
