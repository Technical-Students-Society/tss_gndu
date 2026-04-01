import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-48 bg-white dark:bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl uppercase">
                Bridging Tech & <br className="hidden md:inline" /> Innovation
              </h1>
              <p className="mx-auto max-w-[700px] text-neutral-500 md:text-xl dark:text-neutral-400">
                Official Technical Student Society of Guru Nanak Dev University. We empower students through workshops, hackathons, and technical excellence.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/events"
                className="inline-flex h-11 items-center justify-center rounded-md bg-neutral-900 px-8 text-sm font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
              >
                View Events
              </Link>
              <Link
                href="/about"
                className="inline-flex h-11 items-center justify-center rounded-md border border-neutral-200 bg-white px-8 text-sm font-medium transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="w-full py-20 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-tight">Technical Excellence</h3>
              <p className="text-neutral-500 dark:text-neutral-400">
                We organize workshops and seminars on cutting-edge technologies to keep our students ahead in the industry.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-tight">Community Driven</h3>
              <p className="text-neutral-500 dark:text-neutral-400">
                A vibrant community of developers, designers, and tech enthusiasts working together on impactful projects.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-tight">Career Growth</h3>
              <p className="text-neutral-500 dark:text-neutral-400">
                Regular hackathons and coding competitions to sharpen skills and provide exposure to real-world challenges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
