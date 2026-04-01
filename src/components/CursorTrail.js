"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorTrail() {
  const containerRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const dots = dotsRef.current;
    
    // Performance optimization: Create setters once
    const xSetters = dots.map((dot) => gsap.quickSetter(dot, "x", "px"));
    const ySetters = dots.map((dot) => gsap.quickSetter(dot, "y", "px"));

    const mouse = { x: 0, y: 0 };
    const pos = dots.map(() => ({ x: 0, y: 0 }));

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const ticker = gsap.ticker.add(() => {
      // Loop through all dots
      pos.forEach((p, i) => {
        // Simple lerp (interpolation) logic for the "following" effect
        // The first dot follows the mouse, subsequent dots follow the previous one
        const targetX = i === 0 ? mouse.x : pos[i - 1].x;
        const targetY = i === 0 ? mouse.y : pos[i - 1].y;

        const dt = 1.0 - Math.pow(1.0 - 0.3, gsap.ticker.deltaRatio()); 
        
        p.x += (targetX - p.x) * dt;
        p.y += (targetY - p.y) * dt;

        // Apply positions
        xSetters[i](p.x);
        ySetters[i](p.y);
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Create 12 trailing dots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className="absolute top-0 left-0 rounded-full bg-neutral-900/40 dark:bg-neutral-100/40"
          style={{
            width: `${12 - i * 0.8}px`,
            height: `${12 - i * 0.8}px`,
            opacity: 1 - i * 0.07,
            marginLeft: `-${(12 - i * 0.8) / 2}px`,
            marginTop: `-${(12 - i * 0.8) / 2}px`,
          }}
        />
      ))}
    </div>
  );
}
