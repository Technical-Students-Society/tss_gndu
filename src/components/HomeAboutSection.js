"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";

const SLIDES = [
  { label: "Annual Hackathon 2024", src: "/slide1.jpg" },
  { label: "Workshop Series", src: "/slide2.jpg" },
  { label: "Placement Drive", src: "/slide3.jpg" },
  { label: "Cultural Fest", src: "/slide4.png" },
];

export default function HomeAboutSection() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [next, isHovered]);

  return (
    <section className="w-full py-20 bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — text */}
          <div>
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-5">
              <span className="w-6 h-px bg-neutral-300 dark:bg-neutral-700 inline-block" />
              About TSS
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] text-neutral-900 dark:text-neutral-50 mb-8">
              Where curiosity<br />meets{" "}
              <em className="not-italic text-neutral-400 dark:text-neutral-500">community</em>
            </h2>
            <div className="space-y-4 text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              <p>
                Founded in 2009 at Guru Nanak Dev University, Amritsar, the Technical Student Society is a student-run organization built around one idea — that the best learning happens beyond the classroom.
              </p>
              <p>
                From hackathons and workshops to placement drives and cultural fests, TSS operates at every intersection of student life. Eight specialized teams, one shared direction — carrying forward 15+ years of student legacy.
              </p>
              <p>
                We don't just build events. We build the people who build things.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-neutral-900 dark:text-neutral-50 border-b border-neutral-300 dark:border-neutral-700 pb-0.5 mt-6 hover:border-neutral-900 dark:hover:border-neutral-50 transition-colors"
            >
              Full story
            </Link>
          </div>

          {/* Right — visual blocks */}
          <div className="flex flex-col gap-3">

            {/* Auto Slider */}
            <div
              className="aspect-4/3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Slides */}
              {SLIDES.map((slide, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.label}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}

              {/* Dot / dash indicators */}
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1 rounded-full transition-all duration-300 ${i === current
                      ? "w-5 bg-neutral-700 dark:bg-neutral-200"
                      : "w-2 bg-neutral-400 dark:bg-neutral-600 hover:bg-neutral-500 dark:hover:bg-neutral-400"
                      }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}