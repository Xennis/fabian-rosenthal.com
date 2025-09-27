import NextImage from "next/image"
import { type Person, type WithContext } from "schema-dts"

import { SocialLink } from "@/components/social-links"
import { Dot } from "@/components/dot"
import { profileLargeImage } from "@/content/config"

export function AuthorHeader({
  socialLinks,
  jsonLd,
}: {
  socialLinks: Array<{ label: string; href: string; imageSrc: any }>
  jsonLd?: WithContext<Person>
}) {
  return (
    <section>
      <div className="md:flex md:items-center md:justify-center md:space-x-16">
        <div className="pb-8 text-center md:pb-0">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Ahoy, I&apos;m Fabian
            <Dot />
          </h1>
          <div>
            I <span aria-hidden={true}>🖤</span>
            <span className="sr-only">love</span> software development & sports.
          </div>
          <ul aria-label="Links to social media profiles" className="flex justify-center space-x-4 pt-8">
            {socialLinks.map((l, index) => (
              <li key={index}>
                <SocialLink {...l} className="duration-500 group-hover:scale-110" />
              </li>
            ))}
          </ul>
        </div>
        {/* Priority is set to fix the Lighthouse error: "Largest Contentful Paint image was lazily loaded" */}
        <NextImage
          className="mx-auto rounded-xl shadow-xl md:mx-0"
          height={350}
          width={350}
          src={profileLargeImage}
          alt="Profile picture of Fabian"
          unoptimized
          priority
        />
      </div>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </section>
  )
}
