import "server-only"

import youtubeIcon from "@/content/images/social/youtube.svg"
import githubIcon from "@/content/images/social/github.svg"
import instagramIcon from "@/content/images/social/instagram.svg"
import spotifyIcon from "@/content/images/podcast/spotify.svg"
import applePodcastsIcon from "@/content/images/podcast/apple-podcasts.svg"
import podcastdeIcon from "@/content/images/podcast/podcastde.png"
import rssIcon from "@/content/images/podcast/rss.svg"

import { blogPage, legalPage, podcastFeedUrl } from "@/content/config"

const spotifyLink = {
  label: "Spotify",
  href: "https://open.spotify.com/show/033l9Xf9LtcTxJWx8OvRgG",
  imageSrc: spotifyIcon,
}
const applePodcastsLink = {
  label: "Apple Podcasts",
  href: "https://podcasts.apple.com/de/podcast/der-feierabend-commit/id1896796759",
  imageSrc: applePodcastsIcon,
}
const youtubeLink = {
  label: "YouTube",
  href: "https://www.youtube.com/@fabian.rosenthal",
  // subHref: "https://youtube.com/@fabian.rosenthal?sub_confirmation=1",
  imageSrc: youtubeIcon,
}
const githubLink = {
  label: "GitHub",
  href: "https://github.com/Xennis",
  imageSrc: githubIcon,
}
export const instagramLink = {
  label: "Instagram",
  href: "https://www.instagram.com/fabianrosenthal.dev",
  imageSrc: instagramIcon,
}
const podcastdeLink = {
  label: "Podcast.de",
  href: "https://www.podcast.de/podcast/3739192/der-feierabend-commit-tech-ki",
  imageSrc: podcastdeIcon,
}
// {
//   label: "Threads",
//   href: "https://www.threads.net/ahoyfabian",
//   imageSrc: threadsIcon,
// },
// {
//   label: "LinkedIn",
//   href: "https://www.linkedin.com/in/fabian-rosenthal",
//   imageSrc: linkedinIcon,
// },

const collections = {
  footer: {
    navLinks: [{ label: "Impressum", href: legalPage }],
  },
  gdprIframe: {
    calcom: {
      firstLine: "Ich nutze den externen Kalender von Cal.com, um Telefonate zu vereinbaren.",
      secondLine: "Mit einem Klick auf den Button stimmst du der Verwendung von Cookies durch Cal.com zu.",
      gdprLinkPrefix: "Details findest du in deren",
      gdprLinkLabel: "Datenschutzerklärung",
      gdprLinkHref: "https://cal.com/privacy",
    },
    substack: {
      firstLine: "Ich nutze den externen Dienst Substack für meinen Newsletter.",
      secondLine: "Mit einem Klick auf den Button stimmst du der Verwendung von Cookies durch Substack zu.",
      gdprLinkPrefix: "Details findest du in deren",
      gdprLinkLabel: "Datenschutzerklärung",
      gdprLinkHref: "https://substack.com/privacy",
    },
  },
  header: {
    navLinks: [{ label: "Blog", href: blogPage }],
  },
  shortBio: [
    { emoji: "👨‍💻", text: "Softwareentwickler von Beruf" },
    { emoji: "🏃", text: "Sportler aus Leidenschaft" },
    {
      emoji: "🎯",
      text: "Aktuelle Mission: Apps für mich selbst entwickeln, um gesünder zu leben und fitter zu werden",
    },
  ],
  homeSocialLinks: [spotifyLink, applePodcastsLink, youtubeLink],
  footerSocialLinks: [spotifyLink, applePodcastsLink, youtubeLink, instagramLink, githubLink],
  authorSameAsLinks: [youtubeLink, instagramLink, githubLink],
  podcastPlatforms: [
    spotifyLink,
    applePodcastsLink,
    podcastdeLink,
    {
      label: "RSS-Feed",
      href: podcastFeedUrl,
      imageSrc: rssIcon,
    },
  ],
}

export const getCollections = () => {
  return collections
}
