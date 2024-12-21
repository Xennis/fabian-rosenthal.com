import { Dot } from "@/components/dot"

export function Headline({ subtitle, children }: { subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {children}
        <Dot />
      </h1>
      {subtitle && <div className="pt-1.5 text-lg leading-8 tracking-tight text-onbackground-600">{subtitle}</div>}
    </div>
  )
}

export function Headline2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="pb-2 text-3xl font-semibold tracking-tight sm:text-4xl">
      {children}
      <Dot />
    </h2>
  )
}

export function HeadlineBlog({ subtitle, children }: { subtitle?: string; children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {children}
        <Dot />
      </h1>
      {subtitle && (
        <div className="pt-2.5 text-lg leading-8 tracking-tight text-onbackground-900 sm:text-xl">{subtitle}</div>
      )}
    </>
  )
}
