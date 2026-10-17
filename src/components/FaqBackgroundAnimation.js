"use client";

import React, { useRef, useEffect } from 'react';

export default function FaqBackgroundAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Theme state
    let isDark = document.documentElement.classList.contains('dark');
    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark');
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Handle high-DPI resize
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle system (minimal floating cosmic dust & pixel sparkles across full width)
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (width || 1200),
      y: Math.random() * (height || 600),
      radius: Math.random() * 1.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35 + 0.15,
      speedY: (Math.random() - 0.5) * 0.25,
      baseOpacity: Math.random() * 0.35 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
      isSparkle: Math.random() > 0.7,
    }));

    // Mouse interaction for subtle parallax
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Intersection Observer to stop animation when out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // ── 1. Soft Breathing Ambient Radial Glow (Behind FAQ Card Area) ──
      const glowCenterX = width * 0.5;
      const glowCenterY = height * 0.48;
      const pulse = Math.sin(time * 0.8) * 30;
      const glowRadius = Math.min(width * 0.45, 500) + pulse;

      const radialGlow = ctx.createRadialGradient(
        glowCenterX,
        glowCenterY,
        0,
        glowCenterX,
        glowCenterY,
        glowRadius
      );

      if (isDark) {
        radialGlow.addColorStop(0, 'rgba(99, 102, 241, 0.09)');
        radialGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.04)');
        radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        radialGlow.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
        radialGlow.addColorStop(0.5, 'rgba(147, 197, 253, 0.03)');
        radialGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }

      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // ── 2. Subtle Drifting Particles & Pixel Sparkles Across Full Width ──
      particles.forEach((p) => {
        // Position update
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around seamlessly
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;
        if (p.y > height + 20) p.y = -20;
        if (p.y < -20) p.y = height + 20;

        // Pulsing twinkle
        const currentOpacity =
          p.baseOpacity + Math.sin(time * 60 * p.pulseSpeed + p.phase) * 0.22;
        const clampedOpacity = Math.max(0.05, Math.min(0.85, currentOpacity));
        const px = Math.round(p.x);
        const py = Math.round(p.y);

        if (p.isSparkle) {
          // Minimal 4-point pixel sparkle ✦
          const sparkleColor = isDark
            ? `rgba(165, 180, 252, ${clampedOpacity})`
            : `rgba(99, 102, 241, ${clampedOpacity})`;
          ctx.fillStyle = sparkleColor;
          ctx.fillRect(px, py - 2, 2, 6);
          ctx.fillRect(px - 2, py, 6, 2);
          ctx.fillRect(px, py, 2, 2);
        } else {
          // Authentic square pixel stardust
          const dotColor = isDark
            ? `rgba(224, 231, 255, ${clampedOpacity})`
            : `rgba(79, 70, 229, ${clampedOpacity})`;
          ctx.fillStyle = dotColor;
          const size = Math.max(2, Math.round(p.radius * 1.5));
          ctx.fillRect(px, py, size, size);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          // Smooth edge fading into adjacent sections
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      />
    </div>
  );
}
