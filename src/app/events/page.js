import api from "@/utils/api";
import EventsClient from "./EventsClient";

async function getEvents() {
  try {
    const response = await api.get("/events", {
      params: { select: "*", order: "start_at.desc" },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export const revalidate = 0;

export default async function EventsPage() {
  const events = await getEvents();
  return <EventsClient events={events} />;
}