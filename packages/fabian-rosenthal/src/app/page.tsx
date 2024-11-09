import type { Metadata } from "next"

import { homePage } from "@/content/config"
import { getCollections } from "@/content/collections"
import { AuthorHeader } from "@/components/author-header"
import { host } from "@/lib/next"
import { Dot } from "@/components/dot"
import { Projects } from "@/components/projects"

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
        <h2 className="pb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Short Bio
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
        <Projects projects={collections.projects} />
      </div>
    </>
  )
}
