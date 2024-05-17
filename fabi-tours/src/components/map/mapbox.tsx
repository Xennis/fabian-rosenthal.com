"use client"

import { useRef, useEffect } from "react"
import mapboxgl, { type AnySourceData } from "mapbox-gl"

import "mapbox-gl/dist/mapbox-gl.css"
import "./mapbox.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { addMarkerLayer, parseSearchParams, getSearchParams } from "@/components/map/map-util"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

export default function Mapbox({
  lang,
  places,
  className,
}: {
  lang: string
  places: AnySourceData
  className?: string
}) {
  // map
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  // routing
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (map.current) return // initialize map only once

    let params = null
    try {
      params = parseSearchParams(searchParams)
    } catch (e) {
      router.push(pathname)
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/xennis/clwae1a00007001r0cwz1hgqp",
      center: params !== null ? [params.lng, params.lat] : [9.9872, 53.5488],
      zoom: params !== null ? params.z : 12,
      minZoom: 10,
      maxBounds: [
        [9.53475952, 53.32595198], // southwest
        [10.50979614, 53.77793497], // northeast
      ],
    })
      .addControl(new mapboxgl.NavigationControl())
      .addControl(new mapboxgl.GeolocateControl())
      .addControl(new mapboxgl.ScaleControl())

    map.current.on("load", (e) => {
      const map = e.target
      // Set local
      map.setLayoutProperty("country-label", "text-field", ["get", `name_${lang}`])

      map.on("moveend", (e) => {
        const current = getSearchParams(searchParams, e.target)
        router.push(`${pathname}?${current.toString()}`)
      })
      addMarkerLayer(map, places)
    })
  })

  return <div ref={mapContainer} className={className} />
}
