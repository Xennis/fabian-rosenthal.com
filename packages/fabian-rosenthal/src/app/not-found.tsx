import NextLink from "next/link"
import { type Metadata } from "next"

import { homePage } from "@/content/config"
import { Headline } from "@/components/layout/headline"

export const metadata: Metadata = {
  title: "Not Found",
  robots: {
    index: false,
  },
}

export default function NotFound() {
  return (
    <div className="max-width-regular">
      <Headline>Page Not Found</Headline>
      <p>
        This page could not be found. Return to <NextLink href={homePage}>Home</NextLink>.
      </p>
    </div>
  )
}
