import type { MetadataRoute } from 'next'

import {brandColor} from "@/content/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FabiTours',
    short_name: 'FabiTours',
    description: 'Discover the green spaces of Hamburg',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: brandColor,
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
