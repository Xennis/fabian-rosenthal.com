import "server-only"

import youtubeIcon from "@/content/images/social/youtube.svg"
import githubIcon from "@/content/images/social/github.svg"
import instagramIcon from "@/content/images/social/instagram.svg"
import stravaIcon from "@/content/images/social/strava.svg"
import threadsIcon from "@/content/images/social/threads.svg"

import { blogPage, legalPage } from "@/content/config"

const socialLinks = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@fabian.rosenthal",
    imageSrc: youtubeIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/fabianrosenthal.dev",
    imageSrc: instagramIcon,
  },
  {
    label: "Threads",
    href: "https://www.threads.net/@the.fabian.rosenthal",
    imageSrc: threadsIcon,
  },
  {
    label: "Strava",
    href: "https://www.strava.com/athletes/fabian-rosenthal",
    imageSrc: stravaIcon,
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
    { emoji: "👨‍💻", text: "Software Engineer by profession" },
    { emoji: "🏃", text: "Athlete by hobby" },
    { emoji: "🎯", text: "Current mission: Building apps for myself to live healthier and get fitter" },
  ],
  socialLinks: socialLinks,
}

export const getCollections = () => {
  return collections
}
