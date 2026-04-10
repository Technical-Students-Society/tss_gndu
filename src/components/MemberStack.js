"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import MemberCard from "@/components/MemberCard";

export default function MemberStack({ members }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const moveToNewer = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const moveToFormer = () => {
    if (currentIndex < members.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (members.length === 0) return null;

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <div className="relative group/stack isolate">
      
      {/* Visual Stack Layers (Bottom-most) */}
      <div className="absolute top-0 left-0 w-full h-full bg-neutral-400 dark:bg-neutral-800 rounded-2xl border border-neutral-400 dark:border-neutral-900 -z-10 translate-y-5 scale-95 shadow-md" />
      <div className="absolute top-0 left-0 w-full h-full bg-neutral-200 dark:bg-neutral-900/80 rounded-2xl border border-neutral-300 dark:border-neutral-950 -z-20 translate-y-10 scale-90 shadow-sm" />

      {/* Animation Container */}
      <div className="relative overflow-hidden rounded-2xl w-70 h-92.5">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            <MemberCard {...members[currentIndex]} />
          </motion.div>
        </AnimatePresence>

        {/* Former Badge */}
        <AnimatePresence>
          {currentIndex !== 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className="absolute top-2 right-2 bg-neutral-900 border border-neutral-700 dark:bg-neutral-50 text-white dark:text-black text-[10px] font-black px-2 py-1 rounded-lg shadow-lg uppercase tracking-widest z-10"
            >
              Former
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Overlays */}
      {members.length > 1 && (
        <>
          {/* Left Arrow: Go to Former (Higher Index) */}
          {currentIndex < members.length - 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center z-30">
              <button
                onClick={moveToFormer}
                className="p-1.5 bg-siteblack/40 backdrop-blur-md border border-white/20 rounded-full shadow-xl opacity-100 lg:opacity-0 group-hover/stack:opacity-100 lg:-translate-x-2 lg:group-hover/stack:translate-x-0 transition-all duration-300 text-white active:scale-95"
                aria-label="View former member"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          )}

          {/* Right Arrow: Move to Newer (Lower Index) */}
          {currentIndex > 0 && (
            <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center z-30">
              <button
                onClick={moveToNewer}
                className="p-1.5 bg-siteblack/40 backdrop-blur-md border border-white/20 rounded-full shadow-xl opacity-100 lg:opacity-0 group-hover/stack:opacity-100 lg:translate-x-2 lg:group-hover/stack:translate-x-0 transition-all duration-300 text-white active:scale-95"
                aria-label="View newer member"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
