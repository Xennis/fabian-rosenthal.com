"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

import { brandColor } from "@/content/config"

export function CalComIframe({ calLink }: { calLink: string }) {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi()
      cal("ui", { styles: { branding: { brandColor: brandColor } }, hideEventTypeDetails: false, layout: "month_view" })
    })()
  }, [])
  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  )
}
