import NextLink from "next/link"
import { type Metadata } from "next"

import { homePage } from "@/lib/links"
import { Dot } from "@/components/dot"
import { RootLayout } from "@/components/layout/root-layout"
import { i18n } from "@/content/i18n/config"

const lang = i18n.defaultLocale

export const metadata: Metadata = {
  title: "Not Found",
  robots: {
    index: false,
  },
}

export default function NotFound() {
  return (
    <RootLayout lang={lang}>
      <h1>
        Page Not Found
        <Dot />
      </h1>
      <p>
        This page could not be found. Return to <NextLink href={homePage(lang)}>Home</NextLink>.
      </p>
    </RootLayout>
  )
}
