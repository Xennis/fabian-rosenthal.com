import { type Metadata } from "next"
import { getDictionary } from "@/content/i18n/dictionaries"
import { legalNoticePage } from "@/lib/links"
import { createAlternativeUrls } from "@/lib/next"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata | null> {
  const dictionary = getDictionary(params.lang)
  return {
    title: dictionary.pages.legalNotice.title,
    alternates: createAlternativeUrls(legalNoticePage),
  }
}

export default function LegalNoticePage({ params }: { params: { lang: string } }) {
  if (params.lang === "de") {
    return (
      <>
        <h2>Impressum</h2>
        <p>
          Fabian Rosenthal
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

  return (
    <>
      <h2>Legal Notice</h2>
      <p>
        Fabian Rosenthal
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
