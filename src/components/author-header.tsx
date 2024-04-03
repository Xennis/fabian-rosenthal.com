import NextImage from "next/image"

import { SocialLink } from "@/components/social-links"
import authorLargeImage from "@/images/author-large.png"
import threadsIcon from "@/images/social/threads.svg"
import youtubeIcon from "@/images/social/youtube.svg"
import instagramIcon from "@/images/social/instagram.svg"
import githubIcon from "@/images/social/github.svg"
import linkedinIcon from "@/images/social/linkedin.svg"

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
    <div className="flex items-center justify-center space-x-16">
      <div>
        <h1>
          Ahoi, I&apos;m Fabian
          <span aria-hidden={true} className="text-7xl text-[#18b83d]">
            .
          </span>
        </h1>
        <div>I 💚 travelling, software development & hiking.</div>
        {!hideSocialLinks && (
          <div className="flex space-x-4 pt-8">
            {socialLinks.map((l, index) => (
              <SocialLink key={index} {...l} className="grayscale group-hover:grayscale-0" />
            ))}
          </div>
        )}
      </div>
      <NextImage
        className="rounded-xl shadow-xl"
        width={350}
        src={authorLargeImage}
        alt="Picture of Fabian"
        unoptimized
      />
    </div>
  )
}
