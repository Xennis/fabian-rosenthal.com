import { type Metadata } from "next"

import { AuthorHeader } from "@/components/author-header"
import { getDictionary } from "@/content/i18n/dictionaries"
import { getPiece } from "@/content/i18n/pieces"
import { homePage } from "@/lib/links"
import { createAlternativeUrls } from "@/lib/next"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata | null> {
  return {
    alternates: createAlternativeUrls(homePage),
  }
}

export default function LangHomePage({ params }: { params: { lang: string } }) {
  const dictionary = getDictionary(params.lang)
  const piece = getPiece(params.lang)

  return (
    <>
      <AuthorHeader
        socialLinks={piece.socialLinks}
        dictionary={dictionary.component.authorHeader}
        hideSocialLinks={true}
      />
    </>
  )
}
