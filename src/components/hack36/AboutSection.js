const PILLS = [
  { label: "30 hours", cls: "tag-green", desktopStyle: { transform: "rotate(-5deg)", bottom: -18, left: 0 } },
  { label: "GNDU", cls: "tag-amber", desktopStyle: { transform: "rotate(4deg)", bottom: -52, left: 110 } },
  { label: "30 teams", cls: "tag-indigo", desktopStyle: { transform: "rotate(-3deg)", bottom: -52, left: 230 } },
  { label: "offline", cls: "tag-purple", desktopStyle: { transform: "rotate(6deg)", bottom: -8, left: 330 } },
  { label: "50K Prize pool", cls: "tag-purple", desktopStyle: { transform: "rotate(-6deg)", bottom: 20, left: 130 } },
];

export default function AboutSection() {
  return (
    <section className="px-4 md:px-12 lg:px-20 py-24 md:py-32 mx-auto">
      <div className="bg-zinc-950 rounded-[2.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-10 lg:gap-14 items-start">

          {/* LEFT */}
          <div>
            <p className="font-gellix text-[15px] text-zinc-600 flex items-center gap-1.5 mb-4">
              🔥 Launching something new and unseen
            </p>

            {/* Heading — no relative/absolute on mobile */}
            <h2
              className="font-gellix text-zinc-50 leading-[1.2] mb-6"
              style={{ fontSize: "clamp(44px,7vw,78px)", letterSpacing: "-.01em" }}
            >
              Hack30<br />
              is a 30-hour<br />
              offline sprint.
            </h2>

            {/* Pills: flex-wrap on mobile, absolute on lg+ */}
            <div className="flex flex-wrap gap-2 lg:hidden mb-2">
              {PILLS.map(({ label, cls }) => (
                <span
                  key={label}
                  className={`tag ${cls} inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-[15px] font-medium border-[1.5px] whitespace-nowrap`}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Desktop scattered pills */}
            <div className="hidden lg:block relative h-20">
              {PILLS.map(({ label, cls, desktopStyle }) => (
                <span
                  key={label}
                  className={`tag ${cls} absolute inline-flex items-center gap-1 px-5 py-2 rounded-full text-[20px] font-medium border-[1.5px] whitespace-nowrap`}
                  style={desktopStyle}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="pt-0 lg:-ml-10">
            <p className="font-mono text-[10px] tracking-[.15em] text-zinc-700 mb-3">
              WHAT IS HACK30
            </p>

            <p className="font-openai text-zinc-400 text-[17px] md:text-[19px] leading-relaxed mb-6">
              <strong className="text-zinc-200 font-medium">Hack30</strong> is a
              30-hour offline hackathon hosted at computer science department of GNDU, Amritsar. Teams will submit their proposals and
              <strong className="text-zinc-200 font-medium"> top 30 teams </strong>
              will be shortlisted for finals to compete on campus.
            </p>

            <p className="font-openai text-zinc-400 text-[17px] md:text-[19px] leading-relaxed mb-6">
              During the event, participants collaborate, build, and refine their
              ideas in a high-energy environment. Out of the 30 hours,
              <strong className="text-zinc-200 font-medium"> 24 hours are dedicated to development</strong>,
              while the remaining time is reserved for
              <strong className="text-zinc-200 font-medium"> project presentations, judging, and final results</strong>.
            </p>

            <p className="font-openai text-zinc-400 text-[17px] md:text-[19px] leading-relaxed mb-6">
              Whether you're solving real-world challenges, building innovative
              products, or showcasing technical skills, Hack30 is an opportunity to
              learn, network, and compete with some of the brightest student
              developers.
            </p>

            <p className="font-openai text-[15px] text-purple-400/80 italic">
              Food? Handled. Sleep? Optional. Winning? Earned.
            </p>
          </div>

        </div>
      </div>

      <style>{`
        .tag-green  { background:#052e16; color:#86efac; border-color:#166534; }
        .tag-amber  { background:#451a03; color:#fcd34d; border-color:#92400e; }
        .tag-indigo { background:#1e1b4b; color:#a5b4fc; border-color:#3730a3; }
        .tag-purple { background:#3b0764; color:#d8b4fe; border-color:#6b21a8; }
      `}</style>
    </section>
  );
}