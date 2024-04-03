import { redirect } from "next/navigation"

import { aboutPage } from "@/lib/links"

export default function ProjectsPage() {
  // Formerly the page /projects existed.
  redirect(aboutPage)
}
