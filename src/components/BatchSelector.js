"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ListFilter } from "lucide-react";

const batches = [
  "2025-2026",
  "2024-2025",
];

export default function BatchSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentBatch = searchParams.get("batch") || "2025-2026";

  const handleBatchChange = (e) => {
    const selectedBatch = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (selectedBatch) {
      params.set("batch", selectedBatch);
    } else {
      params.delete("batch");
    }
    router.push(`/team?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="inline-flex items-center bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-6 py-2 rounded-full shadow-sm transition-all hover:border-neutral-300 dark:hover:border-neutral-600">
      <select
        value={currentBatch}
        onChange={handleBatchChange}
        className="bg-transparent text-xs max-sm:text-[10px] font-black uppercase tracking-widest text-neutral-900 dark:text-neutral-50 focus:outline-none cursor-pointer pr-1"
      >
        {batches.map((batch) => (
          <option key={batch} value={batch} className="bg-white dark:bg-neutral-900">
            {batch}
          </option>
        ))}
      </select>
    </div>
  );
}
