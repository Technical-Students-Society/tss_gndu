"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// ── Ultra-fast 3D Simplex Noise for Seamless Spherical Continents ──
const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;

const p = new Uint8Array([
  151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,
  8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,
  35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,
  134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,
  55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,
  18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,
  250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,
  189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,
  172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,
  228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,
  107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
]);

const perm = new Uint8Array(512);
const permMod12 = new Uint8Array(512);
for (let i = 0; i < 512; i++) {
  perm[i] = p[i & 255];
  permMod12[i] = perm[i] % 12;
}

const grad3 = new Float32Array([
  1,1,0, -1,1,0, 1,-1,0, -1,-1,0,
  1,0,1, -1,0,1, 1,0,-1, -1,0,-1,
  0,1,1, 0,-1,1, 0,1,-1, 0,-1,-1
]);

function simplex3(xin, yin, zin) {
  let n0, n1, n2, n3;
  const s = (xin + yin + zin) * F3;
  const i = Math.floor(xin + s);
  const j = Math.floor(yin + s);
  const k = Math.floor(zin + s);
  const t = (i + j + k) * G3;
  const X0 = i - t;
  const Y0 = j - t;
  const Z0 = k - t;
  const x0 = xin - X0;
  const y0 = yin - Y0;
  const z0 = zin - Z0;

  let i1, j1, k1, i2, j2, k2;
  if (x0 >= y0) {
    if (y0 >= z0) {
      i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0;
    } else if (x0 >= z0) {
      i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1;
    } else {
      i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1;
    }
  } else {
    if (y0 < z0) {
      i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1;
    } else if (x0 < z0) {
      i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1;
    } else {
      i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0;
    }
  }

  const x1 = x0 - i1 + G3;
  const y1 = y0 - j1 + G3;
  const z1 = z0 - k1 + G3;
  const x2 = x0 - i2 + 2.0 * G3;
  const y2 = y0 - j2 + 2.0 * G3;
  const z2 = z0 - k2 + 2.0 * G3;
  const x3 = x0 - 1.0 + 3.0 * G3;
  const y3 = y0 - 1.0 + 3.0 * G3;
  const z3 = z0 - 1.0 + 3.0 * G3;

  const ii = i & 255;
  const jj = j & 255;
  const kk = k & 255;

  let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
  if (t0 < 0) n0 = 0.0;
  else {
    t0 *= t0;
    const gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
    n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
  }

  let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
  if (t1 < 0) n1 = 0.0;
  else {
    t1 *= t1;
    const gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
    n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
  }

  let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
  if (t2 < 0) n2 = 0.0;
  else {
    t2 *= t2;
    const gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
    n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
  }

  let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
  if (t3 < 0) n3 = 0.0;
  else {
    t3 *= t3;
    const gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
    n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
  }

  return 32.0 * (n0 + n1 + n2 + n3);
}

// ── Color Palette (ABGR Format for direct 32-bit pixel array) ──
const COLOR_RIM_CREAM = 0xffdcf0f6; // #f6f0dc - warm ivory sunlit rim
const COLOR_RIM_LIME = 0xffc2eecf;  // #cfeec2 - pale lime atmospheric highlight
const COLOR_RIM_CYAN = 0xffd9c862;  // #62c8d9 - turquoise atmosphere border

// Continents
const COLOR_LAND_LIGHT = 0xff6ece92;   // #92ce6e - bright grass/meadow
const COLOR_LAND_MID = 0xff5ab55c;     // #5cb55a - vibrant continent green
const COLOR_LAND_FOREST = 0xff4d9e4a;  // #4a9e4d - lush forest green
const COLOR_LAND_DEEP = 0xff327f29;    // #297f32 - deep pine green
const COLOR_LAND_DARK = 0xff204e18;    // #184e20 - mountain/shadow green

// Oceans
const COLOR_WATER_SHALLOW = 0xffdcd36e; // #6ed3dc - coastal shallow turquoise
const COLOR_WATER_AQUA = 0xffcfbb4d;    // #4dbbcf - aqua blue shelf
const COLOR_WATER_MID = 0xffa87d2b;     // #2b7da8 - deep sea blue
const COLOR_WATER_DEEP = 0xff704b19;    // #194b70 - marine abyss
const COLOR_WATER_TRENCH = 0xff45290b;  // #0b2945 - deepest ocean trench

