"use client";

import { useState, useEffect } from "react";
import EventModal from "@/components/EventModal";
import EventCard from "@/components/EventCard";
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

  if (events.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onSelect={setSelectedEvent} 
          />
        ))}
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}
