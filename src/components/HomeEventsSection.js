"use client";

import { useState, useEffect } from "react";
import EventModal from "@/components/EventModal";
import api from "@/utils/api";

export default function HomeEventsSection() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    api
      .get("/events", { params: { select: "*", order: "start_at.desc", limit: 3 } })
      .then((res) => setEvents(res.data || []))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const now = new Date();

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Date TBA";

  if (events.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => {
          const isPast = new Date(event.start_at) < now;
          const category = isPast ? "Past Event" : "Upcoming";

          return (
            <div
              key={event.id}
              className="group flex flex-col border-b border-neutral-200 dark:border-neutral-800 pb-8 last:border-0 last:pb-0"
            >
              {/* Thumbnail and Badge */}
              <div
                className="relative w-full aspect-video mb-4 cursor-pointer"
                onClick={() => (isPast ? setSelectedEvent(event) : null)}
              >
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
                    <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs font-semibold uppercase tracking-widest">
                      No Preview
                    </div>
                  )}
                </div>

                {/* Upcoming badge only */}
                {!isPast && (
                  <div className="absolute top-0 right-0 z-20 translate-x-2 -translate-y-1/2">
                    <span className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] backdrop-blur-xl rounded-xl border bg-purple-600 text-white border-purple-700 shadow-xl">
                      {category}
                    </span>
                  </div>
                )}
              </div>

              {/* Date */}
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">
                {formatDate(event.start_at)}
              </p>

              {/* Title */}
              <h3
                className="text-base font-bold text-neutral-900 dark:text-neutral-50 leading-snug mb-1 line-clamp-2 cursor-pointer hover:underline"
                onClick={() => isPast && setSelectedEvent(event)}
              >
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
        })}
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}
