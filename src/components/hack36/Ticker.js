export default function Ticker() {
  const txt = "HACK30 · GNDU AMRITSAR · 30 TEAMS · 30 HOURS · ₹50,000 IN PRIZES · REGISTRATIONS OPEN · FOOD PROVIDED · ";
  return (
    <div className="overflow-hidden bg-purple-600 border-t-2 border-b-2 border-black py-2.5">
      <div className="flex whitespace-nowrap animate-ticker">
        {Array(12).fill(txt).map((t, i) => (
          <span key={i} className="font-rational font-semibold text-xs tracking-widest text-black pr-16">{t}</span>
        ))}
      </div>
    </div>
  );
}
