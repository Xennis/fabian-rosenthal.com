import NextImage from "next/image"
import { type Person, type WithContext } from "schema-dts"

import { SocialLink } from "@/components/social-links"
import authorLargeImage from "@/content/images/author-large-350x383.webp"
import { Dot } from "@/components/dot"

export function AuthorHeader({
  socialLinks,
  dictionary,
  hideSocialLinks,
  jsonLd,
}: {
  socialLinks: Array<{ label: string; href: string; imageSrc: any }>
  dictionary: {
    headline: string
    subtitlePrefix: string
    subtitleAriaLabel: string
    subtitleSuffix: string
    imageAlt: string
    socialLinksAriaLabel: string
  }
  hideSocialLinks?: boolean
  jsonLd?: WithContext<Person>
}) {
  return (
    <section>
      <div className="md:flex md:items-center md:justify-center md:space-x-16">
        <div className="pb-8 text-center md:pb-0">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {dictionary.headline}
            <Dot />
          </h1>
          <div>
            {`${dictionary.subtitlePrefix} `}
            <span aria-hidden={true}>💚</span>
            <span className="sr-only">{dictionary.subtitleAriaLabel}</span>
            {` ${dictionary.subtitleSuffix}`}
          </div>
          {!hideSocialLinks && (
            <ul aria-label={dictionary.socialLinksAriaLabel} className="flex justify-center space-x-4 pt-8">
              {socialLinks.map((l, index) => (
                <li key={index}>
                  <SocialLink {...l} className="grayscale group-hover:grayscale-0" />
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Priority is set to fix the Lighthouse error: "Largest Contentful Paint image was lazily loaded" */}
        <NextImage
          className="mx-auto rounded-xl shadow-xl md:mx-0"
          width={350}
          src={authorLargeImage}
          alt={dictionary.imageAlt}
          unoptimized
          priority
        />
      </div>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </section>
  )
}
