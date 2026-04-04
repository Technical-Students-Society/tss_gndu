"use client";

import { useState } from "react";
import EventModal from "@/components/EventModal";

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
        {/* Thumbnail */}
        <div className="w-full aspect-video overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 mb-4 cursor-pointer" onClick={() => isPast && setSelectedEvent(event)}>
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

        {/* Meta */}
        <p suppressHydrationWarning className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">
          {category}&nbsp;&nbsp;•&nbsp;&nbsp;{formatDate(event.start_at)}
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
              className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 dark:text-neutral-50 hover:opacity-60 transition-opacity"
            >
              Register Now <span aria-hidden>→</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-400 cursor-not-allowed">
              Registration Closed
            </span>
          )
        ) : (
          <button
            onClick={() => setSelectedEvent(event)}
            className="inline-flex items-center self-start gap-1 text-sm font-semibold text-neutral-900 dark:text-neutral-50 hover:opacity-60 transition-opacity"
          >
            View More <span aria-hidden>→</span>
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* ── Page Header (two-column like reference) ── */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-10 mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
            Events
          </p>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 max-w-sm leading-tight">
              What's happening at the frontier
            </h1>
            <div className="sm:max-w-xs space-y-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Workshops, hackathons, and competitions — stay updated with our
                latest technical events and community gatherings.
              </p>
              <a
                href="#upcoming"
                className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-900 dark:text-neutral-50 border border-neutral-300 dark:border-neutral-700 rounded-full px-4 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Explore Events
              </a>
            </div>
          </div>
        </div>

        {/* ── Upcoming Events ── */}
        {upcomingEvents.length > 0 && (
          <section id="upcoming" className="mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8">
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
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8">
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
