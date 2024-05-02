import { type Metadata } from "next"

import { host } from "@/lib/links"
import { getDictionary } from "@/content/i18n/dictionaries"
import { RootLayout } from "@/components/layout/root-layout"
import { i18n } from "@/content/i18n/config"

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata | null> {
  const dictionary = getDictionary(params.lang).metadata

  return {
    description: dictionary.description,
    openGraph: {
      description: dictionary.description,
      title: dictionary.title,
      type: "website",
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
  }
}

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return <RootLayout lang={params.lang}>{children}</RootLayout>
}
