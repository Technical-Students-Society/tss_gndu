"use client";

import { useState } from "react";
import EventModal from "@/components/EventModal";
import ShinyText from "../Animations/ShinyText";
import { ArrowRight, Calendars } from 'lucide-react';
import EventCard from "@/components/EventCard";

export default function EventsClient({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const now = new Date();
  const upcomingEvents = events
    .filter((e) => new Date(e.start_at) >= now)
    .sort((a, b) => new Date(a.start_at) - new Date(b.start_at));

  const pastEvents = events
    .filter((e) => new Date(e.start_at) < now)
    .sort((a, b) => new Date(b.start_at) - new Date(a.start_at));

  return (
    <>
      <div className=" py-20 font-openai mx-auto px-4 md:px-12 lg:px-18 xl:px-30 max-sm:pb-3">
        {/* ── Page Header (two-column like reference) ── */}
        <div className="relative border-b border-neutral-200 dark:border-neutral-800 pb-12 mb-14">

          {/* Top Tag */}
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
            <Calendars />
            <ShinyText
              text="Events"
              speed={2.8}
              color="#b5b5b5"
              shineColor="#ffffff"
            />
          </p>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            {/* Left */}
            <div className="space-y-5 max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 dark:text-neutral-50 leading-[1.1]">
                What's happening at the{" "}
                <span className="text-neutral-400">frontier</span>
              </h1>

              <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Workshops, hackathons, and competitions — stay updated with our
                latest technical events and community gatherings.
              </p>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col items-start lg:items-end gap-4">

              <a
                href="https://forms.gle/YJGASGBnU6J2UZ1Z9"
                target="_blank"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-50 border border-neutral-300 dark:border-neutral-700 rounded-full px-5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                Suggest Event
                <span className="transform transition duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>

              {/* Optional small info */}
              <p className="text-xs text-neutral-400">
                Updated regularly • Don’t miss out
              </p>

            </div>
          </div>

          {/* Subtle Glow (premium touch) */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-neutral-300/20 dark:bg-neutral-700/20 blur-3xl pointer-events-none" />

        </div>

        {/* ── Upcoming Events ── */}
        {upcomingEvents.length > 0 && (
          <section className="mb-24">
            <h2 className="font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8 flex items-center gap-3">
              Upcoming Events
              {/* <span className="h-px flex-1 bg-neutral-200 dark:border-neutral-800" /> */}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onSelect={setSelectedEvent}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Past Events ── */}
        {pastEvents.length > 0 && (
          <section className="mb-16">
            <h2 className="font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8 flex items-center gap-3">
              Past Events
              {/* <span className="h-px flex-1 bg-neutral-200 dark:border-neutral-800" /> */}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {pastEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onSelect={setSelectedEvent}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Empty State ── */}
        {events.length === 0 && (
          <div className="text-center py-24 text-neutral-400 dark:text-neutral-600 text-sm">
            No events found.
          </div>
        )}
      </div>

      {/* ── Event Detail Modal ── */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}
