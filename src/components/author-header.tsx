import NextImage from "next/image"

import { SocialLink } from "@/components/social-links"
import authorLargeImage from "@/images/author-large-350x383.webp"
import threadsIcon from "@/images/social/threads.svg"
import youtubeIcon from "@/images/social/youtube.svg"
import instagramIcon from "@/images/social/instagram.svg"
import githubIcon from "@/images/social/github.svg"
import linkedinIcon from "@/images/social/linkedin.svg"
import { Dot } from "@/components/dot"

const socialLinks = [
  {
    label: "Threads",
    href: "https://www.threads.net/@the.fabian.rosenthal",
    imageSrc: threadsIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@fabian.rosenthal",
    imageSrc: youtubeIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/the.fabian.rosenthal/",
    imageSrc: instagramIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/Xennis",
    imageSrc: githubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fabian-rosenthal",
    imageSrc: linkedinIcon,
  },
]

export function AuthorHeader({ hideSocialLinks }: { hideSocialLinks?: boolean }) {
  return (
    <div className="md:flex md:items-center md:justify-center md:space-x-16">
      <div className="pb-8 text-center md:pb-0">
        <h1>
          Ahoi, I&apos;m Fabian
          <Dot />
        </h1>
        <div>
          I <span aria-hidden={true}>💚</span>
          <span className="sr-only">love</span> travelling, software development & hiking.
        </div>
        {!hideSocialLinks && (
          <div role="list" aria-label="Links to social media profiles" className="flex justify-center space-x-4 pt-8">
            {socialLinks.map((l, index) => (
              <span key={index} role="listitem">
                <SocialLink {...l} className="grayscale group-hover:grayscale-0" />
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Priority is set to fix the Lighthouse error: "Largest Contentful Paint image was lazily loaded" */}
      <NextImage
        className="mx-auto rounded-xl shadow-xl md:mx-0"
        width={350}
        src={authorLargeImage}
        alt="Picture of Fabian"
        unoptimized
        priority
      />
    </div>
  )
}
