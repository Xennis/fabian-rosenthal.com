import type { Metadata } from "next"

import { Dot } from "@/components/dot"
import { getDictionary } from "@/content/i18n/dictionaries"
import { createAlternativeUrls } from "@/lib/next"
import { newsletterPage } from "@/lib/links"
import { GdprIframe } from "@/components/gdpr-iframe"
import { getCollections } from "@/content/i18n/collections"
import CalComIframe from "@/components/calcom"
import { Hero } from "@/components/layout/hero"
import { i18n } from "@/content/i18n/config"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  const data: Metadata =
    params.lang === i18n.defaultLocale
      ? {
          title: "Voluntary Software Support",
        }
      : {
          title: "Ehrenamtlicher Software-Support",
        }

  return {
    alternates: createAlternativeUrls(newsletterPage),
    ...data,
  }
}

export default function VoluntarySupportPage({ params }: { params: { lang: string } }) {
  const dictionary = getDictionary(params.lang)
  const collections = getCollections(params.lang)

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-center leading-tight">
          {dictionary.component.voluntarySupport.headline}
          <Dot />
        </h1>
        <div>{dictionary.component.voluntarySupport.subtitle}</div>
      </div>
      {params.lang === i18n.defaultLocale ? (
        <div>
          <p>
            I&apos;ve always wanted to do volunteer work. My girlfriend volunteers at a kiosk, where people can find a
            sympathetic ear. A good friend asked me how to process a large amount of data for his dissertation, and a
            friend asked how her non-profit association can create a website.
          </p>
          <p>
            So, the idea came about: I offer up to one hour of free support per week for software (websites, apps, data
            processing, scripts, programming, etc.).
          </p>
          <p>
            <b>What can you expect?</b> Definitely a nice conversation. Whether I can really help you depends heavily on
            your matter. Here are a few examples of what I&apos;m familiar with and what I&apos;m not:
          </p>
          <ul className="grid list-none text-sm sm:grid-cols-2 lg:grid-cols-3">
            <li>✅ Software development</li>
            <li>✅ Websites</li>
            <li>✅ Automation</li>
            <li>✅ Programming</li>
            <li>✅ Data processing</li>
            <li>✅ Interfaces (APIs)</li>
            <li>✅ Linux computers</li>
            <li>✅ Digital maps (Maps, OSM)</li>
            <li>❌ Windows computers</li>
            <li>❌ Apple devices (MacOS, iPhone)</li>
            <li>❌ Microsoft Office (Word, Excel, ...)</li>
          </ul>
          <p>Additionally, the time usually suffices for a tip or advice, but not for a complete solution.</p>
        </div>
      ) : (
        <div>
          <p>
            Ich wollte immer schon ein Ehrenamt machen. Meine Freundin arbeitet ehrenamtlich in einem Zuhör-Kiosk, wo
            Menschen ein offenes Ohr finden. Ein guter Freund fragte mich, wie er viele Daten für seine Doktorarbeit
            auslesen kann, und eine Freundin, wie ihr Förderverein eine Webseite erstellen kann.
          </p>
          <p>
            Damit stand die Idee: Ich biete pro Woche bis zu eine Stunde kostenlosen Support für Software (Webseiten,
            Apps, Datenverarbeitung, Skripte, Programmierung, ...) an.
          </p>
          <p>
            <b>Was kannst du erwarten?</b> Auf jeden Fall ein nettes Gespräch. Ob ich dir wirklich helfen kann, hängt
            stark von deinem Anliegen ab. Ein paar Beispiele, mit denen ich mich auskenne bzw. es eben nicht tue:
          </p>
          <ul className="grid list-none text-sm sm:grid-cols-2 lg:grid-cols-3">
            <li>✅ Software-Entwicklung</li>
            <li>✅ Webseiten</li>
            <li>✅ Automatisierung</li>
            <li>✅ Programmierung</li>
            <li>✅ Datenverarbeitung</li>
            <li>✅ Schnittstellen (APIs)</li>
            <li>✅ Linux Computer</li>
            <li>✅ Digitale Karten (Maps, OSM)</li>
            <li>❌ Windows Computer</li>
            <li>❌ Apple Geräte (MacOS, iPhone)</li>
            <li>❌ Microsoft Office (Word, Excel, ...)</li>
          </ul>
          <p>
            Zudem reicht die Zeit erfahrungsgemäß für einen Tipp oder Ratschlag, aber nicht für eine vollständige
            Lösung.
          </p>
        </div>
      )}
      <section id="booking" className="pt-10">
        <Hero headline={dictionary.component.voluntarySupport.bookingHeadline}>
          <p className="mt-4 text-lg tracking-tight text-white">
            <b>{dictionary.component.voluntarySupport.bookingInfoPrefix}</b>
            {` ${dictionary.component.voluntarySupport.bookingInfo}`}
          </p>
        </Hero>
        <div className="pt-12"></div>
        <GdprIframe
          config={{
            storageKey: "calcom-consent",
            ...collections.gdprIframe.calcom,
          }}
          dictionary={dictionary.component.gdprIframe}
        >
          <CalComIframe />
        </GdprIframe>
      </section>
    </>
  )
}
