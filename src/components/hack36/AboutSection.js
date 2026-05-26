const PILLS = [
  { label: "30 hours", cls: "tag-green", style: { transform: "rotate(-5deg)", bottom: -18, left: 0 } },
  { label: "GNDU", cls: "tag-amber", style: { transform: "rotate(4deg)", bottom: -52, left: 110 } },
  { label: "30 teams", cls: "tag-indigo", style: { transform: "rotate(-3deg)", bottom: -52, left: 230 } },
  { label: "offline", cls: "tag-purple", style: { transform: "rotate(6deg)", bottom: -8, left: 330 } },
  { label: "50K Prize pool", cls: "tag-purple", style: { transform: "rotate(-6deg)", bottom: 20, left: 130 } },
];

export default function AboutSection() {
  return (
    <section className="px-4 md:px-12 lg:px-20  py-24 md:py-32  mx-auto">
      <div className="bg-zinc-950 rounded-[2.5rem] ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT */}
          <div>
            {/* <p className="font-mono text-[11px] tracking-[.12em] text-zinc-600 mb-4">
               01 OVERVIEW 
            </p> */}
            <p className="font-gellix text-[13px] text-zinc-600 flex items-center gap-1.5 mb-4">
              🔥 Punjab's most intense hackathon is here, and...
            </p>
            <div className="relative pb-16">
              <h2
                className="font-gellix text-zinc-50 leading-[1.2]"
                style={{ fontSize: "clamp(44px,7vw,78px)", letterSpacing: "-.01em" }}
              >
                Hack30<br />
                is a 30-hour<br />
                offline sprint.
              </h2>
              {PILLS.map(({ label, cls, style }) => (
                <span
                  key={label}
                  className={`tag ${cls} absolute inline-flex items-center gap-1 px-5 py-2 rounded-full text-24 font-medium border-[1.5px] whitespace-nowrap`}
                  style={style}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="pt-0 lg:pt-12">
            <p className="font-mono text-[10px] tracking-[.15em] text-zinc-700 mb-3">
              WHAT IS HACK30
            </p>
            <p className="font-barlow text-zinc-400 text-[17px] md:text-[19px] leading-relaxed mb-6">
              Hack30 is a <strong className="text-zinc-200 font-medium">30-hour hackathon</strong> between{" "}
              <strong className="text-zinc-200 font-medium">30 teams</strong> — competing live, offline,
              on the GNDU campus. Teams submit proposals against released problem statements;
              the <strong className="text-zinc-200 font-medium">top 30 get selected</strong> to compete.
            </p>
            <p className="font-barlow text-zinc-400 text-[17px] md:text-[19px] leading-relaxed mb-6">
              Of the 30 hours, <strong className="text-zinc-200 font-medium">24 are pure coding</strong> —
              uninterrupted, fuelled, relentless. The remaining 6 hours are for{" "}
              <strong className="text-zinc-200 font-medium">presentations, judging, and results.</strong>{" "}
              Build something real. Defend it. Win.
            </p>
            <p className="font-barlow text-[15px] text-zinc-600 italic">
              Food? Handled. Sleep? Optional. Winning? Earned.
            </p>

            <div className="mt-6 pt-5 border-t border-zinc-800 font-mono text-[10px] tracking-widest text-zinc-700 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span>Organised by Technical Student Society</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span>Guru Nanak Dev University, Amritsar — Punjab</span>
              </div>
            </div>
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