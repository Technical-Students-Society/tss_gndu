export default function Footer() {
  return (
    <footer className="px-4 md:px-12 lg:px-20 xl:px-32 py-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center flex-wrap gap-8 text-center md:text-left bg-black">
      <div className="font-anton text-3xl tracking-widest text-white">
        HACK<span className="text-yellow-400">30</span>
      </div>
      <div className="font-mono-dm text-xs md:text-sm tracking-widest text-zinc-600">
        GNDU Campus · Amritsar · 2026
      </div>
      <div className="font-mono-dm text-xs md:text-sm text-zinc-700">© 2026 Hack30</div>
    </footer>
  );
}
