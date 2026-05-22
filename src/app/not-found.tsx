import NextLink from "next/link"
import { type Metadata } from "next"

import { homePage } from "@/content/config"
import { Headline } from "@/components/layout/headline"

export const metadata: Metadata = {
  title: "Nicht gefunden",
  robots: {
    index: false,
  },
}

export default function NotFound() {
  return (
    <div className="max-width-regular">
      <Headline>Seite nicht gefunden</Headline>
      <p>
        Diese Seite konnte nicht gefunden werden. Zurück zur <NextLink href={homePage}>Startseite</NextLink>.
      </p>
    </div>
  )
}
