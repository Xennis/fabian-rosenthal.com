import { type Metadata } from "next"

import { AuthorHeader } from "@/components/author-header"
import { getDictionary } from "@/content/i18n/dictionaries"
import { getCollections } from "@/content/i18n/collections"
import { homePage } from "@/lib/links"
import { createAlternativeUrls } from "@/lib/next"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  return {
    alternates: createAlternativeUrls(homePage),
  }
}

export default function LangHomePage({ params }: { params: { lang: string } }) {
  const dictionary = getDictionary(params.lang)
  const collections = getCollections(params.lang)

  return (
    <>
      <AuthorHeader
        socialLinks={collections.socialLinks}
        dictionary={dictionary.component.authorHeader}
        hideSocialLinks={true}
      />
    </>
  )
}
