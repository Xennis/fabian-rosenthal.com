import { type Metadata } from "next"

import { legalPage } from "@/content/config"
import { createAlternativeUrls } from "@/lib/next"
import { i18n } from "@/content/i18n"
import { Headline } from "@/components/layout/headline"

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
    alternates: createAlternativeUrls(legalPage, params.lang),
    openGraph: {
      description: data.description,
      title: data.title,
    },
  }
}

export default function LegalPage({ params }: { params: { lang: string } }) {
  return (
    <div className="text-center">
      {params.lang === i18n.defaultLocale ? (
        <>
          <Headline>Legal Notice</Headline>
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
      ) : (
        <>
          <Headline>Impressum</Headline>
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
      )}
    </div>
  )
}
