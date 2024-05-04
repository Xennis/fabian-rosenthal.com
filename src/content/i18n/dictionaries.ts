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
      newsletter: {
        headline: "Subscribe to My Newsletter",
        subtitle: "Read about my insights and learning journey",
      },
      voluntarySupport: {
        headline: "Voluntary Software Support",
        subtitle: "Free software help for nonprofit clubs, volunteers, private individuals, ...",
        bookingHeadline: "Book Your Appointment",
        bookingInfoPrefix: "What do I need to do?",
        bookingInfo:
          "Simply book a 15, 30, or 45 minute appointment in the calendar below. Once I confirm the appointment, you will be invited to a video call.",
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
    metadata: {
      title: "Fabian Rosenthal",
      description:
        "My site features articles and insight about solo software businesses and micro SaaS: Starting a business as a software developer. Finding and validating software ideas.",
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
        tagsSrLabel: "Tags",
      },
      newsletter: {
        headline: "Abonniere meinen Newsletter",
        subtitle: "Meine Einblicke und Erkenntnisse aus der Software-Welt",
      },
      voluntarySupport: {
        headline: "Ehrenamtlicher Software-Support",
        subtitle: "Kostenloser Software-Hilfe für gemeinnützige Vereine, Ehrenamtliche, Privatpersonen, ...",
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
    metadata: {
      title: "Fabian Rosenthal",
      description: "Einblicke über meine Arbeit als Softwareentwickler.",
    },
  },
}

export const getDictionary = (locale: string | null) => {
  if (locale && locale in dictionaries) {
    return dictionaries[locale as keyof typeof dictionaries]
  }
  return dictionaries.en
}
