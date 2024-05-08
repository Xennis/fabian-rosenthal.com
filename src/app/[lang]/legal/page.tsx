import { type Metadata } from "next"

import { legalPage } from "@/lib/links"
import { createAlternativeUrls } from "@/lib/next"
import { i18n } from "@/content/i18n/config"
import { Dot } from "@/components/dot"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  const data =
    params.lang === i18n.defaultLocale
      ? {
          description: "Legal notice of the website.",
          title: "Legal Notice",
        }
      : {
          description: "Impressum der Website.",
          title: "Impressum",
        }

  return {
    ...data,
    alternates: createAlternativeUrls(legalPage),
    openGraph: {
      description: data.description,
      title: data.title,
    },
  }
}

export default function LegalPage({ params }: { params: { lang: string } }) {
  if (params.lang === i18n.defaultLocale) {
    return (
      <>
        <h1 className="pb-6">
          Legal Notice
          <Dot />
        </h1>
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
          Internet: fabian-rosenthal.com
          <br />
        </p>
      </>
    )
  }

  return (
    <>
      <h1 className="pb-6">
        Impressum
        <Dot />
      </h1>
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
        Internet: fabian-rosenthal.com
        <br />
      </p>
    </>
  )
}
