type Project = { name: string; href: string; tags: Array<string>; shortDescription: string }

function ProjectItem({
  name,
  href,
  tags,
  shortDescription,
  tagsSrLabel,
  id,
}: Project & {
  tagsSrLabel: string
  id: string
}) {
  const ariaTagsId = `project-tags-${id}`
  return (
    <>
      <a href={href} target="_blank">
        {name}
      </a>{" "}
      <span className="sr-only" id={ariaTagsId}>{`${tagsSrLabel}: `}</span>
      <span aria-labelledby={ariaTagsId} role="list">
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
      <ul className="ms-6 list-outside list-disc py-1 leading-7 text-gray-700">
        {projects.map((p, index) => (
          <li key={index} className="pt-2">
            <ProjectItem {...p} tagsSrLabel={dictionary.tagsSrLabel} id={index.toString()} />
          </li>
        ))}
      </ul>
    </>
  )
}
