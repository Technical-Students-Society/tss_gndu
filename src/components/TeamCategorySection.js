"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MemberCard from "@/components/MemberCard";

export default function TeamCategorySection({ title, members }) {
  const scrollRef = useRef(null);

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
        className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory"
      >
        {members.map((member, index) => (
          <div key={index} className="snap-start">
            <MemberCard {...member} />
          </div>
        ))}
      </div>
    </section>
  );
}
