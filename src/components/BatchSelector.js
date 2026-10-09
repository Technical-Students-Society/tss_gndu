"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Calendar, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BatchSelector({ availableBatches = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Default to the first available batch if not specified in URL
  const currentBatch =
    searchParams.get("batch") ||
    (availableBatches.length > 0 ? availableBatches[0] : "2025-2026");

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectBatch = (batch) => {
    const params = new URLSearchParams(searchParams);
    if (batch) {
      params.set("batch", batch);
    } else {
      params.delete("batch");
    }
    router.push(`/team?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Custom Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2.5 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-full px-4 py-2 text-xs transition-all duration-200 shadow-sm cursor-pointer select-none group focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Calendar className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors shrink-0" />
        <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
          Batch
        </span>
        <span className="font-semibold text-neutral-900 dark:text-neutral-50 tracking-wide">
          {currentBatch}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-neutral-800 dark:text-neutral-200" : ""
          }`}
        />
      </button>

      {/* Custom Floating Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 z-50 min-w-[190px] p-1.5 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-black/10 dark:shadow-black/50"
            role="listbox"
          >
            {/* Popover Header */}
            <div className="px-3 py-1.5 mb-1 border-b border-neutral-100 dark:border-neutral-800/80">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-semibold block">
                Academic Year
              </span>
            </div>

            {/* Batches Options */}
            <div className="space-y-0.5">
              {availableBatches.map((batch) => {
                const isSelected = batch === currentBatch;
                return (
                  <button
                    key={batch}
                    type="button"
                    onClick={() => handleSelectBatch(batch)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                      isSelected
                        ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 font-semibold"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span>{batch}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-50" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
