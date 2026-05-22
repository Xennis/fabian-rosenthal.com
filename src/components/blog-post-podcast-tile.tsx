import { PodcastReferenceTile } from "@/components/podcast"
import { podcastName } from "@/content/config"
import spotifyIcon from "@/content/images/podcast/spotify.svg"
import applePodcastsIcon from "@/content/images/podcast/apple-podcasts.svg"

export function BlogPostPodcastTile({
  spotifyUrl,
  applePodcastUrl,
}: {
  spotifyUrl: string | null
  applePodcastUrl: string | null
}) {
  const platforms: Array<{ label: string; href: string; imageSrc: unknown }> = []
  if (spotifyUrl) {
    platforms.push({ label: "Spotify", href: spotifyUrl, imageSrc: spotifyIcon })
  }
  if (applePodcastUrl) {
    platforms.push({ label: "Apple Podcasts", href: applePodcastUrl, imageSrc: applePodcastsIcon })
  }
  if (platforms.length === 0) {
    return null
  }

  return (
    <div className="mb-8 rounded-lg bg-gray-50 p-4 sm:p-6">
      <PodcastReferenceTile
        headline={`Podcast-Folge: ${podcastName}`}
        description={
          <>
            Diesen Beitrag gibt es auch zum Hören – ursprünglich ist er eine Folge meines Podcasts{" "}
            <em>{podcastName}</em>. Lehn dich zurück und hör rein; der Artikel hier ist die Textfassung dazu.
          </>
        }
        platforms={platforms}
      />
    </div>
  )
}
