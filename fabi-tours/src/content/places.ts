import { type GeoJSONSourceRaw } from "mapbox-gl"

export const places: GeoJSONSourceRaw = {
  // This GeoJSON contains features that include an "icon" property. The value of the "icon" property corresponds
  // to an image in the Mapbox Streets style's sprite.
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          description:
            '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
          icon: "theatre",
        },
        geometry: {
          type: "Point",
          coordinates: [9.9872, 53.5488],
        },
      },
    ],
  },
}
