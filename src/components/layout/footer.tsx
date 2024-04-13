import NextLink from "next/link"

import threadsIcon from "@/images/social/threads.svg"
import youtubeIcon from "@/images/social/youtube.svg"
import instagramIcon from "@/images/social/instagram.svg"
import githubIcon from "@/images/social/github.svg"
import linkedinIcon from "@/images/social/linkedin.svg"
import { legalNoticePage } from "@/lib/links"
import { SocialLink } from "@/components/social-links"

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

export function Footer() {
  return (
    <footer className="pxcontent border-t-[1px] border-gray-100 py-6 md:flex md:justify-between">
      <div role="list" aria-label="Links to social media profiles" className="flex items-center space-x-4">
        {socialLinks.map((l, index) => (
          <span key={index} role="listitem">
            <SocialLink {...l} className="group-hover:grayscale" />
          </span>
        ))}
      </div>
      <div className="pt-4 text-start text-slate-700 md:pt-0 md:text-end">
        <span className="text-sm">© 2024 Fabian Rosenthal</span>
        <br />
        <span className="text-xs">
          <NextLink href={legalNoticePage} className="underline hover:no-underline">
            Legal Notice
          </NextLink>
        </span>
      </div>
    </footer>
  )
}
