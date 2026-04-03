import TeamCategorySection from "@/components/TeamCategorySection";
import BatchSelector from "@/components/BatchSelector";
import api from "@/utils/api";

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
    <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-20">
      <div className="space-y-10 md:space-y-20 ">
        {/* Page Header */}
        <div className="space-y-6 pb-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
              The Community
            </p>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl uppercase text-neutral-900 dark:text-neutral-50 mb-0 inline-flex items-start gap-2 relative">
              Meet the Team
              <span className="-translate-y-12 self-start">
                <BatchSelector />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 dark:text-neutral-500  max-w-2xl leading-relaxed">
              The specialized minds behind TSS GNDU, dedicated to empowering our student community through technology, design, and culture.
            </p>
          </div>
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
