"use client";

import Link from "next/link";
import {
  Calendar,
  Image as ImageIcon
} from "lucide-react";

import HeroSection from "@/components/HeroSection";
import HomeEventsSection from "@/components/HomeEventsSection";
import HomeFaqSection from "@/components/HomeFaqSection";
import HomeTeamSection from "@/components/HomeTeamSection";
import HomeAboutSection from "@/components/HomeAboutSection";
import CountUp from "./Animations/CountUp";
import ScrollToTop from "./ScrollToTop";
import Preloader from "@/components/Preloader";

export default function Home() {

  const upcomingEvents = [
    { title: "Tech-Fest 2025", date: "April 20, 2025", badge: "Flagship" },
    { title: "UI/UX Workshop", date: "May 15, 2025", badge: "Workshop" },
  ];

  return (
    <>
    <div className="flex flex-col font-openai items-center">
      <ScrollToTop />
      <HeroSection />

      {/* Stats Section */}
      <div className="w-full py-26 dark:bg-siteblack bg-linear-to-t from-zinc-50 to-white dark:from-siteblack dark:to-siteblack ">
        <div className=" mx-auto lg:mx-28 px-6 max-sm:px-3">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">

            {/* Hero card */}
            <div className="col-span-2 sm:col-span-1 bg-neutral-900 dark:bg-neutral-50 rounded-2xl p-7 flex items-end min-h-40">
              <p className="text-[20px] font-semibold text-white dark:text-neutral-900 leading-snug">
                Shaping student life at GNDU since day one
              </p>
            </div>

            {/* Stat cards */}
            {[
              { value: "450+", label: "Student members including alumni" },
              { value: "50+", label: "Events hosted every year" },
              { value: "175+", label: "Placements facilitated" },
              { value: "12", label: "Team divisions" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-6 max-sm:p-3 flex flex-col justify-between min-h-40"
              >
                <span className="text-sm text-neutral-400">{label}</span>
                <span className="text-4xl max-sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight leading-none">
                  <CountUp card background
                    from={0}
                    to={value}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    startCounting={false}
                  />+
                </span>
              </div>
            ))}

          </div>
        </div>
      </div>

      <HomeAboutSection />

      <HomeTeamSection />

      {/* Events Section */}
      <section className="w-full py-20 dark:bg-siteblack">
        <div className="container mx-auto px-4 md:px-12 lg:px-20 xl:px-32">
          <div className="flex flex-col md:flex-row justify-between items-start mb-18 gap-4">
            <div className="space-y-4 text-left">
              <h2 className="text-3xl font-extrabold tracking-wide sm:text-4xl">Events Spotlight</h2>
              <p className="text-neutral-500 dark:text-neutral-400 ">
                Stay tuned with our upcoming highlights and ongoing competitions.
              </p>
            </div>
            <Link href="/events" className="pt-2 inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:underline underline-offset-4">
              All Events <Calendar className="h-4 w-4" />
            </Link>
          </div>
          <HomeEventsSection />
        </div>
        {/* <hr className="top-20 relative mx-15 max-sm:mx-5 dark:border-neutral-800" /> */}
      </section>

      <HomeFaqSection />


      {/* Gallery Sneak Peak Section */}
      {/* <section className="w-full py-20 bg-white dark:bg-siteblack">
        <div className="container mx-auto px-4 md:px-12 lg:px-20 xl:px-32">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-extrabold tracking-wide sm:text-4xl text-center">Gallery Sneak Peak</h2>
            <p className="text-neutral-500 dark:text-neutral-400 mx-auto max-w-2xl">
              Capturing moments of innovation and community from our recent gatherings.
            </p>
          </div>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4 mb-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 group border dark:border-neutral-800">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-300 dark:text-neutral-700">
                  <ImageIcon className="h-8 w-8" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/gallery" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:underline underline-offset-4">
              Explore Full Gallery <ArrowRight className="h-4 w-4 -rotate-45" />
            </Link>
          </div>
        </div>
      </section> */}
    </div>
    </>
  );
}
