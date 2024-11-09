import { Link } from "@/components/layout/link"

type Project = { name: string; href: string; tags: Array<string>; shortDescription: string }

function ProjectItem({ name, href, tags, shortDescription }: Project) {
  return (
    <>
      <div className="sm:flex sm:gap-2">
        <Link href={href} target="_blank">
          {name}
        </Link>
        <ul className="flex gap-1" aria-label="Tags">
          {tags.map((t, index) => (
            <li key={index}>
              <span aria-hidden={true}>#</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      {shortDescription}
    </>
  )
}

export function Projects({ projects }: { projects: Array<Project> }) {
  return (
    <>
      <h2 className="pb-2 pt-7 text-2xl font-semibold tracking-tight sm:text-3xl">Current Projects</h2>
      <ul className="ms-6 list-outside list-disc py-1 leading-7 text-gray-700">
        {projects.map((p, index) => (
          <li key={index} className="pt-2">
            <ProjectItem {...p} />
          </li>
        ))}
      </ul>
    </>
  )
}
