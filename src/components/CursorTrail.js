"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function CursorTrail() {
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const [hoverState, setHoverState] = useState("none"); // "none", "navlink", "flink", "event1", "event2", "gallery"
  const pathname = usePathname();

  // Use refs for ticker values to keep them in sync across effects
  const activeTargetRef = useRef(null);
  const currentHoverTypeRef = useRef("none");

  // Reset hover state on route change
  useEffect(() => {
    activeTargetRef.current = null;
    currentHoverTypeRef.current = "none";
    setHoverState("none");
  }, [pathname]);

  useEffect(() => {
    const dots = dotsRef.current;
    if (!dots.length) return;

    // Performance optimization: Create setters once
    const xSetters = dots.map((dot) => gsap.quickSetter(dot, "x", "px"));
    const ySetters = dots.map((dot) => gsap.quickSetter(dot, "y", "px"));
    const widthSetters = dots.map((dot) => gsap.quickSetter(dot, "width", "px"));
    const heightSetters = dots.map((dot) => gsap.quickSetter(dot, "height", "px"));
    const opacitySetters = dots.map((dot) => gsap.quickSetter(dot, "opacity"));

    let hasMoved = false;
    const mouse = { x: 0, y: 0 };
    const pos = dots.map(() => ({ x: 0, y: 0, w: 10, h: 10 }));

    const handleMouseMove = (e) => {
      if (!hasMoved) {
        hasMoved = true;
        pos.forEach((p, i) => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
        gsap.set(containerRef.current, { opacity: 1 });
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('.navlink-target, .flink-target, .event-target-1, .event-target-2, .gallery-target');
      if (target) {
        activeTargetRef.current = target;
        let type = "none";
        if (target.classList.contains('navlink-target')) type = 'navlink';
        else if (target.classList.contains('flink-target')) type = 'flink';
        else if (target.classList.contains('event-target-1')) type = 'event1';
        else if (target.classList.contains('event-target-2')) type = 'event2';
        else if (target.classList.contains('gallery-target')) type = 'gallery';
        
        currentHoverTypeRef.current = type;
        setHoverState(type);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('.navlink-target, .flink-target, .event-target-1, .event-target-2, .gallery-target');
      if (target && target === activeTargetRef.current) {
        activeTargetRef.current = null;
        currentHoverTypeRef.current = "none";
        setHoverState("none");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    // Animation Loop
    const ticker = gsap.ticker.add(() => {
      pos.forEach((p, i) => {
        let targetX, targetY, targetW, targetH, targetOpacity;

        const isLead = i === 0;
        const currentHoverType = currentHoverTypeRef.current;
        const isHovering = currentHoverType !== "none";
        const activeTarget = activeTargetRef.current;

        if (isLead) {
          if (isHovering && activeTarget) {
            const rect = activeTarget.getBoundingClientRect();
            if (currentHoverType === 'navlink') {
              targetX = mouse.x - 10;
              targetY = rect.bottom + 20;
              targetW = 32;
              targetH = 32;
              targetOpacity = 1;
            } else if (currentHoverType === 'flink') {
              targetX = rect.right + 20;
              targetY = mouse.y - 10;
              targetW = 32;
              targetH = 32;
              targetOpacity = 1;
            } else if (currentHoverType === 'event1' || currentHoverType === 'event2' || currentHoverType === 'gallery') {
              // Pill effect for events and gallery
              targetX = mouse.x;
              targetY = mouse.y;
              if (currentHoverType === 'gallery') {
                  targetW = 80;
                  targetH = 34;
              } else {
                  targetW = currentHoverType === 'event1' ? 140 : 120;
                  targetH = 40;
              }
              targetOpacity = 1;
            }
          } else {
            targetX = mouse.x;
            targetY = mouse.y;
            targetW = 12;
            targetH = 12;
            targetOpacity = 0.4;
          }
        } else {
          // Trail logic: follow the previous dot
          targetX = pos[i - 1].x;
          targetY = pos[i - 1].y;

          const baseSize = 12 - i * 0.8;
          targetW = Math.max(2, baseSize);
          targetH = Math.max(2, baseSize);

          // Hide trail dots while hovering to keep the indicator/effect clean
          targetOpacity = isHovering ? 0 : (0.4 - i * 0.03);
        }

        const dampening = (isHovering && isLead) ? 0.2 : 0.3;
        const dt = 1.0 - Math.pow(1.0 - dampening, gsap.ticker.deltaRatio());

        p.x += (targetX - p.x) * dt;
        p.y += (targetY - p.y) * dt;
        p.w += (targetW - p.w) * dt;
        p.h += (targetH - p.h) * dt;

        xSetters[i](p.x);
        ySetters[i](p.y);
        widthSetters[i](p.w);
        heightSetters[i](p.h);
        opacitySetters[i](targetOpacity);
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-9999 max-lg:hidden opacity-0"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className="absolute top-0 left-0 rounded-full bg-neutral-900 dark:bg-neutral-100 will-change-[transform,width,height,opacity] flex items-center justify-center overflow-hidden transition-colors duration-300"
          style={{
            transform: `translate(-50%, -50%)`,
            width: '0px',
            height: '0px',
            opacity: 0
          }}
        >
          {i === 0 && (
            <>
              {/* Arrow for Links */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${(hoverState === 'navlink' || hoverState === 'flink') ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <ArrowRight size={16} className="text-white dark:text-black -rotate-45" />
              </div>
              
              {/* Text for Events */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hoverState === 'event1' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white dark:text-black whitespace-nowrap">Register Now</span>
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hoverState === 'event2' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white dark:text-black whitespace-nowrap">View More</span>
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hoverState === 'gallery' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white dark:text-black whitespace-nowrap">View</span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}


