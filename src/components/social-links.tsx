import NextImage from "next/image"

export function SocialLink({
  label,
  href,
  imageSrc,
  className,
}: {
  label: string
  href: string
  imageSrc: any
  className?: string
}) {
  return (
    <a href={href} title={label} target="_blank" className="hover:text-primary-500 group">
      <span className="sr-only">{label}</span>
      <NextImage aria-hidden={true} className={className} width={25} src={imageSrc} alt={`${label} logo`} />
    </a>
  )
}
