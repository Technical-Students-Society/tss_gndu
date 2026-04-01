export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl uppercase">About TSS GNDU</h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400">
            Empowering students with technical knowledge and professional skills.
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <p>
            The Technical Student Society (TSS) at Guru Nanak Dev University is more than just a society; it’s a movement towards bridging the gap between academic learning and industrial requirements.
          </p>
          <p>
            Established with the vision of creating a vibrant ecosystem for technology enthusiasts, TSS has consistently delivered high-quality workshops, seminars, and hackathons. Our focus areas include software development, competitive programming, cybersecurity, AI/ML, and UI/UX design.
          </p>

          <h2 className="text-2xl font-bold uppercase tracking-tight pt-8">Our Mission</h2>
          <p>
            To foster a culture of innovation and provide a platform for students to showcase their technical prowess. We aim to equip every member with the tools and mentorship they need to excel in their careers.
          </p>

          <h2 className="text-2xl font-bold uppercase tracking-tight pt-8">What We Do</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Weekly technical workshops on trending technologies.</li>
            <li>Annual hackathons and coding competitions.</li>
            <li>Industrial visits and networking sessions.</li>
            <li>Collaborative project development and open-source contributions.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
