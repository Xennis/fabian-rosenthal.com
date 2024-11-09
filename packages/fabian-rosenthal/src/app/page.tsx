import type { Metadata } from "next"

import { homePage } from "@/content/config"
import { getCollections } from "@/content/collections"
import { AuthorHeader } from "@/components/author-header"
import { host } from "@/lib/next"
import { Projects } from "@/components/projects"
import { Headline2 } from "@/components/layout/headline"

export const metadata: Metadata = {
  alternates: {
    canonical: homePage,
  },
}

export default function HomePage() {
  const collections = getCollections()
  return (
    <>
      <AuthorHeader
        socialLinks={collections.socialLinks}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Fabian Rosenthal",
          // image: authorLargeImage.src,
          jobTitle: "Software Engineer",
          url: `https://${host}`,
          sameAs: collections.socialLinks.map((l) => l.href),
        }}
      />
      <div className="mx-auto max-w-screen-md pt-14 sm:pt-16">
        <Headline2>Short Bio</Headline2>
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
        <Projects />
      </div>
    </>
  )
}
