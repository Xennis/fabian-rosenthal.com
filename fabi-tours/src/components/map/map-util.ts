import { type ReadonlyURLSearchParams } from "next/navigation"
import mapboxgl, { AnySourceData } from "mapbox-gl"
import { castToPlaceProperties } from "@/lib/places"

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
}
