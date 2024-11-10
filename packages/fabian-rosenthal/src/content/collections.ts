import "server-only"

import threadsIcon from "@/content/images/social/threads.svg"
import youtubeIcon from "@/content/images/social/youtube.svg"
import githubIcon from "@/content/images/social/github.svg"
import linkedinIcon from "@/content/images/social/linkedin.svg"

import { blogPage, legalPage } from "@/content/config"

const socialLinks = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@fabian.rosenthal",
    imageSrc: youtubeIcon,
  },
  {
    label: "Threads",
    href: "https://www.threads.net/@the.fabian.rosenthal",
    imageSrc: threadsIcon,
  },
  // {
  //   label: "Instagram",
  //   href: "https://www.instagram.com/the.fabian.rosenthal/",
  //   imageSrc: instagramIcon,
  // },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fabian-rosenthal",
    imageSrc: linkedinIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/Xennis",
    imageSrc: githubIcon,
  },
]

const collections = {
  footer: {
    navLinks: [{ label: "Legal Notice", href: legalPage }],
  },
  gdprIframe: {
    calcom: {
      firstLine: "I use the external calendar from Cal.com for scheduling calls.",
      secondLine: "By clicking the button, you consent to the use of cookies by Cal.com.",
      gdprLinkPrefix: "For details, please see their",
      gdprLinkLabel: "privacy policy",
      gdprLinkHref: "https://cal.com/privacy",
    },
    substack: {
      firstLine: "I use the external service Substack for my newsletter.",
      secondLine: "By clicking the button, you consent to the use of cookies by Substack.",
      gdprLinkPrefix: "For details, please see their",
      gdprLinkLabel: "privacy policy",
      gdprLinkHref: "https://substack.com/privacy",
    },
  },
  header: {
    navLinks: [{ label: "Articles", href: blogPage }],
  },
  shortBio: [
    { emoji: "👨‍💻", text: "Software Engineer" },
    { emoji: "🏗️", text: "Building large applications & micro SaaS" },
    { emoji: "📖", text: "Sharing my knowledge on building software products" },
  ],
  socialLinks: socialLinks,
}

export const getCollections = () => {
  return collections
}
