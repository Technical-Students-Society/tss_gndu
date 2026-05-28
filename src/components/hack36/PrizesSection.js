import sticker1 from "./stickers/sticker1.png";
import sticker2 from "./stickers/sticker2.png";
import sticker3 from "./stickers/sticker3.png";
import sticker4 from "./stickers/sticker4.png";

const PRIZES = [
  {
    place: "01",
    label: "First Place",
    amount: "₹25,000",
    accent: "from-yellow-400 to-amber-300",
    text: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-200",
    num: "text-amber-200",
    img: "/hack36/hack30-golden.png",
    perks: ["Cash Prize", "Winner Certificate", "Feature Spotlight"],
  },
  {
    place: "02",
    label: "Second Place",
    amount: "₹15,000",
    accent: "from-gray-400 to-slate-300",
    text: "text-gray-400",
    bg: "bg-gray-50",
    border: "border-gray-200",
    num: "text-gray-200",
    img: "/hack36/hack30-silvered.png",
    perks: ["Cash Prize", "Certificates", "Community Recognition"],
  },
  {
    place: "03",
    label: "Third Place",
    amount: "₹10,000",
    accent: "from-orange-700 to-orange-500",
    text: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    num: "text-orange-200",
    img: "/hack36/hack30-wood.png",
    perks: ["Cash Prize", "Certificates", "Exclusive Swags"],
  },
];

export default function PrizesSection() {
  return (
    <section
      id="prizes"
      className="px-4 font-gellix md:px-12 lg:px-20 xl:px-32 py-14 md:py-24 bg-purple-100 overflow-hidden relative"
    >
      {/* Background large text */}
      <div
        className=" absolute top-[10rem] md:top-1/2 left-1/2 -translate-x-1/2 font-lowres-pixel text-purple-300/50 -translate-y-1/2 opacity-35 leading-none pointer-events-none select-none"

        style={{ fontSize: "clamp(100px,25vw,400px)", }}
      >
        PRIZESKOKO
      </div>
      {/* Background Stickers */}
      <img
        src={sticker2.src}
        alt=""
        className="absolute top-8 md:top-12 right-6 md:right-12 w-16 md:w-42 h-auto object-contain pointer-events-none select-none  -rotate-35 z-0"
      />
      <div className="mx-auto">

        <div className="inline-flex items-center gap-2 rounded-full border border-purple-300 bg-white px-4 py-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <p className="font-mono text-[11px] tracking-[0.2em] text-purple-700 uppercase">
            Prize Distribution
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12 md:mb-16">

          <div className="max-w-3xl">
            <h2 className="font-gellix text-[30px] sm:text-[52px] md:text-[68px] leading-[0.95] text-zinc-900">
              Prize pool worth
              <span className="text-purple-700 font-bold"> ₹50,000</span>
            </h2>

            <p className="mt-5 text-zinc-600 text-[15px] md:text-[17px] leading-relaxed max-w-2xl">
              Build something impactful in 30 hours and compete for real rewards.
              The best ideas, execution, innovation, and presentation will take
              home exciting prizes and recognition.
            </p>

            {/* <div className="flex flex-wrap gap-3 mt-6">
              {[
                "Rewards",
                "Certificates",
                "Recognition",
                "Networking",
              ].map((item) => (
                <div
                  key={item}
                  className="px-4 py-2 rounded-full bg-white border border-purple-200 text-sm text-zinc-700"
                >
                  {item}
                </div>
              ))}
            </div> */}
          </div>

          <div className="text-sm hidden md:block text-zinc-500 leading-relaxed max-w-sm lg:text-right">
            Top performing teams will receive prizes, certificates, and special
            recognition from organizers and mentors. Every participant gets a
            chance to showcase their innovation.
          </div>

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
                <div className="flex justify-center items-center w-24 shrink-0 mr-10 sm:mr-0 sm:w-auto sm:h-44 md:h-40 sm:mb-4 md:mb-6">
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

        {/* <div className="mt-10 md:mt-14 rounded-3xl border border-purple-200 bg-white/60 backdrop-blur-sm px-6 py-5 flex flex-col md:flex-row gap-5 justify-between items-start md:items-center">
          <div>
            <p className="text-zinc-900 font-semibold text-lg">
              More than just prizes.
            </p>
            <p className="text-zinc-600 text-sm mt-1">
              Meet developers, mentors, designers, and innovators from across
              campuses while building something meaningful.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="px-4 py-2 rounded-full bg-purple-500 text-white text-sm">
              30 Hours
            </div>
            <div className="px-4 py-2 rounded-full bg-zinc-900 text-white text-sm">
              Real Projects
            </div>
            <div className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-sm">
              Open Innovation
            </div>
          </div>
        </div> */}

      </div>
    </section>
  );
}