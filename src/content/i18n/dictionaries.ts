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
    pages: {
      about: {
        title: "About",
      },
      legalNotice: {
        title: "Legal Notice",
      },
      notFound: {
        title: "Not Found",
        headline: "Page Not Found",
        messagePrefix: "This page could not be found. Return to",
        messageLinkLabel: "Home",
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
        tagsSrLabel: "Tags",
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
    pages: {
      about: {
        title: "Über",
      },
      legalNotice: {
        title: "Impressum",
      },
      // Won't be translated anyway
      notFound: {
        title: "Not Found",
        headline: "Page Not Found",
        messagePrefix: "This page could not be found. Return to",
        messageLinkLabel: "Home",
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
