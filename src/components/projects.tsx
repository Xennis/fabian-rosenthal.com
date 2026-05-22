import { Link } from "@/components/layout/link"
import { Headline2 } from "@/components/layout/headline"

type ProjectLink = { label?: string; href: string }

type Project = {
  name: string
  links: Array<ProjectLink>
  tags: Array<string>
  shortDescription: string
  status: string
}

const projects: Array<Project> = [
  {
    name: "Fitminder",
    links: [{ label: "Android", href: "https://play.google.com/store/apps/details?id=org.xennis.apps.fitminder" }],
    tags: ["Android", "Flutter", "Firebase", "HealthConnect", "GCP"],
    shortDescription:
      "Verwandle dein Training in Motivation! Setze dir Ziele, lass deine Aktivitäten automatisch über Health Connect synchronisieren und freue dich über eine selbstgewählte Belohnung, wenn du sie erreichst.",
    status: "active",
  },
  {
    name: "Cookli",
    links: [{ href: "https://cookli.app" }],
    tags: ["Next.js", "PWA", "GCP"],
    shortDescription:
      "Erstelle gemeinsam mit Freunden und Partnern ein personalisiertes digitales Kochbuch! Sammle, organisiere und teile deine Lieblingsrezepte an einem Ort.",
    status: "active",
  },
  {
    name: "Green Walking: Walk & Hike Map",
    links: [
      { label: "Android", href: "https://play.google.com/store/apps/details?id=org.xennis.apps.green_walking" },
      { label: "iOS", href: "https://apps.apple.com/de/app/green-walking/id6759345196" },
    ],
    tags: ["Android", "iOS", "Flutter"],
    shortDescription: "Die Karte zeigt verschiedenste Wege zum Spazieren und Wandern.",
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
    links: [{ href: "https://xennis.github.io/epidoc-parser/" }],
    tags: ["PythonLibrary", "Epigraphy"],
    shortDescription: "Python-Parser für EpiDoc (epigraphische Dokumente in TEI XML).",
    status: "active",
  },
]

function ProjectItem({ project }: { project: Project }) {
  return (
    <>
      <div className="sm:flex sm:gap-2">
        {project.status === "active" ? (
          project.links.length === 1 ? (
            <Link href={project.links[0].href} target="_blank">
              {project.name}
            </Link>
          ) : (
            <span>
              <span className="font-semibold">{project.name}</span> (
              {project.links.map((l, i) => (
                <span key={i}>
                  {i > 0 && ", "}
                  <Link href={l.href} target="_blank">
                    {l.label ?? "Link"}
                  </Link>
                </span>
              ))}
              )
            </span>
          )
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
      <Headline2>Aktuelle Projekte</Headline2>
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
