const FACTS = [
  { n: "30", l: "Teams compete", img: "/hack36/stats-team.jpg" },
  { n: "30", l: "Hours straight", img: "/hack36/hack36-clock.png" },
  { n: "₹50K", l: "Total prizes", img: "/hack36/stats-prize.jpg" },
  { n: "24H", l: "Coding window", img: "/hack36/stats-code.jpg" },
];

export default function StatsSection() {
  return (
    <section className="px-4 md:px-12 lg:px-20 py-12 md:py-20 mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {FACTS.map(({ n, l, img }, index) => (
          <div key={l} className="group relative">
            {/* Cat peeks above the card — needs enough top clearance */}
            {index === 2 && (
              <img
                src="/hack36/cat-amaze.png"
                alt="Amazed Cat"
                className="absolute -top-16 left-1/2 -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain z-30 pointer-events-none"
              />
            )}

            <div className="relative bg-zinc-950 rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden min-h-[180px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[320px] flex flex-col justify-end p-5 sm:p-6 md:p-8 lg:p-10 border border-zinc-900 transition-all hover:border-zinc-800">
              <div className="absolute inset-x-0 top-0 h-1 bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

              {img && (
                <img
                  src={img}
                  alt={l}
                  className="absolute inset-0 w-full h-full object-cover group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              )}
              {!img && (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-zinc-950" />
              )}

              <div className="relative z-20">
                <div className="font-anton text-zinc-50 leading-none mb-2 md:mb-4 drop-shadow-lg text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px]">
                  {n}
                </div>
                <div className="font-mono text-[10px] sm:text-[11px] md:text-[13px] lg:text-[15px] tracking-[.12em] md:tracking-[.15em] text-zinc-300 uppercase drop-shadow-md">
                  {l}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}