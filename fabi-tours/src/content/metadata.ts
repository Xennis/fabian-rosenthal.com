import { i18n } from "@/content/i18n"
import { host } from "@/content/config"

export const getMetadata = (lang?: string) => {
  const dictionary =
    lang === undefined || lang === i18n.defaultLocale
      ? {
          title: "FabiTours",
          description: "Discover the green spaces of Hamburg",
        }
      : {
          title: "FabiTours",
          description: "Entdecke die grünen Ecken von Hamburg",
        }

  return {
    description: dictionary.description,
    openGraph: {
      description: dictionary.description,
      title: {
        default: dictionary.title,
        template: `%s - ${dictionary.title}`,
      },
      type: "website",
      siteName: dictionary.title,
    },
    metadataBase: new URL(`https://${host}`),
    robots: {
      index: true,
      follow: true,
    },
    title: {
      default: dictionary.title,
      template: `%s - ${dictionary.title}`,
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  }
}
