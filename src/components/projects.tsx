type Project = { name: string; href: string; tags: Array<string>; shortDescription: string }

function ProjectItem({
  name,
  href,
  tags,
  shortDescription,
  tagsSrLabel,
}: Project & {
  tagsSrLabel: string
}) {
  return (
    <>
      <a href={href} target="_blank">
        {name}
      </a>{" "}
      <span className="sr-only" id={`${name}-tags`}>{`${tagsSrLabel}: `}</span>
      <span aria-labelledby={`${name}-tags`} role="list">
        {tags.map((t, index) => (
          <span role="listitem" className="ps-1" key={index}>
            <span aria-hidden={true}>#</span>
            {t}
          </span>
        ))}
      </span>
      <br />
      {shortDescription}
    </>
  )
}

export function Projects({
  projects,
  dictionary,
}: {
  projects: Array<Project>
  dictionary: { headline: string; tagsSrLabel: string }
}) {
  return (
    <>
      <h2 className="pb-2 pt-7 text-2xl font-semibold tracking-tight sm:text-3xl">{dictionary.headline}</h2>
      <ul>
        {projects.map((p, index) => (
          <li key={index}>
            <ProjectItem {...p} tagsSrLabel={dictionary.tagsSrLabel} />
          </li>
        ))}
      </ul>
    </>
  )
}
