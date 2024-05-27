import { Dot } from "@/components/dot"

export function Headline({ subtitle, children }: { subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {children}
        <Dot />
      </h1>
      {subtitle && <div className="pt-1.5">{subtitle}</div>}
    </div>
  )
}
