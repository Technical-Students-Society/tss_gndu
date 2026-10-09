import { Users, Sparkles } from "lucide-react";
import TeamClient from "./TeamClient";
import BatchSelector from "@/components/BatchSelector";
import api from "@/utils/api";

export const metadata = {
  title: "Team | Core Members & Leaders",
  description:
    "Get to know the passionate team behind TSS GNDU. Explore our core members, technical teams, and student leaders working to build impactful tech events, workshops, and innovations at Guru Nanak Dev University.",
};

export default async function TeamPage({ searchParams }) {
  // Await searchParams as per Next.js 15+ requirements
  const params = await searchParams;

  // Fetch all unique batch years from the database
  let availableBatches = [];
  try {
    const response = await api.get("/team_members", {
      params: {
        select: "start_year,end_year",
      },
    });

    const data = response.data || [];
    // Extract unique YYYY-YYYY strings and filter out any null/undefined
    availableBatches = [
      ...new Set(
        data
          .filter((m) => m.start_year && m.end_year)
          .map((m) => `${m.start_year}-${m.end_year}`)
      ),
    ].sort((a, b) => b.localeCompare(a)); // Newest first
  } catch (error) {
    console.error("Error fetching dynamic batches:", error);
    availableBatches = ["2025-2026", "2024-2025"]; // Fallback
  }

  const currentBatch =
    params.batch || (availableBatches.length > 0 ? availableBatches[0] : "2025-2026");

  return (
    <div className="py-16 md:py-24 font-openai px-4 sm:px-8 md:px-12 lg:px-20 dark:bg-siteblack min-h-screen">
      <div className="mx-auto space-y-16 md:space-y-24">
        {/* Page Header (OpenAI Minimalist & Reference-Inspired) */}
        <div className="relative  border-neutral-200/80 dark:border-neutral-800/80 pb-5">
          {/* Subtle Glow */}
          {/* <div className="absolute -top-12 left-1/4 w-96 h-48 bg-neutral-200/40 dark:bg-neutral-800/30 blur-3xl pointer-events-none rounded-full" /> */}

          {/* Top Pill */}
          <div className="flex items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium uppercase tracking-widest bg-neutral-100 dark:bg-neutral-800/90 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60">
              <Users className="w-3.5 h-3.5" />
              Community Groups
            </span>
          </div>

          {/* Heading + Right Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7 space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.08]">
                Explore Our <br />
                <span className="inline-flex items-center gap-2.5 sm:gap-3 flex-wrap">
                  <span>In house</span>
                  <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-white shadow-md shadow-purple-500/20 text-xs sm:text-sm">
                    ✦
                  </span>
                  <span>Talent</span>
                </span>
              </h1>
            </div>

            <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between gap-6">
              <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed lg:text-right max-w-sm">
                The specialized minds and leaders shaping the technical ecosystem, hackathons, and
                creative community at Guru Nanak Dev University.
              </p>

              <div>
                <BatchSelector availableBatches={availableBatches} />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Bento Categories & Member Directory */}
        <TeamClient batch={currentBatch} />
      </div>
    </div>
  );
}

