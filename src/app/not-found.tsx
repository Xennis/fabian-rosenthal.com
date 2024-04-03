import NextLink from "next/link"
import { homePage } from "@/lib/links"
import { Dot } from "@/components/dot"

export default function NotFound() {
  return (
    <>
      <h1>
        Page Not Found
        <Dot />
      </h1>
      <p>
        This page could not be found. Return to <NextLink href={homePage}>Home</NextLink>.
      </p>
    </>
  )
}
