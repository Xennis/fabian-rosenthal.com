import NextLink from "next/link"
import NextImage from "next/image"
import authorImage from "@/content/images/author-512x512.png"
import { pageTitle, youtubeSubscribeLink } from "@/content/config"
import youtubeIcon from "@/content/images/social/youtube.svg"
import { SocialLink } from "@/components/social-links"

function Logo({ homeHref }: { homeHref: string }) {
  return (
    <div>
      <NextLink title="Home" aria-label="Home" href={homeHref} className="group flex items-center">
        <NextImage
          className="rounded-sm"
          src={authorImage}
          alt="Profile picture of Fabian"
          width={75}
          height={75}
          quality={100}
        />
        <div className="ps-3">
          <span className="group-hover:text-primary-500 text-xl font-semibold tracking-tight">{pageTitle}</span>
          <br />
          <span>
            Software Engineer
            <span className="hidden sm:inline"> & Indie Hacker</span>
          </span>
        </div>
      </NextLink>
    </div>
  )
}

function NavLink({
  href,
  target,
  children,
}: {
  href: string
  target?: React.HTMLAttributeAnchorTarget
  children: React.ReactNode
}) {
  return (
    <NextLink
      href={href}
      target={target}
      className="decoration-primary-500 py-1 font-semibold underline decoration-2 hover:no-underline"
    >
      {children}
    </NextLink>
  )
}

export function Header({
  homeHref,
  navLinks,
}: {
  homeHref: string
  navLinks: Array<{ label: string; href: string; target?: React.HTMLAttributeAnchorTarget }>
}) {
  return (
    <header className="w-full bg-gray-100">
      <nav className="pxcontent mx-auto max-w-(--breakpoint-xl) py-7 md:flex md:items-center md:justify-between">
        <Logo homeHref={homeHref} />
        <div className="flex items-center justify-center space-x-6 pt-5 md:justify-normal md:space-x-4 md:pt-0">
          {navLinks.map((l, index) => (
            <NavLink key={index} href={l.href} target={l.target}>
              {l.label}
            </NavLink>
          ))}
          <HeroButton />
        </div>
      </nav>
    </header>
  )
}

const HeroButton = () => {
  return (
    <div className="border-onbackground-200 border-s-2 ps-6 hover:grayscale md:ps-3">
      <SocialLink label="Subscribe" href={youtubeSubscribeLink} imageSrc={youtubeIcon} />
    </div>
  )
}
