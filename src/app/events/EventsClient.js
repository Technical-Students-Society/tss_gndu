"use client";

import { useState, useEffect } from "react";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onSelect={setSelectedEvent} />
        ))}
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}
