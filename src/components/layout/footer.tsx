import NextLink from "next/link"

import { SocialLink } from "@/components/social-links"

export function Footer({
  socialLinks,
  navLinks,
}: {
  socialLinks: Array<{ label: string; href: string; imageSrc: any }>
  navLinks: Array<{ label: string; href: string }>
}) {
  return (
    <footer className="pxcontent border-t-[1px] border-gray-100 py-6 md:flex md:justify-between">
      <ul aria-label="Links to social media profiles" className="flex items-center space-x-4">
        {socialLinks.map((l, index) => (
          <li key={index} role="listitem">
            <SocialLink {...l} className="group-hover:grayscale" />
          </li>
        ))}
      </ul>
      <div className="pt-4 text-start text-onbackground-700 md:pt-0 md:text-end">
        <span className="text-sm">© {new Date().getFullYear()} Fabian Rosenthal</span>
        <br />
        <span className="text-xs">
          {navLinks.map((l, index) => (
            <NextLink key={index} href={l.href} className="underline hover:no-underline">
              {l.label}
            </NextLink>
          ))}
        </span>
      </div>
    </footer>
  )
}
