import "server-only"

import youtubeIcon from "@/content/images/social/youtube.svg"
import githubIcon from "@/content/images/social/github.svg"
import threadsIcon from "@/content/images/social/threads.svg"

import { blogPage, legalPage } from "@/content/config"

const socialLinks = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@fabian.rosenthal",
    imageSrc: youtubeIcon,
  },
  //{
  //  label: "Instagram",
  //  href: "https://www.instagram.com/fabianrosenthal.dev",
  //  imageSrc: instagramIcon,
  //},
  {
    label: "Threads",
    href: "https://www.threads.net/ahoyfabian",
    imageSrc: threadsIcon,
  },
  // {
  //   label: "LinkedIn",
  //   href: "https://www.linkedin.com/in/fabian-rosenthal",
  //   imageSrc: linkedinIcon,
  // },
  {
    label: "GitHub",
    href: "https://github.com/Xennis",
    imageSrc: githubIcon,
  },
]

const collections = {
  footer: {
    navLinks: [{ label: "Impressum", href: legalPage }],
  },
  gdprIframe: {
    calcom: {
      firstLine: "Ich nutze den externen Kalender von Cal.com, um Telefonate zu vereinbaren.",
      secondLine: "Mit einem Klick auf den Button stimmst du der Verwendung von Cookies durch Cal.com zu.",
      gdprLinkPrefix: "Details findest du in deren",
      gdprLinkLabel: "Datenschutzerklärung",
      gdprLinkHref: "https://cal.com/privacy",
    },
    substack: {
      firstLine: "Ich nutze den externen Dienst Substack für meinen Newsletter.",
      secondLine: "Mit einem Klick auf den Button stimmst du der Verwendung von Cookies durch Substack zu.",
      gdprLinkPrefix: "Details findest du in deren",
      gdprLinkLabel: "Datenschutzerklärung",
      gdprLinkHref: "https://substack.com/privacy",
    },
  },
  header: {
    navLinks: [{ label: "Blog", href: blogPage }],
  },
  shortBio: [
    { emoji: "👨‍💻", text: "Softwareentwickler von Beruf" },
    { emoji: "🏃", text: "Sportler aus Leidenschaft" },
    {
      emoji: "🎯",
      text: "Aktuelle Mission: Apps für mich selbst entwickeln, um gesünder zu leben und fitter zu werden",
    },
  ],
  socialLinks: socialLinks,
}

export const getCollections = () => {
  return collections
}