// Clouds
const COLOR_CLOUD_WHITE = 0xffffffff;   // #ffffff - brilliant white cloud
const COLOR_CLOUD_SHADOW = 0xffede8db;  // #dbe8ed - cloud shaded rim

export default function HeroPlanet() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const dragRef = useRef({ isDragging: false, startX: 0, rotOffset: 0, dragVelocity: 0 });
  const shockwaveRef = useRef({ active: false, x: 0, y: 0, r: 0, progress: 1 });

  // Floating space pixel boxes from reference image
  const floatingPixels = [
    { top: "28%", left: "6%", size: 16, opacity: 0.65, delay: "0s" },
    { top: "35%", left: "11%", size: 12, opacity: 0.45, delay: "1.4s" },
    { top: "42%", left: "4%", size: 18, opacity: 0.7, delay: "2.2s" },
    { top: "46%", left: "15%", size: 10, opacity: 0.35, delay: "0.7s" },
    { top: "52%", left: "8%", size: 14, opacity: 0.55, delay: "3.3s" },
    { top: "30%", right: "8%", size: 14, opacity: 0.6, delay: "1.8s" },
    { top: "38%", right: "13%", size: 12, opacity: 0.5, delay: "0.4s" },
    { top: "45%", right: "5%", size: 18, opacity: 0.75, delay: "2.6s" },
    { top: "50%", right: "16%", size: 10, opacity: 0.4, delay: "1.1s" },
    { top: "56%", right: "9%", size: 14, opacity: 0.5, delay: "3.7s" },
    { top: "22%", left: "20%", size: 8, opacity: 0.3, delay: "0.9s" },
    { top: "24%", right: "22%", size: 8, opacity: 0.3, delay: "2.4s" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let baseRotation = 0;
    let cloudRotation = 0;

    // Responsive pixel block size (gives true chunky pixel art staircase)
    const PIXEL_SIZE = 6;

    let bufCanvas = document.createElement("canvas");
    let bufCtx = bufCanvas.getContext("2d");

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      bufCanvas.width = Math.max(60, Math.floor(rect.width / PIXEL_SIZE));
      bufCanvas.height = Math.max(40, Math.floor(rect.height / PIXEL_SIZE));
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const bufW = bufCanvas.width;
      const bufH = bufCanvas.height;

      // Mouse smoothing
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Drag inertia and continuous planet rotation
      const drag = dragRef.current;
      if (!drag.isDragging) {
        drag.dragVelocity *= 0.94;
        baseRotation += 0.0018 + drag.dragVelocity;
      }
      cloudRotation += 0.0026;

      const totalRotation = baseRotation + drag.rotOffset;

      // Shockwave ring update
      const sw = shockwaveRef.current;
      if (sw.active) {
        sw.progress += 0.03;
        sw.r = sw.progress * 60;
        if (sw.progress >= 1) sw.active = false;
      }

      // Prepare 32-bit pixel buffer
      const imgData = bufCtx.createImageData(bufW, bufH);
      const data32 = new Uint32Array(imgData.data.buffer);

      // Planet geometry:
      // Half-shown at the bottom of the hero section!
      // Crest peaks around 54-58% of viewport height, matching reference composition
      const R = Math.floor(Math.max(bufW * 0.38, bufH * 0.72));
      const cx = Math.floor(bufW * 0.5 + mouse.x * (bufW * 0.02));
      const cy = Math.floor(bufH * 0.56 + R + mouse.y * (bufH * 0.015));

      const R2 = R * R;
      const rimThreshR2 = (R - 2) * (R - 2);
      const rimThreshR3 = (R - 4) * (R - 4);

      // Sun lighting direction (angled from top-left)
      const sunX = -0.42;
      const sunY = -0.68;
      const sunZ = 0.6;

      const cosRot = Math.cos(totalRotation);
      const sinRot = Math.sin(totalRotation);

      const cosCloud = Math.cos(cloudRotation);
      const sinCloud = Math.sin(cloudRotation);

      for (let py = 0; py < bufH; py++) {
        const dy = py - cy;
        const dy2 = dy * dy;
        const row = py * bufW;

        for (let px = 0; px < bufW; px++) {
          const dx = px - cx;
          const dist2 = dx * dx + dy2;

          // Check if pixel is within the planet sphere
          if (dist2 <= R2) {
            // Normal components in sphere space
            const nx = dx / R;
            const ny = dy / R;
            const nz = Math.sqrt(Math.max(0, 1.0 - nx * nx - ny * ny));

            // Atmospheric sunlit rim (stepped pixel edge highlight matching reference)
            if (dist2 >= rimThreshR2 && ny < 0.1) {
              if (ny < -0.45) {
                data32[row + px] = COLOR_RIM_CREAM;
              } else if (ny < -0.2) {
                data32[row + px] = COLOR_RIM_LIME;
              } else {
                data32[row + px] = COLOR_RIM_CYAN;
              }
              continue;
            }

            // Secondary atmosphere blend ring
            if (dist2 >= rimThreshR3 && ny < -0.6) {
              data32[row + px] = COLOR_RIM_LIME;
              continue;
            }

            // Direct 3D spherical rotation for continents (ZERO pole stretching)
            const rx = nx * cosRot - nz * sinRot;
            const ry = ny;
            const rz = nx * sinRot + nz * cosRot;

            // Continents elevation via multi-octave 3D simplex noise
            let elev = 0;
            elev += simplex3(rx * 1.6, ry * 1.6, rz * 1.6) * 0.58;
            elev += simplex3(rx * 3.4 + 1.2, ry * 3.4, rz * 3.4 + 1.2) * 0.28;
            elev += simplex3(rx * 7.0 + 3.4, ry * 7.0, rz * 7.0 + 3.4) * 0.14;

            // Clouds sampling
            const cx3 = nx * cosCloud - nz * sinCloud;
            const cy3 = ny;
            const cz3 = nx * sinCloud + nz * cosCloud;
            let cloud = 0;
            cloud += simplex3(cx3 * 2.1 + 8.1, cy3 * 2.1, cz3 * 2.1 + 8.1) * 0.65;
            cloud += simplex3(cx3 * 4.5 + 14.2, cy3 * 4.5, cz3 * 4.5 + 14.2) * 0.35;

            // Sun diffuse lighting
            const light = Math.max(0.2, nx * sunX + ny * sunY + nz * sunZ);

            let color;

            // Cloud layer
            if (cloud > 0.42 && elev > -0.2) {
              if (cloud > 0.54 && light > 0.45) {
                color = COLOR_CLOUD_WHITE;
              } else {
                color = COLOR_CLOUD_SHADOW;
              }
            } else if (elev > 0.04) {
              // LANDMASS
              if (elev > 0.42) {
                color = light > 0.45 ? COLOR_LAND_LIGHT : COLOR_LAND_MID;
              } else if (elev > 0.24) {
                color = light > 0.4 ? COLOR_LAND_MID : COLOR_LAND_FOREST;
              } else if (elev > 0.12) {
                color = light > 0.35 ? COLOR_LAND_FOREST : COLOR_LAND_DEEP;
              } else {
                color = light > 0.3 ? COLOR_LAND_DEEP : COLOR_LAND_DARK;
              }
            } else {
              // OCEANS
              if (elev > -0.05) {
                color = light > 0.35 ? COLOR_WATER_SHALLOW : COLOR_WATER_AQUA;
              } else if (elev > -0.18) {
                color = light > 0.4 ? COLOR_WATER_AQUA : COLOR_WATER_MID;
              } else if (elev > -0.35) {
                color = light > 0.3 ? COLOR_WATER_MID : COLOR_WATER_DEEP;
              } else {
                color = COLOR_WATER_TRENCH;
              }
            }

            // Shockwave pulse impact
            if (sw.active) {
              const swDist = Math.hypot(px - sw.x, py - sw.y);
              const diff = Math.abs(swDist - sw.r);
              if (diff < 3.2) {
                color = COLOR_RIM_LIME;
              }
            }

            data32[row + px] = color;
          } else {
            // Space background: transparent (cyber grid shines through)
            data32[row + px] = 0x00000000;
          }
        }
      }

      bufCtx.putImageData(imgData, 0, 0);

      // Render low-res pixel buffer crisp onto full canvas
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bufCanvas, 0, 0, bufW, bufH, 0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Mouse & Touch interactions
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    mouseRef.current.targetX = nx;
    mouseRef.current.targetY = ny;

    if (dragRef.current.isDragging) {
      const deltaX = e.clientX - dragRef.current.startX;
      dragRef.current.dragVelocity = deltaX * 0.0004;
      dragRef.current.rotOffset += deltaX * 0.006;
      dragRef.current.startX = e.clientX;
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.dragVelocity = 0;
  }, []);

  const handleMouseUp = useCallback((e) => {
    dragRef.current.isDragging = false;

    // Trigger expanding shockwave ripple on planet
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * (rect.width / 6);
      const py = ((e.clientY - rect.top) / rect.height) * (rect.height / 6);

      shockwaveRef.current = {
        active: true,
        x: px,
        y: py,
        r: 0,
        progress: 0,
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        dragRef.current.isDragging = false;
        mouseRef.current.targetX = 0;
        mouseRef.current.targetY = 0;
      }}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto cursor-grab active:cursor-grabbing select-none"
    >
      {/* ── Retro Sci-Fi Grid Overlay (Matching Reference) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.14] dark:opacity-[0.11]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Retro Cyber Terminal Badges (Matching Reference Top Header) ── */}
      <div className="absolute top-24 left-0 w-full px-6 md:px-14 pointer-events-none flex justify-between items-center text-[10px] md:text-xs font-mono tracking-widest uppercase">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          <span className="text-emerald-400 font-semibold tracking-wider">COMMUNITY + + +</span>
        </div>
        <div className="hidden lg:flex flex-col items-end text-[9px] text-zinc-500 font-mono tracking-wider space-y-0.5">
          <span className="text-zinc-400 font-medium">TSS GNDU // NODE.01</span>
          <span className="text-zinc-600">ORBIT 31.6340° N, 74.8723° E</span>
        </div>
      </div>

      {/* ── Floating Dark Space Debris Pixels (From Reference Image) ── */}
      {floatingPixels.map((item, i) => (
        <div
          key={i}
          className="absolute bg-zinc-800/80 dark:bg-zinc-900/90 border border-white/5 pointer-events-none"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            width: `${item.size}px`,
            height: `${item.size}px`,
            opacity: item.opacity,
            boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
            animation: "floatDebris 6s ease-in-out infinite alternate",
            animationDelay: item.delay,
          }}
        />
      ))}

      {/* ── Volumetric Radiant Emitting Aura Behind Planet Rim ── */}
      <div
        className="absolute top-[38%] left-1/2 -translate-x-1/2 w-[120vw] max-w-[1200px] h-[55vh] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 45% at 50% 40%, rgba(74, 222, 128, 0.28) 0%, rgba(34, 211, 238, 0.2) 35%, rgba(56, 189, 248, 0.08) 60%, transparent 80%),
            radial-gradient(circle at 50% 38%, rgba(167, 243, 208, 0.25) 0%, transparent 50%)
          `,
          filter: "blur(46px)",
          animation: "auraPulsate 5s ease-in-out infinite alternate",
        }}
      />

      {/* ── Intense Atmospheric Crown Highlight Behind The Crest ── */}
      <div
        className="absolute top-[48%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[800px] h-[25vh] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 30% at 50% 50%, rgba(134, 239, 172, 0.38) 0%, rgba(6, 182, 212, 0.25) 35%, transparent 70%)
          `,
          filter: "blur(28px)",
        }}
      />

      {/* ── Pixel Planet Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{
          imageRendering: "pixelated",
        }}
      />

      {/* ── Subtle Bottom Transition Fade ── */}
      <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 pointer-events-none bg-gradient-to-t from-[#06080e] dark:from-siteblack via-[#06080e]/50 dark:via-siteblack/50 to-transparent" />

      {/* ── Animations ── */}
      <style jsx>{`
        @keyframes auraPulsate {
          0% {
            transform: translate(-50%, 0) scale(0.97);
            opacity: 0.82;
          }
          100% {
            transform: translate(-50%, -8px) scale(1.04);
            opacity: 1;
          }
        }
        @keyframes floatDebris {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(-16px);
          }
        }
      `}</style>
    </div>
  );
}
