"use client";

import Link from "next/link";
import {
  Code2,
  Handshake,
  Users,
  Palette,
  Calendar,
  ArrowRight,
  Image as ImageIcon
} from "lucide-react";

import HeroSection from "@/components/HeroSection";
import HomeTeamSection from "@/components/HomeTeamSection";
import HomeAboutSection from "@/components/HomeAboutSection";
import CountUp from "./Animations/CountUp";



export default function Home() {


  const upcomingEvents = [
    { title: "Tech-Fest 2025", date: "April 20, 2025", badge: "Flagship" },
    { title: "UI/UX Workshop", date: "May 15, 2025", badge: "Workshop" },
  ];

  return (
    <div className="flex flex-col items-center">
      <HeroSection />

      {/* Stats Section */}
      <div className="w-full py-26 bg-white dark:bg-neutral-950">
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
              { value: "8", label: "Team divisions" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-6 max-sm:p-3 flex flex-col justify-between min-h-40">
                <span className="text-sm text-neutral-400">{label}</span>
                <span className="text-4xl max-sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-tight leading-none">
                  <CountUp
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
      <section className="w-full py-20 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">Events Spotlight</h2>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-xl">
                Stay tuned with our upcoming highlights and ongoing competitions.
              </p>
            </div>
            <Link href="/events" className="pb-2 inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:underline underline-offset-4">
              All Events <Calendar className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="p-8 border rounded-xl bg-white dark:bg-black dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex px-2 text-[10px] font-bold uppercase tracking-widest border border-neutral-200 dark:border-neutral-700 rounded text-neutral-400 mb-2">
                    {event.badge}
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight">{event.title}</h3>
                  <p className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">{event.date}</p>
                </div>
                <button className="px-6 py-2 bg-neutral-900 dark:bg-neutral-50 text-white dark:text-black rounded-md text-xs font-bold uppercase tracking-widest hover:opacity-90">
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl text-center">Common Questions</h2>
            <p className="text-neutral-500 dark:text-neutral-400 mx-auto max-w-2xl">
              Everything you need to know about getting involved with TSS GNDU.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            <div className="space-y-2 p-6 border rounded-xl dark:border-neutral-800">
              <h3 className="text-lg font-bold uppercase tracking-tight">Who can join TSS?</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Any student currently enrolled in Guru Nanak Dev University with a passion for technology, design, or management is welcome to join our community.
              </p>
            </div>
            <div className="space-y-2 p-6 border rounded-xl dark:border-neutral-800">
              <h3 className="text-lg font-bold uppercase tracking-tight">Are there any membership fees?</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                No, membership to the Technical Student Society is completely free. We focus on talent, dedication, and the collective growth of our members.
              </p>
            </div>
            <div className="space-y-2 p-6 border rounded-xl dark:border-neutral-800">
              <h3 className="text-lg font-bold uppercase tracking-tight">What kind of events do you host?</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                We organize a variety of events including hands-on technical workshops, annual hackathons, coding competitions, and industrial guest lectures.
              </p>
            </div>
            <div className="space-y-2 p-6 border rounded-xl dark:border-neutral-800">
              <h3 className="text-lg font-bold uppercase tracking-tight">How can I stay updated?</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                You can keep an eye on our "Events" page or follow our official social media handles for the latest announcements and registration links.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Sneak Peak Section */}
      <section className="w-full py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl text-center">Gallery Sneak Peak</h2>
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
              Explore Full Gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
