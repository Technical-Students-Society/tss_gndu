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
      .filter((e) => e.is_coming_soon || !e.start_at || new Date(e.start_at) >= now)
      .sort((a, b) => {
        // Coming soon events (without dates) appear first
        if (a.is_coming_soon && !b.is_coming_soon) return -1;
        if (!a.is_coming_soon && b.is_coming_soon) return 1;

        const dateA = a.start_at ? new Date(a.start_at) : new Date(0);
        const dateB = b.start_at ? new Date(b.start_at) : new Date(0);
        return dateA - dateB;
      });

    const past = events
      .filter((e) => !e.is_coming_soon && e.start_at && new Date(e.start_at) < now)
      .sort((a, b) => new Date(b.start_at) - new Date(a.start_at));

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="w-5 h-5 border border-neutral-300 dark:border-neutral-700 border-t-neutral-900 dark:border-t-neutral-300 rounded-full animate-spin" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="py-40 text-center">
        <p className="text-sm text-neutral-400 dark:text-neutral-600">
          No events yet — check back soon.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ── Upcoming Events ── */}
      {upcomingEvents.length > 0 && (
        <section className="mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8 flex items-center gap-3">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} onSelect={setSelectedEvent} />
            ))}
          </div>
        </section>
      )}

      {/* ── Past Events ── */}
      {pastEvents.length > 0 && (
        <section className="mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8 flex items-center gap-3">
            Past Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} onSelect={setSelectedEvent} />
            ))}
          </div>
        </section>
      )}

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}
