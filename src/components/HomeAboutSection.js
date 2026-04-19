"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, Users, Sparkles, CirclePile } from "lucide-react";
import ShinyText from "@/app/Animations/ShinyText";
import SplitText from "@/app/Animations/SplitText";

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
    <section className="w-full py-24 dark:bg-siteblack">
      <div className="container mx-auto px-4 lg:px-28 xl:px-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>

            {/* Tag */}
            <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
              <CirclePile />
              <ShinyText
                text="About TSS"
                speed={2.8}
                color="#b5b5b5"
                shineColor="#ffffff"
              />
            </p>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] text-neutral-900 dark:text-neutral-50 mb-8 font-openai">
              <SplitText
                text={<>
                  Where curiosity<br />meets{" "}
                  <span className="inline-flex items-center gap-2">
                    <em className="not-italic text-neutral-400 dark:text-neutral-500">
                      community
                    </em>
                    <Users className="h-5 w-5 text-neutral-400" />
                  </span>
                </>}
                delay={25}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                showCallback={false}
                textAlign="start"
              />
            </h2>

            {/* Description */}
            <div className="space-y-5 text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed">

              <p className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 mt-1 text-neutral-400 shrink-0" />
                Rooted in the MCA Department of Computer Science at Guru Nanak Dev University, TSS is the official student body dedicated to bridging academic curiosities with industry-leading innovation.
              </p>

              <p className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 mt-1 text-neutral-400 shrink-0" />
                As primary organizers of our extra-curricular landscape, we lead hackathons, workshops, and technical fests, ensuring our teams contribute specialized expertise to every major event in the department.
              </p>

              <p className="flex items-start gap-3">
                <Sparkles className="h-4 w-4 mt-1 text-neutral-400 shrink-0" />
                Though our legacy spans decades, our registration in 2026 marked a new era of official recognition and scaled impact across the university.
              </p>

              <p className="font-medium text-neutral-700 dark:text-neutral-300">
                Diverse teams, one shared horizon — exploring the frontiers of what's possible.
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
              className="group aspect-4/3 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative"
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
                  <img
                    src={slide.src}
                    alt={slide.label}
                    fill="true"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority="true"
                  />
                </div>
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-siteblack/30 to-transparent" />

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

          </div>
        </div>
      </div>
    </section>
  );
}
