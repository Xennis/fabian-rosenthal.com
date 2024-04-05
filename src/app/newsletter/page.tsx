import { Dot } from "@/components/dot"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Newsletter",
}

export default function NewsletterPage() {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-center leading-tight">
          Subscribe to My Newsletter
          <Dot />
        </h1>
        <div>Read about my insights and learning journey</div>
      </div>
      <iframe
        src="https://fabianrosenthal.substack.com/embed"
        className="h-[500px] w-full border-0 bg-none"
        scrolling="no"
      ></iframe>
    </>
  )
}
