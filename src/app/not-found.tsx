import NextLink from "next/link"
import { type Metadata } from "next"

import { homePage } from "@/lib/links"
import { Dot } from "@/components/dot"
import { RootLayout } from "@/components/layout/root-layout"
import { i18n } from "@/content/i18n/config"
import { getDictionary } from "@/content/i18n/dictionaries"

const lang = i18n.defaultLocale
const dictionary = getDictionary(lang)

export const metadata: Metadata = {
  title: dictionary.pages.notFound.title,
  robots: {
    index: false,
  },
}

export default function NotFound() {
  return (
    <RootLayout lang={lang}>
      <h1>
        {dictionary.pages.notFound.headline}
        <Dot />
      </h1>
      <p>
        {`${dictionary.pages.notFound.messagePrefix} `}
        <NextLink href={homePage(lang)}>{dictionary.pages.notFound.messageLinkLabel}</NextLink>.
      </p>
    </RootLayout>
  )
}
