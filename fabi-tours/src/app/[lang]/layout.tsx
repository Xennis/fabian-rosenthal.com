import { type Metadata } from "next"

import { RootLayout } from "@/components/layout/root-layout"
import { i18n } from "@/content/i18n"
import { host } from "@/content/config"

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata | null> {
  const dictionary =
    params.lang === i18n.defaultLocale
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
      google: process.env.GOOGLE_SITE_VERIFICATION
    },
  }
}

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return <RootLayout lang={params.lang}>{children}</RootLayout>
}
