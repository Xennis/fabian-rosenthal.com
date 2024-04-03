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
    <a href={href} target="_blank" className="group hover:text-[#18b83d]">
      <span className="sr-only">{label}</span>
      <NextImage aria-hidden={true} className={className} width={26} src={imageSrc} alt={`${label} icon`} />
    </a>
  )
}
