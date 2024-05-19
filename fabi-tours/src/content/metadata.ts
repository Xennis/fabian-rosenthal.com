import { i18n } from "@/content/i18n"
import { pageTitle } from "@/content/config"

export const getMetadata = (lang: string) => {
  const dictionary =
    lang === i18n.defaultLocale
      ? {
          description: "Discover the green spaces of Hamburg",
        }
      : {
          description: "Entdecke die grünen Ecken von Hamburg",
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
