import type { Metadata } from "next"

import { Dot } from "@/components/dot"
import { getDictionary } from "@/content/i18n/dictionaries"
import { createAlternativeUrls } from "@/lib/next"
import { voluntarySupport } from "@/lib/links"
import { GdprIframe } from "@/components/gdpr-iframe"
import { getCollections } from "@/content/i18n/collections"
import CalComIframe from "@/components/calcom"
import { Hero } from "@/components/layout/hero"
import { i18n } from "@/content/i18n/config"
import { Headline } from "@/components/layout/headline"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  const data =
    params.lang === i18n.defaultLocale
      ? {
          description:
            "Free software help for nonprofit clubs, volunteers, and private individuals. I offer one hour per week of free software support (websites, apps, databases, data processing, scripts, programming, etc.).",
          title: "Voluntary Software Support",
        }
      : {
          description:
            "Kostenlose Software-Hilfe für gemeinnützige Vereine, Ehrenamtliche und Privatpersonen. Ich biete pro Woche eine Stunde kostenlosen Support für Software (Webseiten, Apps, Datenbanken, Datenverarbeitung, Skripte, Programmierung, ...) an.",
          title: "Ehrenamtlicher Software-Support",
        }

  return {
    ...data,
    alternates: createAlternativeUrls(voluntarySupport),
    openGraph: {
      description: data.description,
      title: data.title,
    },
  }
}

const SkillList = ({ skills }: { skills: Array<{ label: string; included: boolean }> }) => {
  return (
    <ul className="grid list-none text-sm sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill, index) => (
        <li key={index}>
          {skill.included ? "✅" : "❌"} {skill.label}
        </li>
      ))}
    </ul>
  )
}

export default function VoluntarySupportPage({ params }: { params: { lang: string } }) {
  const dictionary = getDictionary(params.lang)
  const collections = getCollections(params.lang)

  return (
    <>
      <Headline subtitle={dictionary.component.voluntarySupport.subtitle}>
        {dictionary.component.voluntarySupport.headline}
      </Headline>
      <div className="max-width-regular">
        {params.lang === i18n.defaultLocale ? (
          <div>
            <p>
              I&apos;ve always wanted to do volunteer work. My girlfriend volunteers at a kiosk, where people can find a
              sympathetic ear. A good friend asked me how to analyze a large amount of data for his dissertation, and a
              friend asked how her non-profit association can create a website.
            </p>
            <p>
              So, the idea came about: I offer one hour per week of free software support (websites, apps, databases,
              data processing, scripts, programming, etc.).
            </p>
            <p>
              <b>What can you expect?</b> Definitely a nice conversation. Whether I can actually help you depends
              heavily on your matter. Here are a few examples of what I&apos;m familiar with and what I&apos;m not:
            </p>
            <SkillList skills={collections.voluntarySkills} />
            <p>Additionally, the time usually suffices for a tip or advice, but not for a complete solution.</p>
          </div>
        ) : (
          <div>
            <p>
              Ich wollte immer schon ein Ehrenamt machen. Meine Freundin arbeitet ehrenamtlich in einem Zuhör-Kiosk, wo
              Menschen ein offenes Ohr finden. Ein guter Freund fragte mich, wie er viele Daten für seine Doktorarbeit
              analysieren kann, und eine Freundin, wie ihr Förderverein eine Webseite erstellen kann.
            </p>
            <p>
              Damit entstand die Idee: Ich biete pro Woche eine Stunde kostenlosen Support für Software (Webseiten,
              Apps, Datenbanken, Datenverarbeitung, Skripte, Programmierung, ...) an.
            </p>
            <p>
              <b>Was kannst du erwarten?</b> Auf jeden Fall ein nettes Gespräch. Ob ich dir wirklich helfen kann, hängt
              stark von deinem Anliegen ab. Ein paar Beispiele, mit denen ich mich auskenne bzw. es eben nicht tue:
            </p>
            <SkillList skills={collections.voluntarySkills} />
            <p>
              Zudem reicht die Zeit erfahrungsgemäß für einen Tipp oder Ratschlag, aber nicht für eine vollständige
              Lösung.
            </p>
          </div>
        )}
      </div>
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
          <CalComIframe calLink="fabian.rosenthal/voluntary-support" />
        </GdprIframe>
      </section>
    </>
  )
}
