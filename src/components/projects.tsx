import { Link } from "@/components/layout/link"
import { Headline2 } from "@/components/layout/headline"

const projects = [
  {
    name: "Cookli",
    href: "https://cookli.app",
    tags: ["Next.js", "PWA", "GCP"],
    shortDescription:
      "Create a personalized digital cookbook with your friends and partners! Collect, organize, and share your favorite recipes in one place.",
    status: "active",
  },
  {
    name: "Green Walking: Walk & Hike Map",
    href: "https://xennis.github.io/green-walking/",
    tags: ["AndroidApp", "Flutter"],
    shortDescription: "The map shows all kinds of trails for walking and hiking.",
    status: "active",
  },
  {
    name: "Restore Leveling After G28",
    href: "https://plugins.octoprint.org/plugins/restorelevelingafterg28/",
    tags: ["OctoPrintPlugin", "3DPrinting"],
    shortDescription: "Automatically keeps bed leveling on after G28 (Auto Home).",
    status: "active",
  },
  {
    name: "FabiTours",
    href: "https://tours.fabian-rosenthal.com",
    tags: ["Next.js", "PWA", "Mapbox"],
    shortDescription: "The interactive map shows the most beautiful places in Hamburg, Germany.",
    status: "active",
  },
  // {
  //   name: "IDP (Integrating Digital Papyrology) Data Sheet",
  //   href: "https://docs.google.com/spreadsheets/d/19b-uGsyhmQ7lpqvoEPA7eFzCNz8HowDbdq1PzqDaxuM/",
  //   tags: ["Python", "Epigraphy"],
  //   shortDescription: "Transform and join the IPD data into a single CSV sheet.",
  //   status: "active",
  // },
  {
    name: "EpiDoc Parser",
    href: "https://xennis.github.io/epidoc-parser/",
    tags: ["PythonLibrary", "Epigraphy"],
    shortDescription: "Python parser for EpiDoc (epigraphic documents in TEI XML).",
    status: "active",
  },
]

function ProjectItem({ project }: { project: (typeof projects)[number] }) {
  return (
    <>
      <div className="sm:flex sm:gap-2">
        {project.status === "active" ? (
          <Link href={project.href ?? "#"} target="_blank">
            {project.name}
          </Link>
        ) : (
          <span>
            <span className="font-semibold">{project.name}</span> ({project.status})
          </span>
        )}
        <ul className="flex gap-1" aria-label="Tags">
          {project.tags.map((t, index) => (
            <li key={index}>
              <span aria-hidden={true}>#</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      {project.shortDescription}
    </>
  )
}

export function Projects() {
  return (
    <div className="pt-10 md:pt-12">
      <Headline2>Current Projects</Headline2>
      <ul className="ms-6 list-outside list-disc py-1 leading-7">
        {projects.map((p, index) => (
          <li key={index} className="pt-2">
            <ProjectItem project={p} />
          </li>
        ))}
      </ul>
    </div>
  )
}
