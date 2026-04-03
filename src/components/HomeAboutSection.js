"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, Users, Sparkles } from "lucide-react";
import CountUp from "@/app/Animations/CountUp";

const SLIDES = [
  { label: "Annual Hackathon 2024", src: "/slide1.jpg" },
  { label: "Workshop Series", src: "/slide2.jpg" },
  { label: "Placement Drive", src: "/slide3.jpg" },
  { label: "Cultural Fest", src: "/slide5.jpeg" },
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
    <section className="w-full py-24 bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>

            {/* Tag */}
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
              <span className="w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
              About TSS
            </p>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] text-neutral-900 dark:text-neutral-50 mb-8">
              Where curiosity<br />meets{" "}
              <span className="inline-flex items-center gap-2">
                <em className="not-italic text-neutral-400 dark:text-neutral-500">
                  community
                </em>
                <Users className="h-5 w-5 text-neutral-400" />
              </span>
            </h2>

            {/* Description */}
            <div className="space-y-5 text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed">

              <p className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 mt-1 text-neutral-400" />
                Founded in 2007 at Guru Nanak Dev University, Amritsar, the Technical Students' Society is built around one idea - that the best learning happens beyond the classroom.
              </p>

              <p className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 mt-1 text-neutral-400" />
                From hackathons and workshops to placement drives and cultural fests, TSS operates at every intersection of student life.
              </p>

              <p className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 mt-1 text-neutral-400" />
                Eight specialized teams, one shared direction - carrying forward 19+ years of legacy.
              </p>

              <p className="font-medium text-neutral-700 dark:text-neutral-300">
                We don't just build events. We build the people who build things.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-900 dark:text-neutral-50 border-b border-neutral-300 dark:border-neutral-700 pb-1 mt-8 hover:border-neutral-900 dark:hover:border-neutral-50 transition"
            >
              Full story
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </Link>
          </div>

          {/* Right — visual */}
          <div className="flex flex-col gap-4">

            {/* Image Card */}
            <div
              className="group aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Slides */}
              {SLIDES.map((slide, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    opacity: i === current ? 1 : 0,
                    pointerEvents: i === current ? "auto" : "none",
                  }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={i === 0}
                  />
                </div>
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === current
                      ? "w-6 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/80"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Small stats cards (NEW 🔥) */}
            <div className="grid grid-cols-2 gap-3">

              <div className="p-4 rounded-xl border dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <p className="text-lg font-semibold text-neutral-900 dark:text-white">
                  <CountUp
                    from={0}
                    to={19}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    startCounting={false}
                  />+
                </p>
                <p className="text-xs text-neutral-500">Years Legacy</p>
              </div>

              <div className="p-4 rounded-xl border dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <p className="text-lg font-semibold text-neutral-900 dark:text-white">
                  <CountUp
                    from={0}
                    to={8}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    startCounting={false}
                  />
                </p>
                <p className="text-xs text-neutral-500">Teams</p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}