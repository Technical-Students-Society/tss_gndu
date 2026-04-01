// import { User } from 'lucide-react'; // Placeholder icon usage if needed

const teamMembers = [
  { name: "Sahildeep Singh", role: "Core Lead", description: "Passionate about full-stack development and community building." },
  { name: "Kartikay Sharma", role: "Technical Head", description: "Expert in scalable architectures and modern UI/UX." },
  { name: "John Doe", role: "Design Head", description: "Focuses on minimal and impactful user interfaces." },
  { name: "Jane Smith", role: "Events Coordinator", description: "Brings energy and focus to every campus event." },
];

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl uppercase text-center">Meet the Team</h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400 text-center mx-auto max-w-2xl">
            The visionary minds behind TSS GNDU, dedicated to empowering our student community through technology.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center space-y-4 p-6 border rounded-lg dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
              <div className="w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                <span className="text-2xl font-bold uppercase">{member.name.charAt(0)}</span>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold uppercase tracking-tight">{member.name}</h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{member.role}</p>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
