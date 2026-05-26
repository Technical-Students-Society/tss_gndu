"use client"
import { useState, useEffect } from "react";

export default function Countdown() {
  const target = new Date("2025-08-15T09:00:00");
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setTime({ d: Math.floor(diff / 86400000), h: Math.floor(diff % 86400000 / 3600000), m: Math.floor(diff % 3600000 / 60000), s: Math.floor(diff % 60000 / 1000) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  const p = n => String(n).padStart(2, "0");
  return (
    <div className="flex gap-0.5">
      {[["D", time.d], ["H", time.h], ["M", time.m], ["S", time.s]].map(([l, v]) => (
        <div key={l} className="flex flex-col items-center">
          <div className="bg-zinc-900 border border-zinc-800 px-3 py-2 font-anton text-yellow-400 text-4xl leading-none min-w-[2ch] text-center">
            {p(v)}
          </div>
          <span className="font-mono text-[9px] tracking-widest text-zinc-600 mt-1">{l}</span>
        </div>
      ))}
    </div>
  );
}
