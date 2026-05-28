export default function Footer() {
  return (
    <footer className="px-4 md:px-12 lg:px-20 py-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 bg-black">
      <div className="flex flex-col items-center md:items-start gap-2">
        <div className="font-lowres-pixel text-3xl tracking-widest text-white">
          HACK<span className="text-purple-400">30</span>
        </div>
        <div className="font-mono-dm text-xs text-zinc-700">© 2026 Hack30. All rights reserved.</div>
      </div>

      <div className="flex flex-col items-center md:items-center gap-2">
        <div className="font-mono-dm text-xs md:text-sm tracking-widest text-zinc-500 uppercase">
          GNDU Campus · Amritsar
        </div>
        <div className="font-mono-dm text-xs text-zinc-600">
          Technical Students' Society (TSS)
        </div>
      </div>

      <div className="flex flex-col items-center md:items-end gap-3">
        <span className="font-mono-dm text-xs tracking-wider text-zinc-600 uppercase">Connect With Us</span>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {[
            { name: "GitHub", link: "https://github.com/Technical-Students-Society" },
            { name: "LinkedIn", link: "https://www.linkedin.com/company/technical-students-societies/" },
            { name: "Instagram", link: "https://www.instagram.com/tss_gndu" },
            { name: "Gmail", link: "mailto:contact@tss-gndu.org" },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-dm text-xs text-zinc-500 hover:text-purple-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
