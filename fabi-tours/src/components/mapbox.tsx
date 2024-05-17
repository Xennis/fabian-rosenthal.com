"use client"

import { useRef, useEffect } from "react"
import mapboxgl, { type AnySourceData } from "mapbox-gl"

import { castToPlaceProperties } from "@/lib/places"

import "mapbox-gl/dist/mapbox-gl.css"
import "./mapbox.css"

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
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/xennis/clwae1a00007001r0cwz1hgqp",
      center: [9.9872, 53.5488],
      zoom: 12,
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

      // Marker layer
      const sourceId = "places"
      const layerId = "places"

      map.addSource(sourceId, places)
      map.addLayer({
        id: layerId,
        type: "symbol",
        source: sourceId,
        layout: {
          "icon-image": ["get", "icon"],
          "icon-allow-overlap": true,
          "icon-size": 1.2,
        },
      })

      map.on("click", layerId, (e) => {
        const feature = e.features !== undefined ? e.features[0] : undefined
        if (feature === undefined || feature.geometry.type !== "Point") {
          return
        }
        const props = castToPlaceProperties(feature.properties)
        if (props === null) {
          return
        }

        // Copy coordinates array.
        const coordinates = feature.geometry.coordinates.slice()
        const description = `
<div class="xpop">
    <span class="title">${props.title}</span>
    <ul class="tags">${props.tags.map((p, index) => `<li>#${p}</li>`)}</ul>
    <ul class="links">
        ${props.googleMaps && `<li><a href="${props.googleMaps}" target="_blank">Google Maps</a></li>`}
        ${props.komoot && `<li><a href="${props.komoot}" target="_blank">Komoot</a></li>`}
    </ul>
</div>`

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup().setLngLat([coordinates[0], coordinates[1]]).setHTML(description).addTo(map)
      })

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on("mouseenter", layerId, () => {
        map.getCanvas().style.cursor = "pointer"
      })

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", layerId, () => {
        map.getCanvas().style.cursor = ""
      })
    })
  })

  return <div ref={mapContainer} className={className} />
}
