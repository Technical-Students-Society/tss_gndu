import { Users } from "lucide-react";
import TeamClient from "./TeamClient";
import BatchSelector from "@/components/BatchSelector";
import ShinyText from "../Animations/ShinyText";
import SplitText from "../Animations/SplitText";


// Data fetching is now handled on the client-side in TeamClient.js


export const metadata = {
  title: "Team | Core Members & Leaders",
  description: "Get to know the passionate team behind TSS GNDU. Explore our core members, technical teams, and student leaders working to build impactful tech events, workshops, and innovations at Guru Nanak Dev University."
}

export default async function TeamPage({ searchParams }) {
  // Await searchParams as per Next.js 15+ requirements
  const params = await searchParams;
  const currentBatch = params.batch || "2025-2026";


  return (
    <div className="py-20 mx-auto font-openai px-4 md:px-12 lg:px-18 xl:px-30 max-sm:pb-3 dark:bg-siteblack">
      <div className="space-y-12 md:space-y-20">

        {/* Page Header */}
        <div className="relative pb-10 ">

          {/* Top Tag */}
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
            <Users />
            <ShinyText
              text="The Community"
              speed={2.8}
              color="#b5b5b5"
              shineColor="#ffffff"
            />

          </p>

          {/* Heading + Selector */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.1]">
                <SplitText
                  text="Meet the Team"
                  delay={45}
                  duration={1.25}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  showCallback={false}
                />
              </h1>

              <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
                The specialized minds behind TSS GNDU — building, designing, and shaping
                a stronger student community through innovation.
              </p>
            </div>

            {/* Selector */}
            <div>
              <BatchSelector />
            </div>

          </div>

          {/* Subtle Glow */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-75 h-37.5 bg-neutral-300/20 dark:bg-neutral-700/20 blur-3xl pointer-events-none" />
        </div>


        {/* Categories (Handled by Client Component) */}
        <TeamClient batch={currentBatch} />

      </div>
    </div>
  );
}
