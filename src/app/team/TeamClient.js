"use client";

import { useState, useEffect, useMemo } from "react";
import api from "@/utils/api";
import TeamCategorySection from "@/components/TeamCategorySection";

export default function TeamClient({ batch }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the preferred order of sections (kept consistent with original)
  const groupOrder = ["Executives", "Technical", "Sponsorship", "Design", "Cultural", "Sports"];

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true);
      try {
        const response = await api.get("/team_members", {
          params: {
            select: "*",
            batch: `eq.${batch}`,
            order: "created_at.desc",
          },
        });
        setMembers(response.data || []);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, [batch]);

  // Grouping and Sorting Logic (Kept consistent with original page.js)
  const { groupedTeam, sortedGroups } = useMemo(() => {
    if (!members.length) return { groupedTeam: {}, sortedGroups: [] };

    const grouped = members.reduce((acc, member) => {
      let rawGroup = (member.team_group || "Other").trim();

      const matchingKey = groupOrder.find(
        (g) => g.toLowerCase() === rawGroup.toLowerCase()
      ) || (rawGroup.charAt(0).toUpperCase() + rawGroup.slice(1).toLowerCase());

      if (!acc[matchingKey]) acc[matchingKey] = [];
      acc[matchingKey].push(member);
      return acc;
    }, {});

    const sorted = Object.keys(grouped).sort((a, b) => {
      const indexA = groupOrder.indexOf(a);
      const indexB = groupOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });

    return { groupedTeam: grouped, sortedGroups: sorted };
  }, [members]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-8 h-8 border-4 border-neutral-200 dark:border-neutral-800 border-t-neutral-900 dark:border-t-neutral-50 rounded-full animate-spin"></div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">Loading Community...</p>
      </div>
    );
  }

  return (
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
          <p className="text-sm font-semibold uppercase tracking-widest">No members found for batch {batch}</p>
          <p className="text-xs mt-1">Try selecting a different academic year.</p>
        </div>
      )}
    </div>
  );
}
