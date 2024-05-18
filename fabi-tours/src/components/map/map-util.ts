import { type ReadonlyURLSearchParams } from "next/navigation"
import mapboxgl, { type AnySourceData } from "mapbox-gl"

import { castToPlaceProperties, tagColors } from "@/lib/places"
import { matchGet } from "@/lib/mapbox-style"

const circleColors = matchGet("mainTag", tagColors, tagColors.unknown)

export const parseSearchParams = (params: ReadonlyURLSearchParams) => {
  const inZ = params.get("z")
  const inLat = params.get("lat")
  const inLng = params.get("lng")
  if (inZ === null && inLat === null && inLng === null) {
    return null
  }

  if (inZ && inLat && inLng) {
    const z = parseInt(inZ)
    const lat = parseFloat(inLat)
    const lng = parseFloat(inLng)
    if (!Number.isNaN(z) && !Number.isNaN(lat) && !Number.isNaN(lng)) {
      return {
        z: z,
        lat: lat,
        lng: lng,
      }
    }
  }
  throw TypeError("invalid search params")
}

export const getSearchParams = (params: ReadonlyURLSearchParams, map: mapboxgl.Map) => {
  // writable-copy
  const current = new URLSearchParams([...params.entries()])
  current.set("z", `${map.getZoom().toFixed(0)}`)
  current.set("lat", `${map.getCenter().lat.toFixed(7)}`)
  current.set("lng", `${map.getCenter().lng.toFixed(7)}`)
  return current
}

export const addMarkerLayer = (map: mapboxgl.Map, places: AnySourceData) => {
  const sourceId = "places"
  const layerId = "places"

  map.addSource(sourceId, places)
  map.addLayer({
    id: layerId,
    type: "circle",
    source: sourceId,
    paint: {
      // zoom is 5 (or less) -> circle radius will be 7px
      // zoom is 10 (or greater) -> circle radius will be 10px
      "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 7, 10, 10],
      "circle-color": circleColors,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#ffffff",
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
<div class="xpop text-base p-2">
    <div class="text-xl pb-2">${props.title}</div>
    <div class="flex space-x-3">
        <span class="rounded px-1.5 py-0.5 text-sm text-white" style="background-color: ${tagColors[props.mainTag]}">${props.mainTag}</span>
        <div class="flex items-center space-x-0.5">
        ${[0, 1, 2, 3, 4]
          .map(
            (
              rating,
            ) => `<svg class="w-4 h-4 ${props.rating > rating ? "text-yellow-300" : "text-gray-300"}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>`,
          )
          .join("")}
      </div>
    </div>
    <div class="grid grid-cols-6 gap-x-2 gap-y-3 pt-5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
      <span class="col-span-5">${props.address}</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
      <a class="col-span-5" href="${props.googleMaps}" target="_blank">maps.google.com</a>
      ${
        props.komoot !== null
          ? `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
</svg>
<a class="col-span-5" href="${props.komoot}" target="_blank">komoot.com</a>
      `
          : ""
      }
    </div>
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
}
