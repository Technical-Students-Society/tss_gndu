"use client"
import Ticker from "../../components/hack36/Ticker";
import HeroSection from "../../components/hack36/HeroSection";
import StatsSection from "../../components/hack36/StatsSection";
import AboutSection from "../../components/hack36/AboutSection";
import ScheduleSection from "../../components/hack36/ScheduleSection";
import PrizesSection from "../../components/hack36/PrizesSection";
import RegisterSection from "../../components/hack36/RegisterSection";
import Footer from "../../components/hack36/Footer";

export default function Hack30Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Mono:wght@400;500&family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');
        .font-anton   { font-family: 'Anton', sans-serif; }
        .font-mono-dm { font-family: 'DM Mono', monospace; }
        .font-barlow  { font-family: 'Barlow Condensed', sans-serif; }
        html { scroll-behavior: smooth; }
        body, #root { background: #0a0a0a; }
        ::selection { background: #F5C518; color: #0a0a0a; }

        @keyframes ticker    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }

        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scaleIn   { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }

        .animate-ticker   { animation: ticker 30s linear infinite; white-space: nowrap; }
        .animate-fadeUp   { animation: fadeUp .9s ease both; }
        .animate-delay-1  { animation-delay: .15s; }
        .animate-delay-2  { animation-delay: .3s; }
        .animate-delay-3  { animation-delay: .45s; }
        .animate-scaleIn  { animation: scaleIn .9s ease .1s both; }
        .animate-blink    { animation: blink 2s infinite; }

        .block-letter { box-shadow: 4px 6px 0 rgba(0,0,0,.6); transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s; }
        .block-letter:hover { transform: rotate(0deg) translateY(-10px) !important; box-shadow: 8px 18px 0 rgba(0,0,0,.7); }

        .clip-cta { clip-path: polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%); }
        .sched-row { border-top: 1px solid #1a1a1a; transition: background .2s; }
        .sched-row:last-child { border-bottom: 1px solid #1a1a1a; }
        .sched-row:hover { background: rgba(245,197,24,.04); }
        .prize-card { transition: transform .25s, border-color .25s; }
        .prize-card:hover { transform: translateY(-6px); }
        .feat-card { transition: background .2s; }
        .feat-card:hover { background: #111; }
        .bg-text { font-family:'Anton',sans-serif; color:transparent; -webkit-text-stroke:1px #161616; pointer-events:none; user-select:none; white-space:nowrap; }
        .noise { position:fixed;inset:0;pointer-events:none;z-index:1000;opacity:.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
      `}</style>

      <div className="noise" />

      <HeroSection />
      <Ticker />
      <AboutSection />
      <StatsSection />
      <ScheduleSection />
      <PrizesSection />
      <RegisterSection />
      <Ticker />
      <Footer />
    </>
  );
}