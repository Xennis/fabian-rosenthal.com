import NextLink from "next/link"

export const Link = (props: React.ComponentPropsWithoutRef<typeof NextLink>) => {
  return (
    <NextLink
      className="font-semibold underline decoration-[#18b83d] decoration-2 underline-offset-2 hover:no-underline"
      {...props}
    >
      {props.children}
    </NextLink>
  )
}
