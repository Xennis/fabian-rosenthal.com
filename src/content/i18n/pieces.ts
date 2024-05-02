import "server-only"

import threadsIcon from "@/content/images/social/threads.svg"
import youtubeIcon from "@/content/images/social/youtube.svg"
import instagramIcon from "@/content/images/social/instagram.svg"
import githubIcon from "@/content/images/social/github.svg"
import linkedinIcon from "@/content/images/social/linkedin.svg"

import { aboutPage, legalNoticePage } from "@/lib/links"

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

const pieces = {
  en: {
    footer: {
      navLinks: [{ label: "Legal Notice", href: legalNoticePage("en") }],
    },
    header: {
      navLinks: [
        { label: "YouTube", href: "https://www.youtube.com/@fabian.rosenthal", target: "_blank" },
        { label: "About", href: aboutPage("en") },
      ],
    },
    socialLinks: socialLinks,
    projects: [
      {
        name: "WunderDesk",
        href: "https://wunderdesk.app",
        tags: ["SaaS"],
        shortDescription: "The easiest way to build your help center with Notion.",
      },
      {
        name: "Green Walking: Walk & Hike Map",
        href: "https://fabian-rosenthal.com/green-walking/",
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
        name: "Hamburg Stairs Map",
        href: "https://fabian-rosenthal.com/hamburg-stairs-map/",
        tags: ["Mapbox", "OverpassAPI"],
        shortDescription: "A map to visualize the stairs in Hamburg, Germany.",
      },
      {
        name: "EpiDoc Parser",
        href: "https://fabian-rosenthal.com/epidoc-parser/",
        tags: ["PythonLibrary"],
        shortDescription: "Python parser for EpiDoc (epigraphic documents in TEI XML).",
      },
    ],
  },
  de: {
    footer: {
      navLinks: [{ label: "Impressum", href: legalNoticePage("de") }],
    },
    header: {
      navLinks: [
        { label: "YouTube", href: "https://www.youtube.com/@fabian.rosenthal", target: "_blank" },
        { label: "Über", href: aboutPage("de") },
      ],
    },
    socialLinks: socialLinks,
    projects: [
      {
        name: "WunderDesk",
        href: "https://wunderdesk.app",
        tags: ["SaaS"],
        shortDescription: "Erstelle Dein Hilfe-Center ganz einfach mit Notion.",
      },
      {
        name: "Green Walking: Walk & Hike Map",
        href: "https://fabian-rosenthal.com/green-walking/",
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
        name: "Hamburg Treppenkarte",
        href: "https://fabian-rosenthal.com/hamburg-stairs-map/",
        tags: ["Mapbox", "OverpassAPI"],
        shortDescription: "Die interaktive Karte visualisiert die Treppen in der Stadt Hamburg.",
      },
      {
        name: "EpiDoc Parser",
        href: "https://fabian-rosenthal.com/epidoc-parser/",
        tags: ["PythonLibrary"],
        shortDescription: "Python-Parser für EpiDoc (epigraphisch Dokumente in TEI XML).",
      },
    ],
  },
}

export const getPiece = (locale: string | null) => {
  if (locale && locale in pieces) {
    return pieces[locale as keyof typeof pieces]
  }
  return pieces.en
}
