const FACTS = [
  { n: "30", l: "Teams compete", img: "/hack36/stats-team.jpg" },
  { n: "30", l: "Hours straight", img: "/hack36/hack36-clock.png" },
  { n: "₹50K", l: "Total prizes", img: "/hack36/stats-prize.jpg" },
  { n: "24H", l: "Coding window", img: "/hack36/stats-code.jpg" },
];

export default function StatsSection() {
  return (
    <section className="px-4 md:px-12 lg:px-20  py-12 md:py-20  mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {FACTS.map(({ n, l, img }) => (
          <div key={l} className="group relative bg-zinc-950 rounded-[2.5rem] overflow-hidden min-h-[320px]  flex flex-col justify-end p-8 md:p-10 border border-zinc-900 transition-all hover:border-zinc-800">
            <div className="absolute inset-x-0 top-0 h-1 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            {img && (
              <>
                <img src={img} alt={l} className="absolute inset-0 w-full h-full object-cover  group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out " />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" /> */}
              </>
            )}
            {!img && (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-zinc-950" />
            )}
            <div className="relative z-20">
              <div className="font-anton text-zinc-50 leading-none mb-4 drop-shadow-lg text-[60px]">{n}</div>
              <div className="font-mono text-[13px] md:text-[15px] tracking-[.15em] text-zinc-300 uppercase drop-shadow-md">{l}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
