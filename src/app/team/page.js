import TeamCategorySection from "@/components/TeamCategorySection";
import BatchSelector from "@/components/BatchSelector";
import api from "@/utils/api";
import ShinyText from "../Animations/ShinyText";
import { Users } from "lucide-react";

async function getTeamMembers(batch) {
  try {
    const response = await api.get("/team_members", {
      params: {
        select: "*",
        batch: `eq.${batch}`,
        order: "created_at.desc",
      },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export const metadata = {
  title: "Team | Core Members & Leaders",
  description: "Get to know the passionate team behind TSS GNDU. Explore our core members, technical teams, and student leaders working to build impactful tech events, workshops, and innovations at Guru Nanak Dev University."
}

export default async function TeamPage({ searchParams }) {
  // Await searchParams as per Next.js 15+ requirements
  const params = await searchParams;
  const currentBatch = params.batch || "2025-2026";

  const members = await getTeamMembers(currentBatch);

  // Define the preferred order of sections
  const groupOrder = ["Executives", "Technical", "Sponsorship", "Design", "Cultural", "Sports"];

  // Group members by team_group (Case-Insensitive)
  const groupedTeam = members.reduce((acc, member) => {
    let rawGroup = (member.team_group || "Other").trim();

    // Find matching group in the preferred groupOrder (case-insensitive)
    const matchingKey = groupOrder.find(
      (g) => g.toLowerCase() === rawGroup.toLowerCase()
    ) || (rawGroup.charAt(0).toUpperCase() + rawGroup.slice(1).toLowerCase());

    if (!acc[matchingKey]) acc[matchingKey] = [];
    acc[matchingKey].push(member);
    return acc;
  }, {});

  // Sort groups based on the preferred order
  const sortedGroups = Object.keys(groupedTeam).sort((a, b) => {
    const indexA = groupOrder.indexOf(a);
    const indexB = groupOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl">
      <div className="space-y-12 md:space-y-20">

        {/* Page Header */}
        <div className="relative pb-10 border-b border-neutral-200 dark:border-neutral-800">

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
                Meet the Team
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


        {/* Categories */}
        <div className="space-y-15">
          {sortedGroups.length > 0 ? (
            sortedGroups.map((group) => (
              <TeamCategorySection
                key={group}
                title={group}
                members={groupedTeam[group]}
              />
            ))
          ) : (
            <div className="text-center py-20 text-neutral-400 dark:text-neutral-600 border rounded-2xl border-dashed dark:border-neutral-800/50">
              <p className="text-sm font-semibold uppercase tracking-widest">No members found for batch {currentBatch}</p>
              <p className="text-xs mt-1">Try selecting a different academic year.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
