const FACTS = [
  { n: "30", l: "Teams compete", img: "/hack36/stats-team.jpg" },
  { n: "30", l: "Hours straight", img: "/hack36/hack36-clock.png" },
  { n: "₹50K", l: "Total prizes", img: "/hack36/stat-rich.jpg", cat: true },
  { n: "24H", l: "Coding window", img: "/hack36/stat-code.jpg" },
];

export default function StatsSection() {
  return (
    <section className="px-4 md:px-12 lg:px-20 py-8 md:py-14 mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {FACTS.map(({ n, l, img, cat }) => (
          <div
            key={l}
            className="group relative flex flex-col bg-[#0c0c0f] rounded-[14px] border border-white/[0.07] hover:border-violet-500/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            {cat && (
              <img
                src="/hack36/cat-amaze.png"
                alt="Amazed cat mascot"
                className="absolute bottom-0 right-4 w-12 z-30 pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out group-hover:scale-110 "
              />
            )}

            {/* Fixed-height image */}
            <div className="h-[120px] md:h-[160px] overflow-hidden rounded-t-[14px] flex-shrink-0">
              <img
                src={img} alt="" aria-hidden="true"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Inline stat row */}
            <div className="flex items-baseline gap-2.5 px-3.5 pt-2.5 pb-3 border-t border-white/[0.06] relative">
              <div className="absolute top-0 inset-x-3.5 h-px bg-violet-500/0 group-hover:bg-violet-500/50 transition-colors duration-300" />
              <span className="font-['Bebas_Neue'] text-[20px] md:text-[32px] leading-none text-zinc-50 tracking-wide">
                {n}
              </span>
              <span className="text-[8px] text-nowrap md:text-[10px] tracking-[0.13em] text-zinc-500 uppercase font-medium">
                {l}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}