import "server-only"

const dictionaries = {
  en: {
    component: {
      authorHeader: {
        headline: "Ahoy, I'm Fabian",
        subtitlePrefix: "I",
        subtitleAriaLabel: "love",
        subtitleSuffix: "travelling, software development & hiking.",
        imageAlt: "Picture of Fabian",
      },
      projects: {
        headline: "Current Projects",
        tagsSrLabel: "Tags",
      },
      shortBio: {
        headline: "Short Bio",
        morePrefix: "Read more on the",
        moreLinkLabel: "About",
        moreSuffix: "page",
      },
      voluntarySupport: {
        bookingHeadline: "Book Your Appointment",
        bookingInfoPrefix: "What do I need to do?",
        bookingInfo:
          "Simply book a 15, 30, or 45-minute appointment on the calendar below. Once I confirm the appointment, you will be invited to a video call.",
      },
      gdprIframe: {
        consentButtonLabel: "Load external content",
      },
    },
    footer: {
      copyright: "© 2024 Fabian Rosenthal",
      socialLinksAriaLabel: "Links to social media profiles",
    },
    header: {
      logo: {
        title: "Fabian Rosenthal",
        subtitle: "Software Engineer",
        subtitlePrefix: "The Enthusiastic",
        ariaLabel: "Home",
      },
    },
  },
  de: {
    component: {
      authorHeader: {
        headline: "Ahoi, ich bin Fabian",
        subtitlePrefix: "Ich",
        subtitleAriaLabel: "liebe",
        subtitleSuffix: "reisen, Softwareentwicklung & wandern.",
        imageAlt: "Bild von Fabian",
      },
      projects: {
        headline: "Aktuelle Projekte",
        tagsSrLabel: "Projektkategorien",
      },
      shortBio: {
        headline: "Kurzbiografie",
        morePrefix: "Mehr auf der",
        moreLinkLabel: "Über",
        moreSuffix: "Seite",
      },
      voluntarySupport: {
        bookingHeadline: "Buche Deinen Termin",
        bookingInfoPrefix: "Was muss ich tun?",
        bookingInfo:
          "Buche einfach einen 15-, 30- oder 45-minütigen Termin im Kalender unten. Wenn ich den Termin bestätige, wirst du zu einem Video-Telefonat eingeladen.",
      },
      gdprIframe: {
        consentButtonLabel: "Externe Inhalte laden",
      },
    },
    footer: {
      copyright: "© 2024 Fabian Rosenthal",
      socialLinksAriaLabel: "Links zu den Profilen in den sozialen Medien",
    },
    header: {
      logo: {
        title: "Fabian Rosenthal",
        subtitle: "Softwareentwickler",
        subtitlePrefix: "Der begeisterte",
        ariaLabel: "Startseite",
      },
    },
  },
}

export const getDictionary = (locale: string | null) => {
  if (locale && locale in dictionaries) {
    return dictionaries[locale as keyof typeof dictionaries]
  }
  return dictionaries.en
}
