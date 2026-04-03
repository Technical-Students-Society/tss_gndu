"use client";

import { useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MemberCard from "@/components/MemberCard";
import MemberStack from "@/components/MemberStack";

export default function TeamCategorySection({ title, members }) {
  const scrollRef = useRef(null);

  // Group members into individuals vs stacks
  const displayItems = useMemo(() => {
    const roleGroups = members.reduce((acc, member) => {
      const role = member.role.trim();
      if (!acc[role]) acc[role] = [];
      acc[role].push(member);
      return acc;
    }, {});

    const items = [];
    Object.entries(roleGroups).forEach(([role, roleMembers]) => {
      const isMemberRole = role.toLowerCase().includes("member");
      
      // If multiple people share a leadership/specialized role (not "Member"), stack them
      if (roleMembers.length > 1 && !isMemberRole) {
        items.push({ type: 'stack', role, members: roleMembers });
      } else {
        // Otherwise, render them as individuals
        roleMembers.forEach(m => items.push({ type: 'individual', data: m }));
      }
    });

    return items;
  }, [members]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-end border-b dark:border-neutral-800 pb-4">
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-neutral-50 border-l-4 border-neutral-900 dark:border-neutral-50 pl-4">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="p-2 border rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:border-neutral-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 border rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors dark:border-neutral-800"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-12 pt-4 no-scrollbar snap-x snap-mandatory px-2"
      >
        {displayItems.map((item, index) => (
          <div key={index} className="snap-start">
            {item.type === 'stack' ? (
              <MemberStack members={item.members} />
            ) : (
              <MemberCard {...item.data} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
