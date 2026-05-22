import NextImage from "next/image"
import { type PodcastSeries, type WithContext } from "schema-dts"
import spotifyIcon from "@/content/images/podcast/spotify.svg"
import applePodcastsIcon from "@/content/images/podcast/apple-podcasts.svg"
import rssIcon from "@/content/images/podcast/rss.svg"
import podcastCover from "@/content/images/podcast/logo-512x512.png"
import { Headline2 } from "@/components/layout/headline"
import { SocialLink } from "@/components/social-links"
import { host } from "@/lib/next"
import { podcastName } from "@/content/config"

const podcast = {
  name: podcastName,
  description:
    "Produktivität durch Technik. Über KI, Automatisierung und smarte Tools aus dem Entwickleralltag. Entspannt, ehrlich und direkt aus dem Feierabend. 🍻",
  coverImage: podcastCover,
  feedUrl: "https://anchor.fm/s/112e48794/podcast/rss",
  originalImageUrl:
    "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/46019341/46019341-1779459878789-95e060b532ce5.jpg",
  platforms: [
    {
      label: "Spotify",
      href: "https://open.spotify.com/show/033l9Xf9LtcTxJWx8OvRgG",
      imageSrc: spotifyIcon,
    },
    {
      label: "Apple Podcasts",
      href: "https://podcasts.apple.com/de/podcast/der-feierabend-commit/id1896796759",
      imageSrc: applePodcastsIcon,
    },
    {
      label: "RSS-Feed",
      href: "https://anchor.fm/s/112e48794/podcast/rss",
      imageSrc: rssIcon,
    },
  ],
}

const jsonLd: WithContext<PodcastSeries> = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: podcast.name,
  description: podcast.description,
  image: podcast.originalImageUrl,
  url: `https://${host}`,
  inLanguage: "de",
  author: { "@type": "Person", name: "Fabian Rosenthal" },
  webFeed: podcast.feedUrl,
  sameAs: podcast.platforms.map((p) => p.href),
}

type Platform = {
  label: string
  href: string
  imageSrc: unknown
}

export function PodcastReferenceTile({
  headline,
  description,
  platforms,
  coverAlt,
}: {
  headline: string
  description: React.ReactNode
  platforms: Array<Platform>
  coverAlt?: string
}) {
  return (
    <div className="pt-2 sm:flex sm:gap-6">
      <NextImage
        src={podcastCover}
        alt={coverAlt ?? `Cover von ${podcastName}`}
        width={140}
        height={140}
        className="rounded-lg shadow-md"
      />
      <div className="pt-4 sm:pt-0">
        <h3 className="sr-only">{headline}</h3>
        <p className="leading-7">{description}</p>
        <ul aria-label={`Plattformen, auf denen ${podcastName} verfügbar ist`} className="flex items-center gap-4 pt-4">
          {platforms.map((p, i) => (
            <li key={i}>
              <SocialLink {...p} width={32} className="duration-500 group-hover:scale-110" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Podcast() {
  return (
    <section className="pt-10 md:pt-12">
      <Headline2>Podcast: {podcast.name}</Headline2>
      <PodcastReferenceTile
        headline={`Podcast: ${podcast.name}`}
        description={podcast.description}
        platforms={podcast.platforms}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  )
}
