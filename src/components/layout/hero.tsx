export const Hero = ({ headline, children }: { headline: string; children: React.ReactNode }) => {
  return (
    <div className="rounded-xl bg-gradient-to-tl from-blue-700 via-blue-500 to-blue-700 py-28">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl tracking-tight text-white sm:text-4xl">{headline}</h2>
        {children}
      </div>
    </div>
  )
}
