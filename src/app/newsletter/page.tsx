import { Dot } from "@/components/dot"
import type { Metadata } from "next"
import {redirect} from "next/navigation";
import {aboutPage} from "@/lib/links";

export const metadata: Metadata = {
  title: "Newsletter",
}

// function SubstackIframe() {
//   return (
//     <iframe
//       src="https://fabianrosenthal.substack.com/embed"
//       className="h-[500px] w-full border-0 bg-none"
//       scrolling="no"
//     />
//   )
// }

export default function NewsletterPage() {
  redirect(aboutPage)
  // return (
  //   <>
  //     <div className="mb-6 text-center">
  //       <h1 className="text-center leading-tight">
  //         Subscribe to My Newsletter
  //         <Dot />
  //       </h1>
  //       <div>Read about my insights and learning journey</div>
  //     </div>
  //     <SubstackIframe />
  //   </>
  // )
}
