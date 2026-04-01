const upcomingEvents = [
  { id: 1, title: "Tech-Fest 2025", date: "April 20, 2025", description: "Our annual flagship tech festival." },
  { id: 2, title: "Hackathon 5.0", date: "May 15, 2025", description: "48 hours of intense coding and innovation." },
  { id: 3, title: "UI/UX Workshop", date: "June 05, 2025", description: "Learn the fundamentals of user experience and design." },
];

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl uppercase text-center">Upcoming Events</h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400 text-center mx-auto max-w-2xl">
            Stay updated with our latest technical events, workshops, and competitions.
          </p>
        </div>

        <div className="space-y-8 max-w-3xl mx-auto">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-8 border rounded-lg dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-2xl font-bold uppercase tracking-tight">{event.title}</h3>
                <p className="text-sm font-semibold text-neutral-400 uppercase tracking-widest">{event.date}</p>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-md">{event.description}</p>
              </div>
              <button className="px-6 py-2 bg-neutral-900 dark:bg-neutral-50 text-white dark:text-black rounded-md text-sm font-bold uppercase tracking-widest hover:opacity-90">
                Register
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
