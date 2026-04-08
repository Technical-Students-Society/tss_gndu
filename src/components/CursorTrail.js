"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

export default function CursorTrail() {
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const [isHovering, setIsHovering] = useState(false);

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
    
    let activeTarget = null;
    let hoveringInternal = false;

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
      const target = e.target.closest('a, button, .cursor-pointer, [role="button"]');
      if (target) {
        activeTarget = target;
        hoveringInternal = true;
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, .cursor-pointer, [role="button"]');
      if (target && target === activeTarget) {
        activeTarget = null;
        hoveringInternal = false;
        setIsHovering(false);
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

        if (isLead) {
          if (hoveringInternal && activeTarget) {
            const rect = activeTarget.getBoundingClientRect();
            targetX = mouse.x;
            targetY = rect.bottom + 20;
            targetW = 32;
            targetH = 32;
            targetOpacity = 1;
          } else {
            targetX = mouse.x;
            targetY = mouse.y;
            targetW = 12;
            targetH = 12;
            targetOpacity = 0.4;
          }
        } else {
          // Trail logic: follow the previous dot (original behavior)
          targetX = pos[i - 1].x;
          targetY = pos[i - 1].y;
          
          const baseSize = 12 - i * 0.8;
          targetW = Math.max(2, baseSize);
          targetH = Math.max(2, baseSize);
          // Hide trail dots while hovering to keep the indicator clean, otherwise show normal trail
          targetOpacity = hoveringInternal ? 0 : (0.4 - i * 0.03);
        }

        const dt = 1.0 - Math.pow(1.0 - (hoveringInternal && isLead ? 0.2 : 0.3), gsap.ticker.deltaRatio());

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
      className="fixed inset-0 pointer-events-none z-9999 max-md:hidden opacity-0"
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
            <div className={`transition-opacity duration-300 ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
               <ArrowRight size={16} className="text-white dark:text-black stroke-[3px]" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}



