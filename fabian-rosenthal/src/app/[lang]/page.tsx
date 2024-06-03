import { type Metadata } from "next"
import Link from "next/link"

import { AuthorHeader } from "@/components/author-header"
import { getDictionary } from "@/content/dictionaries"
import { getCollections } from "@/content/collections"
import { aboutPage, homePage } from "@/content/config"
import { createAlternativeUrls } from "@/lib/next"
import { Dot } from "@/components/dot"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  return {
    alternates: createAlternativeUrls(homePage, params.lang),
  }
}

export default function LangHomePage({ params }: { params: { lang: string } }) {
  const dictionary = getDictionary(params.lang)
  const collections = getCollections(params.lang)

  return (
    <>
      <AuthorHeader
        socialLinks={collections.socialLinks}
        dictionary={{
          ...dictionary.component.authorHeader,
          socialLinksAriaLabel: dictionary.footer.socialLinksAriaLabel,
        }}
        hideSocialLinks={true}
      />
      <div className="mx-auto max-w-screen-md pt-14 sm:pt-16">
        <h2 className="pb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {dictionary.component.shortBio.headline}
          <Dot />
        </h2>
        <div className="flex flex-col py-2">
          {collections.shortBio.map((s, index) => {
            return (
              <span key={index} className="flex flex-row leading-7">
                <span aria-hidden={true} className="pe-1.5">
                  {s.emoji}
                </span>
                <span>{s.text}</span>
              </span>
            )
          })}
        </div>
        <span className="default">
          <p>
            {`${dictionary.component.shortBio.morePrefix} `}
            <Link href={aboutPage(params.lang)}>{dictionary.component.shortBio.moreLinkLabel}</Link>
            {` ${dictionary.component.shortBio.moreSuffix}`}.
          </p>
        </span>
      </div>
    </>
  )
}
