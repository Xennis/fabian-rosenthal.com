import { type Metadata } from "next"

import { AuthorHeader } from "@/components/author-header"
import { getDictionary } from "@/content/i18n/dictionaries"
import { getCollections } from "@/content/i18n/collections"
import { Projects } from "@/components/projects"
import { aboutPage } from "@/lib/links"
import { createAlternativeUrls } from "@/lib/next"
import { i18n } from "@/content/i18n/config"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata | null {
  const data =
    params.lang === i18n.defaultLocale
      ? {
          description:
            "Ahoy, I'm Fabian. I love love travelling, software development & hiking. Learn more about me and my projects.",
          title: "About",
        }
      : {
          description:
            "Ahoi, ich bin Fabian. Ich liebe reisen, Softwareentwicklung & wandern. Lerne mehr über mich und meine Projekte.",
          title: "Über",
        }

  return {
    ...data,
    alternates: createAlternativeUrls(aboutPage, params.lang),
    openGraph: {
      description: data.description,
      title: data.title,
    },
  }
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const dictionary = getDictionary(params.lang)
  const collections = getCollections(params.lang)

  return (
    <div className="max-width-regular">
      <AuthorHeader
        socialLinks={collections.socialLinks}
        dictionary={dictionary.component.authorHeader}
        includeJsonLd={true}
      />
      <Projects projects={collections.projects} dictionary={dictionary.component.projects} />
    </div>
  )
}
