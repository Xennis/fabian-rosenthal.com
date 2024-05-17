import NextLink from "next/link"
import { Suspense } from "react"

import { homePage, legalPage } from "@/content/config"
import { LanguageToggle } from "@/components/layout/language-toggle"
import { i18n } from "@/content/i18n"

export const Header = ({ lang }: { lang: string }) => {
  const dictionary =
    lang === i18n.defaultLocale
      ? {
          legalLabel: "Legal",
        }
      : {
          legalLabel: "Impressum",
        }
  return (
    <header className="bg-emerald-500 px-3 py-2">
      <div className="flex justify-between space-x-3">
        <NextLink href={homePage(lang)} className="group text-lg tracking-tight">
          <span className="font-semibold">Fabi</span>Tours
          <span aria-hidden={true} className="group-hover:grayscale">
            &nbsp;☀️
          </span>
          ️
        </NextLink>
        <div>
          <NextLink href={legalPage(lang)} className="pe-3 hover:underline">
            {dictionary.legalLabel}
          </NextLink>
          {/* TODO: Add fallback */}
          <Suspense>
            <LanguageToggle />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
