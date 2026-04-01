import TeamCategorySection from "@/components/TeamCategorySection";

const teamData = {
  Executives: [
    { name: "Sahildeep Singh", role: "Core Lead" },
    { name: "Kartikay Sharma", role: "Core Lead" },
    { name: "John Doe", role: "Executive Member" },
    { name: "Jane Smith", role: "Executive Member" },
    { name: "Mike Johnson", role: "Treasurer" },
  ],
  Technical: [
    { name: "Alex Chen", role: "Technical Head" },
    { name: "Sarah Lee", role: "Web Developer" },
    { name: "Robert Brown", role: "App Developer" },
    { name: "Emily Davis", role: "AI/ML Lead" },
    { name: "Chris Wilson", role: "Cloud Architect" },
  ],
  Sponsorship: [
    { name: "David Miller", role: "Sponsorship Head" },
    { name: "Lisa Wong", role: "Corporate Relations" },
    { name: "James Taylor", role: "Public Relations" },
    { name: "Maria Garcia", role: "Outreach Lead" },
  ],
  Design: [
    { name: "Sophia Martinez", role: "Design Head" },
    { name: "Daniel Kim", role: "UI/UX Designer" },
    { name: "Olivia Thomas", role: "Graphic Specialist" },
    { name: "Ethan Garcia", role: "Content Creator" },
  ],
  Cultural: [
    { name: "Rachel Adams", role: "Cultural Head" },
    { name: "Kevin Jackson", role: "Event Manager" },
    { name: "Avery White", role: "Performing Arts Lead" },
    { name: "Chloe Moore", role: "Decorator" },
  ],
  Sports: [
    { name: "Lucas Scott", role: "Sports Head" },
    { name: "Ryan Hall", role: "Athletic Lead" },
    { name: "Megan Young", role: "Tournament Coordinator" },
    { name: "Tyler Price", role: "Logistics" },
  ],
};

export default function TeamPage() {
  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-20">
      <div className="space-y-24">
        {/* Page Header */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl uppercase text-center text-neutral-900 dark:text-neutral-50 mb-0">
            Meet the Team
          </h1>
          <p className="text-xl text-neutral-400 dark:text-neutral-500 text-center mx-auto max-w-2xl">
            The specialized minds behind TSS GNDU, dedicated to empowering our student community through technology, design, and culture.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-20">
          {Object.entries(teamData).map(([category, members]) => (
            <TeamCategorySection key={category} title={category} members={members} />
          ))}
        </div>
      </div>
    </div>
  );
}
