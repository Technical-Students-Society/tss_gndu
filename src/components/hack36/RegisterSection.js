export default function RegisterSection() {
  return (
    <section id="register" className="px-4 md:px-12 lg:px-20 xl:px-32 py-24 border-t border-zinc-900 relative overflow-hidden text-center bg-zinc-950">
      <div className="bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 leading-none pointer-events-none"
        style={{ fontSize: "clamp(160px,25vw,400px)" }}>REG</div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="font-mono-dm text-xs tracking-widest text-zinc-500 mb-8">// 04 REGISTER</p>
        <h2 className="font-anton text-white leading-[.88] mb-12" style={{ fontSize: "clamp(64px,12vw,180px)" }}>
          READY<br />TO<br /><span className="text-yellow-400">BUILD?</span>
        </h2>
        <p className="font-barlow text-zinc-400 font-normal tracking-wide mb-16 text-xl md:text-3xl leading-relaxed max-w-4xl mx-auto">
          Problem statements drop in 1 day. Register your team, submit a proposal,
          <br className="hidden md:block" />get shortlisted — then build for 30 hours straight.
        </p>
        <a href="#" className="clip-cta inline-flex items-center justify-center gap-4 px-14 md:px-20 py-6 md:py-8 bg-yellow-400 text-black font-anton text-2xl md:text-4xl tracking-wider no-underline hover:bg-yellow-300 transition-colors mb-16 w-full sm:w-auto shadow-2xl">
          Register Your Team →
        </a>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-8">
          {["📍 GNDU Campus, Amritsar", "🍕 Food Included", "⏱ 24H Coding Sprint", "🏆 ₹50,000 Prize Pool"].map(t => (
            <span key={t} className="font-mono-dm text-xs md:text-sm tracking-widest text-zinc-500 bg-black/40 px-6 py-3 rounded-full border border-zinc-800">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
