"use client";

import React, { useEffect, useRef, useCallback } from "react";

// ── Ultra-fast 3D Simplex Noise for Seamless Spherical Continents ──
const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;

const p = new Uint8Array([
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142,
  8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117,
  35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71,
  134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41,
  55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89,
  18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226,
  250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182,
  189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43,
  172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97,
  228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239,
  107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
  138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180
]);

const perm = new Uint8Array(512);
const permMod12x3 = new Uint8Array(512);
for (let i = 0; i < 512; i++) {
  perm[i] = p[i & 255];
  permMod12x3[i] = (perm[i] % 12) * 3;
}

const grad3 = new Float32Array([
  1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0,
  1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1,
  0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1
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
    const gi0 = permMod12x3[ii + perm[jj + perm[kk]]];
    n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
  }

  let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
  if (t1 < 0) n1 = 0.0;
  else {
    t1 *= t1;
    const gi1 = permMod12x3[ii + i1 + perm[jj + j1 + perm[kk + k1]]];
    n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
  }

  let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
  if (t2 < 0) n2 = 0.0;
  else {
    t2 *= t2;
    const gi2 = permMod12x3[ii + i2 + perm[jj + j2 + perm[kk + k2]]];
    n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
  }

  let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
  if (t3 < 0) n3 = 0.0;
  else {
    t3 *= t3;
    const gi3 = permMod12x3[ii + 1 + perm[jj + 1 + perm[kk + 1]]];
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
const COLOR_CLOUD_WHITE = 0xfffafbfc;   // #fcfbfa - bright white cloud tops
const COLOR_CLOUD_SHADOW = 0xffd5c4b4;  // #b4c4d5 - soft shaded cloud underside

// ════════════════════════════════════════════════════════════════════════════
// 🪐 PLANET SIZE & POSITION CONFIGURATION (EDIT HERE TO CONTROL WIDTH/SCALE)
// ════════════════════════════════════════════════════════════════════════════
//
// • PLANET_WIDTH_SCALE:
//   Controls the width / overall size of the planet.
//   - Aspect ratio is 100% locked (always a mathematically perfect circle).
//   - Default: 0.56
//   - Increase (e.g., 0.62, 0.68, 0.75) to make the planet WIDER / BIGGER across the screen.
//   - Decrease (e.g., 0.50, 0.45, 0.40) to make the planet NARROWER / SMALLER.
const PLANET_WIDTH_SCALE = 0.50;

// • PLANET_CREST_TOP:
//   Controls the vertical height of the top crest on initial screen load.
//   - Default: 0.56 (peaks ~56% down the screen, comfortably below the CTA buttons).
//   - Decrease (e.g., 0.50) to move the planet higher up.
//   - Increase (e.g., 0.62) to move the planet lower down.
const PLANET_CREST_TOP = 0.58;
// ════════════════════════════════════════════════════════════════════════════
// Google Maps iconic location pin symbol
const GoogleMapsPinIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      fill="#EA4335"
    />
    <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
  </svg>
);

// 3D Location Marker Coordinates for GNDU on the planet surface
// At MARKER_NY = -0.89, lon = 0, simplex elevation is ~0.46 (solid continental landmass, away from oceans)
// Positioned downwards along the crest so it stays clear of hero text and CTA buttons
const MARKER_NY = -0.82;
const MARKER_LON = 0;
const MARKER_RING_RADIUS = Math.sqrt(Math.max(0, 1 - MARKER_NY * MARKER_NY));
const MARKER_X0 = MARKER_RING_RADIUS * Math.sin(MARKER_LON);
const MARKER_Y0 = MARKER_NY;
const MARKER_Z0 = MARKER_RING_RADIUS * Math.cos(MARKER_LON);

export default function HeroPlanet() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const dragRef = useRef({ isDragging: false, startX: 0, rotOffset: 0, targetRotOffset: 0, dragVelocity: 0 });
  const shockwaveRef = useRef({ active: false, x: 0, y: 0, r: 0, progress: 1 });
  const markerRef = useRef(null);
  const markerBufPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId;
    let baseRotation = 0;
    let cloudRotation = 0;
    let isVisible = true;
    let lastTime = performance.now();

    // 60 FPS Target cap to prevent excessive CPU usage on 120Hz/144Hz/240Hz screens
    const TARGET_FPS = 60;
    const FRAME_DURATION = 1000 / TARGET_FPS;

    // Responsive pixel block size
    const PIXEL_SIZE = 6;

    const bufCanvas = document.createElement("canvas");
    const bufCtx = bufCanvas.getContext("2d", { willReadFrequently: false });
    if (!bufCtx) return;

    let imgData = null;
    let data32 = null;
    let vpH = typeof window !== "undefined" ? window.innerHeight : 800;
    let scaleX = 1;
    let scaleY = 1;

    // Pre-allocated resize handler
    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      const bw = Math.max(60, Math.floor(rect.width / PIXEL_SIZE));
      const bh = Math.max(40, Math.floor(rect.height / PIXEL_SIZE));

      bufCanvas.width = bw;
      bufCanvas.height = bh;

      scaleX = rect.width / bw;
      scaleY = rect.height / bh;

      // Reallocate ImageData only on window resize (0 garbage per frame!)
      imgData = bufCtx.createImageData(bw, bh);
      data32 = new Uint32Array(imgData.data.buffer);
      vpH = window.innerHeight;
    };

    resize();

    // Debounced resize via requestAnimationFrame
    let resizeRaf;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Pause when page is hidden or tab changed
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) lastTime = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Pause RAF when scrolled completely out of viewport
    let observer;
    if (typeof IntersectionObserver !== "undefined" && containerRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting && !document.hidden;
          if (isVisible) lastTime = performance.now();
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    }

    // Main optimized render loop
    const render = (now) => {
      animId = requestAnimationFrame(render);
      if (!isVisible || !imgData || !data32) return;

      const elapsed = now - lastTime;
      if (elapsed < FRAME_DURATION - 1.5) return; // Skip redundant frames on 120-240Hz displays

      // Normalized delta time (1.0 = exactly 60 FPS)
      const dt = Math.min(elapsed / 16.67, 2.0);
      lastTime = now - (elapsed % FRAME_DURATION);

      const bufW = bufCanvas.width;
      const bufH = bufCanvas.height;

      // Smoothly ease the rendered rotation toward the drag target. This filters
      // small pointer/touch jumps without making the planet feel sluggish.
      const drag = dragRef.current;
      const dragEase = 1 - Math.pow(0.72, dt);
      drag.rotOffset += (drag.targetRotOffset - drag.rotOffset) * dragEase;

      if (!drag.isDragging) {
        drag.dragVelocity *= Math.pow(0.94, dt);

        // Precompute whether GNDU is currently behind the globe.
        // When behind, smoothly increase rotation speed to cut down hidden wait time.
        const curRot = baseRotation + drag.rotOffset;
        const curMZ = -MARKER_X0 * Math.sin(curRot) + MARKER_Z0 * Math.cos(curRot);

        let speedMultiplier = 1.0;
        if (curMZ <= 0.05) {
          const backProgress = Math.min(1.0, Math.max(0, (0.05 - curMZ) / (MARKER_RING_RADIUS * 0.6)));
          speedMultiplier = 1.0 + backProgress * 2.2;
        }

        baseRotation += (0.0018 * speedMultiplier + drag.dragVelocity) * dt;
      }

      // Keep the cloud layer moving at a slightly different speed for depth.
      cloudRotation += 0.0022 * dt;

      const totalRotation = baseRotation + drag.rotOffset;

      // Fast hardware-level memory clear for transparent background
      data32.fill(0);

      // Planet geometry
      const vpHBuf = vpH / PIXEL_SIZE;
      const R = Math.floor(Math.max(bufW * PLANET_WIDTH_SCALE, vpHBuf * (PLANET_WIDTH_SCALE * 1.5)));
      const cx = Math.floor(bufW * 0.5);
      const cy = Math.floor(vpHBuf * PLANET_CREST_TOP + R);

      const R2 = R * R;
      const invR = 1.0 / R;
      const rimThreshOuter = (R - 1.2) * (R - 1.2);
      const rimThreshInner = (R - 2.4) * (R - 2.4);

      // Sun lighting direction (angled from top-left)
      const sunX = -0.42;
      const sunY = -0.68;
      const sunZ = 0.6;

      const cosRot = Math.cos(totalRotation);
      const sinRot = Math.sin(totalRotation);

      const cosCloud = Math.cos(cloudRotation);
      const sinCloud = Math.sin(cloudRotation);

      // Shockwave ring update
      const sw = shockwaveRef.current;
      let swActive = false;
      let swRMin2 = 0;
      let swRMax2 = 0;
      if (sw.active) {
        sw.progress = Math.min(1, sw.progress + 0.026 * dt);
        // Ease the expanding ring so it travels quickly at first, then settles.
        sw.r = (1 - Math.pow(1 - sw.progress, 1.35)) * 60;
        if (sw.progress >= 1) {
          sw.active = false;
        } else {
          swActive = true;
          const rMin = Math.max(0, sw.r - 3.2);
          const rMax = sw.r + 3.2;
          swRMin2 = rMin * rMin;
          swRMax2 = rMax * rMax;
        }
      }

      // Bounded row scan: Only iterate over rows that actually contain the planet!
      // (Excludes cy - R to eliminate the single-pixel apex dot at the crest)
      const minPy = Math.max(0, cy - R + 1);
      const maxPy = Math.min(bufH - 1, cy + R - 1);

      for (let py = minPy; py <= maxPy; py++) {
        const dy = py - cy;
        const dy2 = dy * dy;
        const row = py * bufW;
        const ny = dy * invR;

        // Bounded column scan: Calculate exact horizontal sphere span for this row!
        // This eliminates empty loop iterations and distance branching completely.
        const maxDx = Math.floor(Math.sqrt(R2 - dy2));
        const minPx = Math.max(0, cx - maxDx);
        const maxPx = Math.min(bufW - 1, cx + maxDx);

        const swDy2 = swActive ? (py - sw.y) * (py - sw.y) : 0;

        for (let px = minPx; px <= maxPx; px++) {
          const dx = px - cx;
          const dist2 = dx * dx + dy2;

          // Thicker, soft faded-white atmospheric rim along the outer boundary
          if (ny < 0.08) {
            if (dist2 >= rimThreshOuter) {
              data32[row + px] = ny < -0.3 ? 0xaff5f8fb : 0x75d8e8eb;
              continue;
            } else if (dist2 >= rimThreshInner) {
              data32[row + px] = ny < -0.3 ? 0x65e2f0f4 : 0x48c8dde2;
              continue;
            }
          }

          // Normal components in sphere space
          const nx = dx * invR;
          const nz = Math.sqrt(Math.max(0, R2 - dist2)) * invR;

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
            color = cloud > 0.54 && light > 0.45 ? COLOR_CLOUD_WHITE : COLOR_CLOUD_SHADOW;
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

          // Shockwave pulse impact (optimized squared distance without Math.hypot)
          if (swActive) {
            const sdx = px - sw.x;
            const sdist2 = sdx * sdx + swDy2;
            if (sdist2 >= swRMin2 && sdist2 <= swRMax2) {
              // Blend the ripple into the surface and fade it as it expands.
              const strength = 0.72 * (1 - sw.progress);
              const target = COLOR_RIM_LIME;
              const red = (color & 0xff) + (((target & 0xff) - (color & 0xff)) * strength);
              const green = ((color >>> 8) & 0xff) + ((((target >>> 8) & 0xff) - ((color >>> 8) & 0xff)) * strength);
              const blue = ((color >>> 16) & 0xff) + ((((target >>> 16) & 0xff) - ((color >>> 16) & 0xff)) * strength);
              color = (0xff000000 | (Math.round(blue) << 16) | (Math.round(green) << 8) | Math.round(red)) >>> 0;
            }
          }

          data32[row + px] = color;
        }
      }

      bufCtx.putImageData(imgData, 0, 0);

      // Render low-res pixel buffer crisp onto full canvas
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bufCanvas, 0, 0, bufW, bufH, 0, 0, canvas.width, canvas.height);

      // ── 3D Location Marker calculation (GNDU) ──
      const markerEl = markerRef.current;
      if (markerEl) {
        // Rotate along with planet
        const mX = MARKER_X0 * cosRot + MARKER_Z0 * sinRot;
        const mY = MARKER_Y0;
        const mZ = -MARKER_X0 * sinRot + MARKER_Z0 * cosRot;

        if (mZ > -0.04) {
          const mBufX = cx + mX * R;
          const mBufY = cy + mY * R;
          markerBufPosRef.current.x = mBufX;
          markerBufPosRef.current.y = mBufY;

          const screenX = mBufX * scaleX;
          const screenY = mBufY * scaleY;

          // Smooth edge fade as it approaches the planet's horizon
          const alpha = Math.min(1, Math.max(0, (mZ + 0.04) / (MARKER_RING_RADIUS * 0.35)));

          markerEl.style.transform = `translate3d(${screenX}px, ${screenY}px, 0)`;
          markerEl.style.opacity = alpha.toFixed(2);
          markerEl.style.pointerEvents = alpha > 0.4 ? "auto" : "none";
        } else {
          markerEl.style.opacity = "0";
          markerEl.style.pointerEvents = "none";
        }
      }
    };

    render(performance.now());

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (observer) observer.disconnect();
      cancelAnimationFrame(resizeRaf);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Mouse & Touch interactions (smooth cross-platform drag support)
  const handleMouseMove = useCallback((e) => {
    if (dragRef.current.isDragging) {
      const deltaX = e.clientX - dragRef.current.startX;
      dragRef.current.dragVelocity = Math.max(-0.025, Math.min(0.025, deltaX * 0.00018));
      dragRef.current.targetRotOffset += deltaX * 0.006;
      dragRef.current.startX = e.clientX;
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.targetRotOffset = dragRef.current.rotOffset;
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

  const handleMarkerClick = useCallback((e) => {
    e.stopPropagation();
    shockwaveRef.current = {
      active: true,
      x: markerBufPosRef.current.x,
      y: markerBufPosRef.current.y,
      r: 0,
      progress: 0,
    };
  }, []);

  // Touch handlers for mobile devices
  const handleTouchStart = useCallback((e) => {
    if (e.touches && e.touches[0]) {
      dragRef.current.isDragging = true;
      dragRef.current.startX = e.touches[0].clientX;
      dragRef.current.targetRotOffset = dragRef.current.rotOffset;
      dragRef.current.dragVelocity = 0;
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (dragRef.current.isDragging && e.touches && e.touches[0]) {
      const deltaX = e.touches[0].clientX - dragRef.current.startX;
      dragRef.current.dragVelocity = Math.max(-0.025, Math.min(0.025, deltaX * 0.00018));
      dragRef.current.targetRotOffset += deltaX * 0.006;
      dragRef.current.startX = e.touches[0].clientX;
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    dragRef.current.isDragging = false;
    if (e.changedTouches && e.changedTouches[0] && containerRef.current) {
      const touch = e.changedTouches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const px = ((touch.clientX - rect.left) / rect.width) * (rect.width / 6);
      const py = ((touch.clientY - rect.top) / rect.height) * (rect.height / 6);

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
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: "pan-y" }}
    >
      <style>{`
        @keyframes heroPlanetAuraPulse {
          0% { opacity: 0.72; transform: translate3d(-50%, 0, 0) scale(0.96); }
          100% { opacity: 1; transform: translate3d(-50%, -8px, 0) scale(1.04); }
        }
        @keyframes heroPlanetCrownPulse {
          0% { opacity: 0.62; }
          100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-planet-aura, .hero-planet-crown { animation: none !important; }
        }
      `}</style>
      {/* ── Retro Grid Overlay (Light & Dark Compatible) ── */}
      {/* Light mode grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.9) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />
      {/* Dark mode grid */}
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block opacity-[0.11]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Volumetric Radiant Emitting Aura Behind Planet Rim (GPU Hardware Layer) ── */}
      <div
        className="hero-planet-aura absolute top-[30vh] left-1/2 -translate-x-1/2 w-[140vw] max-w-[1450px] h-[55vh] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 45% at 50% 40%, rgba(52, 211, 153, 0.28) 0%, rgba(34, 211, 238, 0.22) 35%, rgba(56, 189, 248, 0.1) 60%, transparent 80%),
            radial-gradient(circle at 50% 38%, rgba(167, 243, 208, 0.26) 0%, transparent 50%)
          `,
          filter: "blur(46px)",
          transform: "translate3d(-50%, 0, 0)",
          willChange: "transform, opacity",
          animation: "heroPlanetAuraPulse 6s ease-in-out infinite alternate",
        }}
      />

      {/* ── Atmospheric Crown Highlight Behind The Crest ── */}
      <div
        className="hero-planet-crown absolute top-[44vh] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1050px] h-[25vh] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 30% at 50% 50%, rgba(110, 231, 183, 0.35) 0%, rgba(6, 182, 212, 0.22) 35%, transparent 70%)
          `,
          filter: "blur(28px)",
          transform: "translate3d(-50%, 0, 0)",
          willChange: "opacity",
          animation: "heroPlanetCrownPulse 4.5s ease-in-out infinite alternate",
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

      {/* ── GNDU Interactive Location Marker ── */}
      <div
        ref={markerRef}
        onClick={handleMarkerClick}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className="absolute top-0 left-0 z-20 pointer-events-auto cursor-pointer transition-opacity duration-150 will-change-transform select-none"
        style={{
          transform: "translate3d(-9999px, -9999px, 0)",
          opacity: 0,
        }}
        title="GNDU — Click to trigger radar pulse"
      >
        <div className="group flex flex-col items-center -translate-x-1/2 -translate-y-full">
          {/* Badge */}
          <div className="mb-1 flex items-center px-2 py-0.5 rounded-full bg-zinc-950/90 dark:bg-zinc-900/90 text-white border border-neutral-700/70 shadow-lg shadow-black/40 backdrop-blur-md transition-all duration-200 group-hover:scale-105">
            <span className="text-[12px] font-mono font-bold tracking-wide uppercase text-neutral-100">
              GNDU
            </span>
          </div>

          {/* Google Maps Location Pin pointing to the planet surface */}
          <div className="relative flex flex-col items-center">
            <GoogleMapsPinIcon className="w-9 h-9 drop-shadow-[0_4px_12px_rgba(234,67,53,0.6)] transition-transform duration-200 group-hover:-translate-y-0.5" />
            <div className="w-2 h-0.5 rounded-full bg-black/60 blur-[0.5px] -mt-0.5" />
          </div>
        </div>
      </div>

      {/* ── Progressive Smooth Bottom Fade Transition (Expanded Height) ── */}
      {/* Light mode smooth fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-64 sm:h-80 md:h-96 lg:h-[400px] pointer-events-none dark:hidden z-10"
        style={{
          background: `linear-gradient(to top, 
            rgba(244, 244, 245, 1) 0%, 
            rgba(244, 244, 245, 0.96) 15%, 
            rgba(244, 244, 245, 0.85) 30%, 
            rgba(244, 244, 245, 0.65) 48%, 
            rgba(244, 244, 245, 0.42) 65%, 
            rgba(244, 244, 245, 0.20) 80%, 
            rgba(244, 244, 245, 0.06) 92%, 
            rgba(244, 244, 245, 0) 100%
          )`,
        }}
      />
      {/* Dark mode smooth fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-64 sm:h-80 md:h-96 lg:h-[400px] pointer-events-none hidden dark:block z-10"
        style={{
          background: `linear-gradient(to top, 
            rgba(5, 5, 5, 1) 0%, 
            rgba(5, 5, 5, 0.96) 15%, 
            rgba(5, 5, 5, 0.85) 30%, 
            rgba(5, 5, 5, 0.65) 48%, 
            rgba(5, 5, 5, 0.42) 65%, 
            rgba(5, 5, 5, 0.20) 80%, 
            rgba(5, 5, 5, 0.06) 92%, 
            rgba(5, 5, 5, 0) 100%
          )`,
        }}
      />
    </div>
  );
}
