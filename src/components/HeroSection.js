import Link from "next/link";

const imgSrcs = [
  "/hero/greeky.jpg",
  "/hero/mazed.jpg",
  "/hero/philip.jpeg",
  "/hero/pixie.jpg",
  "/hero/sahil_12.png",
  "/hero/fatguy.jpg",
];

const COLS = 15;
const ROWS = 8;

const imagePositions = [
  { row: 1, col: 2, imgIndex: 0 },
  { row: 1, col: 12, imgIndex: 1 },
  { row: 3, col: 3, imgIndex: 2 },
  { row: 3, col: 11, imgIndex: 3 },
  { row: 5, col: 5, imgIndex: 4 },
  { row: 5, col: 9, imgIndex: 5 },
];

export default function HeroSection() {
  const imageMap = {};
  imagePositions.forEach(({ row, col, imgIndex }) => {
    imageMap[`${row}-${col}`] = imgSrcs[imgIndex];
  });

  const cells = Array.from({ length: ROWS * COLS }, (_, i) => {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    return { row, col, imgSrc: imageMap[`${row}-${col}`] };
  });

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-zinc-950">

      {/* ── Grid background ── */}
      <div
        className="absolute inset-0 overflow-hidden p-2"
        style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 1fr)`, gap: "6px", alignContent: "start" }}
      >
        {cells.map(({ row, col, imgSrc }, i) => (
          <div
            key={i}
            className={`relative rounded-xl aspect-square ${(row + col) % 2 === 0
              ? "bg-neutral-100/70 dark:bg-zinc-900/20"
              : "bg-neutral-50 dark:bg-zinc-900/10"
              }`}
          >
            {imgSrc && (
              <div
                className="absolute inset-0 p-1 rounded-xl overflow-hidden z-10"
                style={{ boxShadow: "6px 2px 12px rgba(0,0,0,0.36)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt=""
                  className="w-full rounded-lg h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>


      {/* ── Main content ── */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-6 pb-24">

        {/* Badge */}
        <div className="flex items-center gap-2 mb-6 text-xs text-neutral-500 dark:text-neutral-400 tracking-wide">
          <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
          Technical Student Society
        </div>

        {/* Headline */}
        <h1 className="text-5xl pointer-events-none sm:text-6xl md:text-7xl lg:text-[5.5rem] font-rational font-extrabold tracking-tight leading-[1.05] text-neutral-900 dark:text-white max-w-3xl mb-5">
          Bridging Tech &amp;
          <br />
          Innovation
        </h1>

        {/* Sub */}
        <p className="max-w-xl text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed mb-9">
          Official Technical Student Society of Guru Nanak Dev University. We
          empower students through workshops, hackathons, and technical
          excellence.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 h-11 px-7 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-neutral-900 inline-block" />
            View Events
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 h-11 px-7 rounded-full border border-neutral-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:bg-white dark:hover:bg-zinc-700 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 inline-block" />
            Learn More
          </Link>
        </div>
      </div>

    </section>
  );
}