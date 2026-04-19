"use client";

import { useState, useEffect, useMemo } from "react";
import EventModal from "@/components/EventModal";
import EventCard from "@/components/EventCard";
import api from "@/utils/api";


export default function EventsClient() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const response = await api.get("/events", {
          params: { select: "*", order: "start_at.desc" },
        });
        setEvents(response.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date();
    const upcoming = events
      .filter((e) => new Date(e.start_at) >= now)
      .sort((a, b) => new Date(a.start_at) - new Date(b.start_at));

    const past = events
      .filter((e) => new Date(e.start_at) < now)
      .sort((a, b) => new Date(b.start_at) - new Date(a.start_at));

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]);


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <div className="w-8 h-8 border-4 border-neutral-200 dark:border-neutral-800 border-t-neutral-900 dark:border-t-neutral-50 rounded-full animate-spin"></div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">Loading Events...</p>
      </div>
    );
  }

  return (
    <>
      {/* ── Upcoming Events ── */}
      {upcomingEvents.length > 0 && (
        <section className="mb-24">
          <h2 className="font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8 flex items-center gap-3">
            Upcoming Events
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

      {/* ── Event Detail Modal ── */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}
