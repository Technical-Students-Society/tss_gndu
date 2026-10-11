import EventsClient from "./EventsClient";
import { Calendar, ArrowUpRight, Rocket } from "lucide-react";

export const metadata = {
  title: "Events | TSS GNDU",
  description: "Workshops, hackathons, and competitions at Guru Nanak Dev University — stay updated with TSS GNDU events.",
};

export const revalidate = 0;

export default function EventsPage() {
  return (
    <div className="dark:bg-siteblack min-h-screen font-openai px-4 sm:px-8 md:px-12 lg:px-20">
      {/* Header */}
      <div className="pt-16 md:pt-24 pb-4  border-neutral-200/80 dark:border-neutral-800/80">

        {/* Pill tag */}
        <div className="flex items-center gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium uppercase tracking-widest bg-neutral-100 dark:bg-neutral-800/90 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60">
            <Calendar className="w-3.5 h-3.5" />
            Events Schedule
          </span>
        </div>

        {/* Heading + right col */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.08]">
              <span className="inline-flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <span>Build,</span>
                <span>learn </span>
                <span className="inline-flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20">
                  <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </span>
              </span>
              <br />
              <span className="text-neutral-400 dark:text-neutral-500">compete.</span>
            </h1>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-5">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed lg:text-right max-w-xs">
              Hackathons, workshops, and tech events - all in one place for our students.
            </p>
            <a
              href="https://forms.gle/YJGASGBnU6J2UZ1Z9"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 rounded-full px-5 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
            >
              Suggest an event
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Events grid */}
      <div className="py-14 md:py-20">
        <EventsClient />
      </div>
    </div>
  );
}
