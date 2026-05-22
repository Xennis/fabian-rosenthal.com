import NextImage from "next/image"

export function SocialLink({
  label,
  href,
  imageSrc,
  className,
  width = 25,
}: {
  label: string
  href: string
  imageSrc: any
  className?: string
  width?: number
}) {
  return (
    <a href={href} title={label} target="_blank" className="group hover:text-primary-500">
      <span className="sr-only">{label}</span>
      <NextImage aria-hidden={true} className={className} width={width} src={imageSrc} alt={`${label} logo`} />
    </a>
  )
}
