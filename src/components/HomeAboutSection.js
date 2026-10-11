"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, Users, CirclePile } from "lucide-react";
import SplitText from "@/app/Animations/SplitText";

const SLIDES = [
  { label: "Annual Hackathon 2024", src: "/slide1.jpg" },
  { label: "Workshop Series", src: "/slide2.jpg" },
  { label: "Placement Drive", src: "/slide3.jpg" },
  { label: "Cultural Fest", src: "/slide6.jpeg" },
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
    <section className="relative w-full py-24 bg-blue-100 dark:bg-siteblack overflow-hidden">
      {/* Background snake pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 flex items-center justify-center"
      >

      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>

            {/* Tag */}
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-700 dark:text-neutral-400 mb-6">
              <CirclePile className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
              About TSS
            </p>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] text-neutral-900 dark:text-neutral-50 mb-6 font-openai">
              <SplitText
                text={<>
                  Where curiosity<br />meets{" "}
                  <span className="inline-flex items-center gap-2">
                    <em className="not-italic text-blue-600 dark:text-neutral-400">
                      community
                    </em>
                    {/* <Users className="h-5 w-5 text-neutral-600 dark:text-neutral-400" /> */}
                  </span>
                </>}
                delay={25}
                duration={1}
                ease="power3.out"
                splitType="chars"
                showCallback={false} />
            </h2>

            {/* Description */}
            <div className="space-y-3.5 text-[15px] sm:text-base text-neutral-800 dark:text-neutral-300 leading-relaxed max-w-lg">
              <p>
                The official student body of Computer Science at GNDU, bridging academic knowledge with industry-level innovation.
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                We empower students through flagship hackathons, technical workshops, and real-world collaborative building.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-white bg-blue-700 hover:bg-blue-700 active:bg-blue-800 rounded-full px-5 py-2.5 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span>Read More</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right — visual */}
          <div className="flex flex-col gap-4">

            {/* Image Card */}
            <div
              className="group aspect-4/3 m-6 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative"
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
                    loading="lazy"
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
                      }`} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
