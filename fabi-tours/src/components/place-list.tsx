import { Place, PlaceTag, tagColors, tagLabel } from "@/lib/cms/places"
import { PlaceCard } from "@/components/place-card"

export default async function PlaceList({ lang, places }: { lang: string; places: Array<Place> }) {
  const placesByTag = new Map<PlaceTag, Array<Place>>()
  places.forEach((p) => {
    const tag = p.properties.mainTag
    if (placesByTag.has(tag)) {
      placesByTag.set(tag, [...placesByTag.get(tag)!, p])
    } else {
      placesByTag.set(tag, [p])
    }
  })

  return (
    <div className="">
      {[...placesByTag.entries()].map(([tag, places], index) => {
        return (
          <div key={index}>
            <h2
              className="pb-4 pt-6 text-2xl font-semibold underline decoration-4 underline-offset-4 sm:text-3xl"
              style={{ textDecorationColor: tagColors[tag] }}
            >
              {tagLabel(lang)[tag]}
            </h2>
            <ul>
              {places.map((p, j) => {
                return (
                  <li key={j} className="py-2">
                    <h3 className="pb-2 pt-4 text-lg font-semibold md:text-xl">{p.properties.title}</h3>
                    <PlaceCard properties={p.properties} />
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
