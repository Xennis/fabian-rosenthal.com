import { i18n } from "@/content/i18n"
import { pageTitle } from "@/content/config"

export const getMetadata = (lang: string) => {
  const dictionary =
    lang === i18n.defaultLocale
      ? {
          description:
            "My site features articles and insight about solo software businesses and micro SaaS: Starting a business as a software developer. Finding and validating software ideas.",
        }
      : {
          description: "Einblicke über meine Arbeit als Softwareentwickler.",
        }

  return {
    description: dictionary.description,
    openGraph: {
      description: dictionary.description,
      // title: Is included as template in the layout
      type: "website",
      siteName: pageTitle,
    },
  }
}
