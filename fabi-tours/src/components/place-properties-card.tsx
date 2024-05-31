import { MapIcon, MapPinIcon, StarIcon, TagIcon } from "@heroicons/react/24/outline"

import { cn } from "@/lib/tw"
import { PlaceProperties, tagColors, tagLabel } from "@/lib/cms/places"

const Link = ({ className, ...props }: React.ComponentPropsWithoutRef<"a">) => {
  /* outline-none: Somehow the link is auto-selected if a new page with a place is opened */
  return (
    <a
      className={cn("underline decoration-emerald-500 decoration-2 outline-none hover:no-underline", className ?? "")}
      {...props}
    >
      {props.children}
    </a>
  )
}

export const PlacePropertiesCard = ({ lang, props }: { lang: string; props: PlaceProperties }) => {
  return (
    <>
      <div className="flex space-x-3">
        <span
          className="rounded px-1.5 py-0.5 text-sm text-white"
          style={{ backgroundColor: tagColors[props.mainTag] }}
        >
          {tagLabel(lang)[props.mainTag]}
        </span>
        <div className="flex items-center space-x-0.5">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={cn(
                "h-4 w-4",
                props.rating !== null && props.rating > rating
                  ? "fill-yellow-300 text-yellow-300"
                  : "fill-gray-300 text-gray-300",
              )}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-6 gap-x-2 gap-y-3 pt-5">
        <MapPinIcon className="h-6 w-6" />
        <span className="col-span-5">{props.address}</span>
        <MapIcon className="h-6 w-6" />
        <Link className="col-span-5" href={props.googleMaps} target="_blank">
          maps.google.com
        </Link>
        {props.komoot !== null ? (
          <>
            <TagIcon className="h-6 w-6" />
            <Link className="col-span-5" href={props.komoot} target="_blank">
              komoot.com
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
