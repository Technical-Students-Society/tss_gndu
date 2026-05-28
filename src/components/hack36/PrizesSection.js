const PRIZES = [
  { place: "01", label: "First Place", amount: "₹25,000", accent: "from-yellow-400 to-amber-300", text: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", num: "text-amber-200", img: "/hack36/hack30-golden.png" },
  { place: "02", label: "Second Place", amount: "₹15,000", accent: "from-gray-400 to-slate-300", text: "text-gray-400", bg: "bg-gray-50", border: "border-gray-200", num: "text-gray-200", img: "/hack36/hack30-silvered.png" },
  { place: "03", label: "Third Place", amount: "₹10,000", accent: "from-orange-700 to-orange-500", text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", num: "text-orange-200", img: "/hack36/hack30-wood.png" },
];

export default function PrizesSection() {
  return (
    <section id="prizes" className="px-4 font-gellix md:px-12 lg:px-20 xl:px-32 py-12 md:py-20 bg-zinc-200">
      <div className="mx-auto">

        <p className="font-mono text-xs tracking-widest text-zinc-400 mb-4"></p>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-8 md:mb-14">
          <h2 className="font-gellix text-[36px] sm:text-[48px] md:text-[60px] leading-none text-zinc-900">
            PRIZE POOL WORTH
            <span className="text-amber-500 font-gellix font-bold"> ₹50k</span>
          </h2>
          <p className="text-sm text-zinc-400 max-w-xs leading-relaxed md:text-right">
            Top 3 teams take home real money.<br />No vouchers. No merch-only. Cash.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
          {PRIZES.map(({ place, label, amount, accent, text, bg, border, num, img }) => (
            <div key={place} className={`relative rounded-2xl border ${border} ${bg} p-5 sm:p-6 md:p-8 overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}>

              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${accent}`} />

              <div
                className={`font-satoshi font-bold  absolute -right-3 top-3 leading-none select-none pointer-events-none ${num}`}
                style={{ fontSize: "clamp(64px, 12vw, 120px)" }}
              >
                {place}
              </div>

              <div className="relative z-10 flex flex-row justify-between  sm:flex-col h-full w-full gap-4 sm:gap-0">
                <div className="flex md:hidden flex-col justify-center sm:justify-start">
                  <p className={`text-xs font-semibold tracking-widest uppercase ${text} mb-1`}>{label}</p>
                  <p className="font-black font-lowres-pixel text-zinc-900 leading-none" style={{ fontSize: "clamp(24px, 4vw, 42px)" }}>{amount}</p>
                </div>
                <div className="flex justify-center items-center w-24 shrink-0 mr-10 sm:mr-0 sm:w-auto sm:h-44 md:h-60 sm:mb-4 md:mb-6">
                  <img
                    src={img}
                    alt={label}
                    className="h-24 sm:h-full w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="md:flex hidden flex-col justify-center sm:justify-start">
                  <p className={`text-xs font-semibold tracking-widest uppercase ${text} mb-1`}>{label}</p>
                  <p className="font-black font-lowres-pixel text-zinc-900 leading-none" style={{ fontSize: "clamp(24px, 4vw, 42px)" }}>{amount}</p>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}