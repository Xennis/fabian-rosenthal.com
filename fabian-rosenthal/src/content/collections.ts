import "server-only"

import threadsIcon from "@/content/images/social/threads.svg"
import youtubeIcon from "@/content/images/social/youtube.svg"
import instagramIcon from "@/content/images/social/instagram.svg"
import githubIcon from "@/content/images/social/github.svg"
import linkedinIcon from "@/content/images/social/linkedin.svg"

import { aboutPage, blogPage, legalPage, newsletterPage, voluntarySupport } from "@/content/config"

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

const collections = {
  en: {
    footer: {
      navLinks: [{ label: "Legal Notice", href: legalPage("en") }],
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
      navLinks: [
        // { label: "Articles", href: blogPage("en") },
        { label: "Support", href: voluntarySupport("en") },
        { label: "About", href: aboutPage("en") },
      ],
    },
    shortBio: [
      { emoji: "👨‍💻", text: "Software Engineer" },
      { emoji: "🏗️", text: "Building large applications & micro SaaS" },
      { emoji: "📖", text: "Sharing my knowledge on building software products" },
    ],
    socialLinks: socialLinks,
    projects: [
      {
        name: "FabiTours",
        href: "https://fabi-tours.vercel.app/en",
        tags: ["Next.js", "PWA", "Mapbox"],
        shortDescription: "The interactive map shows the most beautiful places in Hamburg, Germany.",
      },
      {
        name: "WunderDesk",
        href: "https://wunderdesk.app",
        tags: ["SaaS"],
        shortDescription: "The easiest way to build your help center with Notion.",
      },
      {
        name: "Green Walking: Walk & Hike Map",
        href: "https://xennis.github.io/green-walking/",
        tags: ["AndroidApp", "Flutter"],
        shortDescription: "The map shows all kinds of trails for walking and hiking.",
      },
      {
        name: "Restore Leveling After G28",
        href: "https://plugins.octoprint.org/plugins/restorelevelingafterg28/",
        tags: ["OctoPrintPlugin", "3DPrinting"],
        shortDescription: "Automatically keeps bed leveling on after G28 (Auto Home).",
      },
      {
        name: "Life Clock App",
        href: "https://play.google.com/store/apps/details?id=org.xennis.apps.lifetime_clock",
        tags: ["AndroidApp", "Flutter"],
        shortDescription: "A clock to visualize your life to encourage making the most out of it.",
      },
      {
        name: "EpiDoc Parser",
        href: "https://xennis.github.io/epidoc-parser/",
        tags: ["PythonLibrary"],
        shortDescription: "Python parser for EpiDoc (epigraphic documents in TEI XML).",
      },
    ],
  },
  de: {
    footer: {
      navLinks: [{ label: "Impressum", href: legalPage("de") }],
    },
    gdprIframe: {
      calcom: {
        firstLine: "Für Terminbuchungen verwende ich den externen Kalender Cal.com.",
        secondLine: "Durch einen Klicken auf den Button, stimmst du der Verwendung von Cookies durch Cal.com zu.",
        gdprLinkPrefix: "Für Details, schaue in ihre",
        gdprLinkLabel: "Datenschutzerklärung",
        gdprLinkHref: "https://cal.com/privacy",
      },
      substack: {
        firstLine: "Für meinen Newsletter verwende ich den externen Dienst Substack.",
        secondLine: "Durch einen Klicken auf den Button, stimmst du der Verwendung von Cookies durch Substack zu.",
        gdprLinkPrefix: "Für Details, schaue in ihre",
        gdprLinkLabel: "Datenschutzerklärung",
        gdprLinkHref: "https://substack.com/privacy",
      },
    },
    header: {
      navLinks: [
        { label: "Support", href: voluntarySupport("de") },
        { label: "Über", href: aboutPage("de") },
      ],
    },
    shortBio: [
      { emoji: "👨‍💻", text: "Softwareentwickler" },
      { emoji: "🏗️", text: "Bau großer Anwendungen & Micro-SaaS" },
      { emoji: "📖", text: "Teile mein Wissen über den Bau von Softwareprodukten" },
    ],
    socialLinks: socialLinks,
    projects: [
      {
        name: "FabiTours",
        href: "https://fabi-tours.vercel.app/de",
        tags: ["Next.js", "PWA", "Mapbox"],
        shortDescription: "Die interaktive Karte zeigt die schönsten Orte in Hamburg.",
      },
      {
        name: "WunderDesk",
        href: "https://wunderdesk.app",
        tags: ["SaaS"],
        shortDescription: "Erstelle Dein Hilfe-Center ganz einfach mit Notion.",
      },
      {
        name: "Green Walking: Walk & Hike Map",
        href: "https://xennis.github.io/green-walking/",
        tags: ["AndroidApp", "Flutter"],
        shortDescription: "Die Karte zeigt allerlei Wege zum Wandern und Spazieren.",
      },
      {
        name: "Restore Leveling After G28",
        href: "https://plugins.octoprint.org/plugins/restorelevelingafterg28/",
        tags: ["OctoPrintPlugin", "3DPrinting"],
        shortDescription: "Das Plugin lässt das Bed-Leveling nach einem G28 (Auto Home) Kommando automatisch an.",
      },
      {
        name: "Life Clock App",
        href: "https://play.google.com/store/apps/details?id=org.xennis.apps.lifetime_clock",
        tags: ["AndroidApp", "Flutter"],
        shortDescription: "Eine Uhr zum Visualisieren deines Lebens, um das Beste daraus zu machen.",
      },
      {
        name: "EpiDoc Parser",
        href: "https://xennis.github.io/epidoc-parser/",
        tags: ["PythonLibrary"],
        shortDescription: "Python-Parser für EpiDoc (epigraphisch Dokumente in TEI XML).",
      },
    ],
  },
}

export const getCollections = (locale: string | null) => {
  if (locale && locale in collections) {
    return collections[locale as keyof typeof collections]
  }
  return collections.en
}
