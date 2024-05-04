import { type Metadata } from "next"

import { AuthorHeader } from "@/components/author-header"
import { getDictionary } from "@/content/i18n/dictionaries"
import { getCollections } from "@/content/i18n/collections"
import { Projects } from "@/components/projects"
import { aboutPage } from "@/lib/links"
import { createAlternativeUrls } from "@/lib/next"
import { i18n } from "@/content/i18n/config"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  const data: Metadata =
    params.lang === i18n.defaultLocale
      ? {
          title: "About",
        }
      : {
          title: "Über",
        }

  return {
    alternates: createAlternativeUrls(aboutPage),
    ...data,
  }
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const dictionary = getDictionary(params.lang)
  const collections = getCollections(params.lang)

  return (
    <>
      <AuthorHeader
        socialLinks={collections.socialLinks}
        dictionary={dictionary.component.authorHeader}
        includeJsonLd={true}
      />
      <Projects projects={collections.projects} dictionary={dictionary.component.projects} />
    </>
  )
}
