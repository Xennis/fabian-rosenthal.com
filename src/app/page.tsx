import type { Metadata } from "next"

import { homePage, profileLargeImage } from "@/content/config"
import { getCollections } from "@/content/collections"
import { AuthorHeader } from "@/components/author-header"
import { host } from "@/lib/next"
import { Projects } from "@/components/projects"
import { Headline2 } from "@/components/layout/headline"
import { Link } from "@/components/layout/link"

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
          image: `https://${host}${profileLargeImage}`,
          jobTitle: "Software Engineer",
          url: `https://${host}`,
          sameAs: collections.socialLinks.map((l) => l.href),
        }}
      />
      <div className="mx-auto max-w-(--breakpoint-md) pt-14 sm:pt-16">
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
        <div className="pt-2.5">
          I work four days a week at{" "}
          <Link href="https://cc.systems/en/" target="_blank">
            cc.systems
          </Link>
          , building software applications for clients. Alongside, I run a solo business creating micro SaaS products.
        </div>
        <Projects />
      </div>
    </>
  )
}
