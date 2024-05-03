"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

import { brandColor } from "@/content/theme"

export default function CalComIframe() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi()
      cal("ui", { styles: { branding: { brandColor: brandColor } }, hideEventTypeDetails: false, layout: "month_view" })
    })()
  }, [])
  return (
    <Cal
      calLink="fabian.rosenthal/voluntary-support"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  )
}
