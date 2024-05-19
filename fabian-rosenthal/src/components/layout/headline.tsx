import { Dot } from "@/components/dot"

export function Headline({ subtitle, children }: { subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 text-center">
      <h1 className="leading-tight">
        {children}
        <Dot />
      </h1>
      {subtitle && <div>{subtitle}</div>}
    </div>
  )
}
