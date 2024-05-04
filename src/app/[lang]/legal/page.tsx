import { type Metadata } from "next"

import { legalPage } from "@/lib/links"
import { createAlternativeUrls } from "@/lib/next"
import { i18n } from "@/content/i18n/config"
import { Dot } from "@/components/dot"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  const data: Metadata =
    params.lang === i18n.defaultLocale
      ? {
          title: "Legal Notice",
        }
      : {
          title: "Impressum",
        }

  return {
    alternates: createAlternativeUrls(legalPage),
    ...data,
  }
}

export default function LegalPage({ params }: { params: { lang: string } }) {
  if (params.lang === i18n.defaultLocale) {
    return (
      <>
        <h2>
          Legal Notice
          <Dot />
        </h2>
        <p>
          <span className="font-semibold">Fabian Rosenthal</span>
          <br />
          Methfesselstraße 96
          <br />
          20255 Hamburg
          <br />
          Germany
          <br />
        </p>
        <p>
          <span className="font-semibold">Contact</span>
          <br />
          E-Mail: code [at] xennis.org
          <br />
          Internet: www.fabian-rosenthal.com
          <br />
        </p>
      </>
    )
  }

  return (
    <>
      <h2>
        Impressum
        <Dot />
      </h2>
      <p>
        <span className="font-semibold">Fabian Rosenthal</span>
        <br />
        Methfesselstraße 96
        <br />
        20255 Hamburg
        <br />
        Deutschland
      </p>
      <p>
        <span className="font-semibold">Kontakt</span>
        <br />
        E-Mail: code [at] xennis.org
        <br />
        Internet: www.fabian-rosenthal.com
        <br />
      </p>
    </>
  )
}
