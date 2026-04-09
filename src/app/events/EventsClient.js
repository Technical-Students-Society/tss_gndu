"use client";

import { useState } from "react";
import EventModal from "@/components/EventModal";
import ShinyText from "../Animations/ShinyText";
import { ArrowRight, Calendars } from 'lucide-react';

export default function EventsClient({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.start_at) >= now);
  const pastEvents = events.filter((e) => new Date(e.start_at) < now);

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      : "Date TBA";

  const renderEventCard = (event) => {
    const isPast = new Date(event.start_at) < now;
    const category = isPast ? "Past Event" : "Upcoming";

    return (
      <div
        key={event.id}
        className="group flex flex-col border-b border-neutral-200 dark:border-neutral-800 pb-8 last:border-0 last:pb-0"
      >
        {/* Thumbnail and Category Badge */}
        <div className="relative w-full aspect-video mb-4 cursor-pointer" onClick={() => (isPast ? setSelectedEvent(event) : null)}>
          {/* Inner container with absolute inset-0 to force aspect-ratio, while allowing badge to overflow outside */}
          <div className="absolute inset-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            {event.thumbnail ? (
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs font-semibold uppercase tracking-widest group-hover:scale-105 transition-transform duration-500">
                No Preview
              </div>
            )}
          </div>

          {/* Category Badge (Only for Upcoming) */}
          {!isPast && (
            <div className="absolute top-0 right-0 z-20 translate-x-2 -translate-y-1/2">
              <span className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] backdrop-blur-xl rounded-xl border bg-purple-600 text-white border-purple-700 shadow-xl  ">
                {category}
              </span>
            </div>
          )}
        </div>

        {/* Meta */}
        <p suppressHydrationWarning className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">
          {formatDate(event.start_at)}
        </p>

        {/* Title */}
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50 leading-snug mb-1 line-clamp-2 cursor-pointer hover:underline" onClick={() => isPast && setSelectedEvent(event)}>
          {event.title}
        </h3>

        {/* Location */}
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 italic">
          {event.location || "Location TBA"}
        </p>

        {/* Description */}
        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3">
          {event.description}
        </p>

        {/* CTA */}
        {!isPast ? (
          event.reg_link ? (
            <a
              href={event.reg_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 dark:text-neutral-50 hover:opacity-80 transition-opacity"
            >
              Register Now <ArrowRight className="h-4 w-4"/>
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-400 cursor-not-allowed">
              Registration Closed
            </span>
          )
        ) : (
          <button
            onClick={() => setSelectedEvent(event)}
            className="inline-flex items-center self-start gap-1 text-sm font-semibold text-neutral-900 dark:text-neutral-50 hover:opacity-60 transition-opacity cursor-pointer"
          >
            View More <ArrowRight className="h-4 w-4"/>
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto px-6 py-20 max-w-7xl">
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-neutral-50 leading-[1.1]">
                What`s happening at the{" "}
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
                  <ArrowRight className="h-4 w-4"/>
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
          <section id="upcoming" className="mb-16">
            <h2 className=" font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8">
              Upcoming
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {upcomingEvents.map(renderEventCard)}
            </div>
          </section>
        )}

        {/* ── Past Events ── */}
        {pastEvents.length > 0 && (
          <section>
            <h2 className=" font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8">
              Past Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {pastEvents.map(renderEventCard)}
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
