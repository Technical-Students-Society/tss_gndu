import React from 'react';
import { Users } from "lucide-react";
import SplitText from '@/app/Animations/SplitText';

// ── High-Clarity Monochromatic Pixel Art Illustrations (32x32 Fine Grid, 0ms load) ──
function PixelIllustration({ title }) {
  const normalized = (title || "").toLowerCase();

  switch (normalized) {
    case "technical":
      // 32x32 Fine Pixel Code Terminal & Window
      return (
        <svg viewBox="0 0 32 32" className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 drop-shadow-md" style={{ shapeRendering: "crispEdges" }}>
          {/* Window Frame / Bezel */}
          <rect x="4" y="5" width="24" height="18" fill="currentColor" fillOpacity="0.12" />
          <rect x="4" y="4" width="24" height="1" fill="currentColor" fillOpacity="0.95" />
          <rect x="4" y="22" width="24" height="1" fill="currentColor" fillOpacity="0.95" />
          <rect x="3" y="5" width="1" height="17" fill="currentColor" fillOpacity="0.95" />
          <rect x="28" y="5" width="1" height="17" fill="currentColor" fillOpacity="0.95" />
          {/* Title Bar */}
          <rect x="4" y="5" width="24" height="3" fill="currentColor" fillOpacity="0.25" />
          <rect x="4" y="8" width="24" height="1" fill="currentColor" fillOpacity="0.8" />
          {/* Title Bar Window Dots */}
          <rect x="5" y="6" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="7" y="6" width="1" height="1" fill="currentColor" fillOpacity="0.8" />
          <rect x="9" y="6" width="1" height="1" fill="currentColor" fillOpacity="0.6" />
          {/* Stand */}
          <rect x="14" y="23" width="4" height="3" fill="currentColor" fillOpacity="0.75" />
          <rect x="10" y="26" width="12" height="1" fill="currentColor" fillOpacity="0.95" />
          {/* Code: '<' */}
          <rect x="7" y="12" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="6" y="13" width="1" height="2" fill="currentColor" fillOpacity="1" />
          <rect x="7" y="15" width="1" height="1" fill="currentColor" fillOpacity="1" />
          {/* Code: '/' */}
          <rect x="12" y="11" width="1" height="2" fill="currentColor" fillOpacity="0.7" />
          <rect x="11" y="13" width="1" height="2" fill="currentColor" fillOpacity="0.7" />
          <rect x="10" y="15" width="1" height="2" fill="currentColor" fillOpacity="0.7" />
          {/* Code: '>' */}
          <rect x="15" y="12" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="16" y="13" width="1" height="2" fill="currentColor" fillOpacity="1" />
          <rect x="15" y="15" width="1" height="1" fill="currentColor" fillOpacity="1" />
          {/* Code line blocks */}
          <rect x="19" y="12" width="5" height="1" fill="currentColor" fillOpacity="0.5" />
          <rect x="19" y="15" width="3" height="1" fill="currentColor" fillOpacity="0.5" />
          {/* Cursor Prompt */}
          <rect x="6" y="18" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="7" y="19" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="9" y="19" width="3" height="1" fill="currentColor" fillOpacity="1" />
          {/* Floating cyber debris */}
          <rect x="1" y="3" width="1" height="1" fill="currentColor" fillOpacity="0.5" />
          <rect x="30" y="6" width="1" height="1" fill="currentColor" fillOpacity="0.6" />
          <rect x="29" y="24" width="1" height="1" fill="currentColor" fillOpacity="0.4" />
        </svg>
      );

    case "sports":
      // 32x32 Fine Pixel Victory Trophy
      return (
        <svg viewBox="0 0 32 32" className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 drop-shadow-md" style={{ shapeRendering: "crispEdges" }}>
          {/* Cup Rim */}
          <rect x="10" y="5" width="12" height="2" fill="currentColor" fillOpacity="0.95" />
          <rect x="11" y="5" width="3" height="1" fill="currentColor" fillOpacity="1" />
          {/* Cup Bowl */}
          <rect x="9" y="7" width="14" height="8" fill="currentColor" fillOpacity="0.75" />
          <rect x="10" y="7" width="4" height="7" fill="currentColor" fillOpacity="1" />
          <rect x="10" y="15" width="12" height="2" fill="currentColor" fillOpacity="0.6" />
          <rect x="12" y="17" width="8" height="2" fill="currentColor" fillOpacity="0.5" />
          <rect x="14" y="19" width="4" height="1" fill="currentColor" fillOpacity="0.4" />
          {/* Handles */}
          <rect x="6" y="7" width="3" height="1" fill="currentColor" fillOpacity="0.9" />
          <rect x="5" y="8" width="1" height="5" fill="currentColor" fillOpacity="0.9" />
          <rect x="6" y="13" width="3" height="1" fill="currentColor" fillOpacity="0.6" />
          <rect x="23" y="7" width="3" height="1" fill="currentColor" fillOpacity="0.9" />
          <rect x="26" y="8" width="1" height="5" fill="currentColor" fillOpacity="0.9" />
          <rect x="23" y="13" width="3" height="1" fill="currentColor" fillOpacity="0.6" />
          {/* Stem & Pedestal Base */}
          <rect x="15" y="20" width="2" height="3" fill="currentColor" fillOpacity="0.75" />
          <rect x="12" y="23" width="8" height="2" fill="currentColor" fillOpacity="0.45" />
          <rect x="10" y="25" width="12" height="2" fill="currentColor" fillOpacity="0.95" />
          {/* Star Emblem on Cup */}
          <rect x="15" y="9" width="2" height="4" fill="currentColor" fillOpacity="1" />
          <rect x="14" y="10" width="4" height="2" fill="currentColor" fillOpacity="1" />
          {/* Sparkles */}
          <rect x="4" y="4" width="1" height="1" fill="currentColor" fillOpacity="0.7" />
          <rect x="27" y="3" width="1" height="1" fill="currentColor" fillOpacity="0.7" />
          <rect x="3" y="18" width="1" height="1" fill="currentColor" fillOpacity="0.4" />
          <rect x="28" y="17" width="1" height="1" fill="currentColor" fillOpacity="0.5" />
        </svg>
      );

    case "placement":
      // 32x32 Fine Pixel Career Rocket Launching to the Stars
      return (
        <svg viewBox="0 0 32 32" className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 drop-shadow-md" style={{ shapeRendering: "crispEdges" }}>
          {/* Nosecone */}
          <rect x="15" y="3" width="2" height="2" fill="currentColor" fillOpacity="1" />
          <rect x="14" y="5" width="4" height="2" fill="currentColor" fillOpacity="0.9" />
          <rect x="13" y="7" width="6" height="2" fill="currentColor" fillOpacity="0.85" />
          {/* Fuselage Body */}
          <rect x="12" y="9" width="8" height="10" fill="currentColor" fillOpacity="0.7" />
          <rect x="12" y="9" width="3" height="10" fill="currentColor" fillOpacity="1" />
          {/* Porthole Window */}
          <rect x="14" y="11" width="4" height="4" fill="currentColor" fillOpacity="0.3" />
          <rect x="15" y="12" width="2" height="2" fill="currentColor" fillOpacity="1" />
          {/* Side Thruster Fins */}
          <rect x="9" y="14" width="3" height="6" fill="currentColor" fillOpacity="0.6" />
          <rect x="8" y="17" width="1" height="4" fill="currentColor" fillOpacity="0.45" />
          <rect x="20" y="14" width="3" height="6" fill="currentColor" fillOpacity="0.6" />
          <rect x="23" y="17" width="1" height="4" fill="currentColor" fillOpacity="0.45" />
          {/* Nozzle */}
          <rect x="13" y="19" width="6" height="2" fill="currentColor" fillOpacity="0.5" />
          {/* Exhaust Flame Particles */}
          <rect x="14" y="21" width="4" height="3" fill="currentColor" fillOpacity="0.9" />
          <rect x="15" y="21" width="2" height="2" fill="currentColor" fillOpacity="1" />
          <rect x="15" y="24" width="2" height="4" fill="currentColor" fillOpacity="0.65" />
          <rect x="13" y="25" width="1" height="2" fill="currentColor" fillOpacity="0.4" />
          <rect x="18" y="25" width="1" height="2" fill="currentColor" fillOpacity="0.4" />
          {/* Orbiting Stars */}
          <rect x="5" y="7" width="1" height="1" fill="currentColor" fillOpacity="0.7" />
          <rect x="26" y="6" width="1" height="1" fill="currentColor" fillOpacity="0.7" />
          <rect x="4" y="16" width="1" height="1" fill="currentColor" fillOpacity="0.4" />
          <rect x="27" y="14" width="1" height="1" fill="currentColor" fillOpacity="0.5" />
        </svg>
      );

    case "cultural":
      // 32x32 Fine Pixel Studio DJ Over-Ear Headphones (Clean centered, central cluttered part removed)
      return (
        <svg viewBox="0 0 32 32" className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 drop-shadow-md" style={{ shapeRendering: "crispEdges" }}>
          {/* Headband Outer Cushion Arc */}
          <rect x="11" y="6" width="10" height="2" fill="currentColor" fillOpacity="0.95" />
          <rect x="8" y="7" width="3" height="2" fill="currentColor" fillOpacity="0.9" />
          <rect x="21" y="7" width="3" height="2" fill="currentColor" fillOpacity="0.9" />
          <rect x="6" y="9" width="2" height="4" fill="currentColor" fillOpacity="0.85" />
          <rect x="24" y="9" width="2" height="4" fill="currentColor" fillOpacity="0.85" />

          {/* Headband Inner Padding */}
          <rect x="10" y="8" width="12" height="1" fill="currentColor" fillOpacity="0.5" />
          <rect x="8" y="9" width="2" height="1" fill="currentColor" fillOpacity="0.5" />
          <rect x="22" y="9" width="2" height="1" fill="currentColor" fillOpacity="0.5" />

          {/* Metal Slider Extenders */}
          <rect x="5" y="13" width="2" height="4" fill="currentColor" fillOpacity="0.45" />
          <rect x="25" y="13" width="2" height="4" fill="currentColor" fillOpacity="0.45" />

          {/* Left Earcup Assembly */}
          <rect x="3" y="16" width="6" height="11" fill="currentColor" fillOpacity="0.3" />
          <rect x="3" y="17" width="2" height="9" fill="currentColor" fillOpacity="0.85" />
          <rect x="4" y="16" width="4" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="4" y="26" width="4" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="5" y="17" width="3" height="9" fill="currentColor" fillOpacity="0.95" />
          <rect x="6" y="18" width="2" height="7" fill="currentColor" fillOpacity="0.6" />
          <rect x="7" y="19" width="1" height="5" fill="currentColor" fillOpacity="1" />

          {/* Right Earcup Assembly */}
          <rect x="23" y="16" width="6" height="11" fill="currentColor" fillOpacity="0.3" />
          <rect x="27" y="17" width="2" height="9" fill="currentColor" fillOpacity="0.85" />
          <rect x="24" y="16" width="4" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="24" y="26" width="4" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="24" y="17" width="3" height="9" fill="currentColor" fillOpacity="0.95" />
          <rect x="24" y="18" width="2" height="7" fill="currentColor" fillOpacity="0.6" />
          <rect x="24" y="19" width="1" height="5" fill="currentColor" fillOpacity="1" />

          {/* Clean ambient audio sparkles */}
          <rect x="1" y="20" width="1" height="3" fill="currentColor" fillOpacity="0.45" />
          <rect x="30" y="20" width="1" height="3" fill="currentColor" fillOpacity="0.45" />
          <rect x="2" y="12" width="1" height="1" fill="currentColor" fillOpacity="0.4" />
          <rect x="29" y="12" width="1" height="1" fill="currentColor" fillOpacity="0.4" />
          <rect x="15" y="3" width="2" height="1" fill="currentColor" fillOpacity="0.65" />
        </svg>
      );

    case "alumni":
      // 32x32 Fine Pixel Graduation Cap (Centered, bottom scroll removed as requested)
      return (
        <svg viewBox="0 0 32 32" className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 drop-shadow-md" style={{ shapeRendering: "crispEdges" }}>
          {/* Mortarboard Diamond Top */}
          <rect x="15" y="8" width="2" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="11" y="9" width="10" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="7" y="10" width="18" height="2" fill="currentColor" fillOpacity="0.85" />
          <rect x="4" y="12" width="24" height="1" fill="currentColor" fillOpacity="0.7" />
          <rect x="7" y="13" width="18" height="1" fill="currentColor" fillOpacity="0.55" />
          <rect x="11" y="14" width="10" height="1" fill="currentColor" fillOpacity="0.4" />
          {/* Skullcap Base */}
          <rect x="9" y="15" width="14" height="5" fill="currentColor" fillOpacity="0.3" />
          <rect x="11" y="20" width="10" height="1" fill="currentColor" fillOpacity="0.5" />
          {/* Tassel Button & Hanging Cord */}
          <rect x="15" y="9" width="2" height="2" fill="currentColor" fillOpacity="1" />
          <rect x="18" y="11" width="1" height="3" fill="currentColor" fillOpacity="0.8" />
          <rect x="19" y="14" width="1" height="3" fill="currentColor" fillOpacity="0.65" />
          <rect x="19" y="17" width="2" height="4" fill="currentColor" fillOpacity="0.95" />
          {/* Ambient Sparkles */}
          <rect x="3" y="9" width="1" height="1" fill="currentColor" fillOpacity="0.6" />
          <rect x="28" y="8" width="1" height="1" fill="currentColor" fillOpacity="0.6" />
          <rect x="15" y="24" width="2" height="1" fill="currentColor" fillOpacity="0.6" />
          <rect x="12" y="4" width="1" height="1" fill="currentColor" fillOpacity="0.4" />
          <rect x="20" y="4" width="1" height="1" fill="currentColor" fillOpacity="0.5" />
        </svg>
      );

    case "sponsorship":
      // 32x32 Clear Pixel Banknote / Stack of Cash (Unmistakable money as requested)
      return (
        <svg viewBox="0 0 32 32" className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 drop-shadow-md" style={{ shapeRendering: "crispEdges" }}>
          {/* Stacked bill behind */}
          <rect x="6" y="7" width="22" height="2" fill="currentColor" fillOpacity="0.45" />
          <rect x="27" y="9" width="2" height="10" fill="currentColor" fillOpacity="0.4" />

          {/* Front Banknote Body */}
          <rect x="3" y="9" width="23" height="14" fill="currentColor" fillOpacity="0.18" />

          {/* Banknote Outer Border */}
          <rect x="3" y="9" width="23" height="1" fill="currentColor" fillOpacity="0.95" />
          <rect x="3" y="22" width="23" height="1" fill="currentColor" fillOpacity="0.95" />
          <rect x="3" y="10" width="1" height="12" fill="currentColor" fillOpacity="0.95" />
          <rect x="25" y="10" width="1" height="12" fill="currentColor" fillOpacity="0.95" />

          {/* Inner Decorative Border */}
          <rect x="5" y="11" width="19" height="1" fill="currentColor" fillOpacity="0.45" />
          <rect x="5" y="20" width="19" height="1" fill="currentColor" fillOpacity="0.45" />
          <rect x="5" y="12" width="1" height="8" fill="currentColor" fillOpacity="0.45" />
          <rect x="23" y="12" width="1" height="8" fill="currentColor" fillOpacity="0.45" />

          {/* Four Corner '$' Marks */}
          {/* Top-Left */}
          <rect x="6" y="12" width="2" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="6" y="13" width="1" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="7" y="14" width="1" height="1" fill="currentColor" fillOpacity="0.85" />
          {/* Top-Right */}
          <rect x="21" y="12" width="2" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="21" y="13" width="1" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="22" y="14" width="1" height="1" fill="currentColor" fillOpacity="0.85" />
          {/* Bottom-Left */}
          <rect x="6" y="17" width="2" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="6" y="18" width="1" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="7" y="19" width="1" height="1" fill="currentColor" fillOpacity="0.85" />
          {/* Bottom-Right */}
          <rect x="21" y="17" width="2" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="21" y="18" width="1" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="22" y="19" width="1" height="1" fill="currentColor" fillOpacity="0.85" />

          {/* Center Oval Seal */}
          <rect x="11" y="12" width="7" height="8" fill="currentColor" fillOpacity="0.25" />
          <rect x="12" y="12" width="5" height="1" fill="currentColor" fillOpacity="0.75" />
          <rect x="12" y="19" width="5" height="1" fill="currentColor" fillOpacity="0.75" />
          <rect x="11" y="13" width="1" height="6" fill="currentColor" fillOpacity="0.75" />
          <rect x="17" y="13" width="1" height="6" fill="currentColor" fillOpacity="0.75" />

          {/* Center Clear Bold '$' Symbol */}
          <rect x="13" y="14" width="3" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="13" y="15" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="13" y="16" width="3" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="15" y="17" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="13" y="18" width="3" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="14" y="13" width="1" height="7" fill="currentColor" fillOpacity="1" />

          {/* Sparkles */}
          <rect x="2" y="6" width="1" height="1" fill="currentColor" fillOpacity="0.6" />
          <rect x="29" y="4" width="1" height="1" fill="currentColor" fillOpacity="0.6" />
          <rect x="28" y="20" width="1" height="1" fill="currentColor" fillOpacity="0.4" />
        </svg>
      );

    case "content & media":
      // 32x32 Fine Pixel Pro DSLR Camera
      return (
        <svg viewBox="0 0 32 32" className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 drop-shadow-md" style={{ shapeRendering: "crispEdges" }}>
          {/* Viewfinder Prism Peak */}
          <rect x="13" y="6" width="6" height="3" fill="currentColor" fillOpacity="0.9" />
          <rect x="14" y="5" width="4" height="1" fill="currentColor" fillOpacity="0.75" />

          {/* Top Dials & Shutter Button */}
          <rect x="6" y="7" width="4" height="2" fill="currentColor" fillOpacity="0.65" />
          <rect x="22" y="7" width="4" height="2" fill="currentColor" fillOpacity="0.85" />
          <rect x="23" y="6" width="2" height="1" fill="currentColor" fillOpacity="1" />

          {/* Main Camera Body */}
          <rect x="4" y="9" width="24" height="16" fill="currentColor" fillOpacity="0.2" />
          {/* Body Outlines */}
          <rect x="5" y="9" width="22" height="1" fill="currentColor" fillOpacity="0.95" />
          <rect x="5" y="24" width="22" height="1" fill="currentColor" fillOpacity="0.95" />
          <rect x="4" y="10" width="1" height="14" fill="currentColor" fillOpacity="0.95" />
          <rect x="27" y="10" width="1" height="14" fill="currentColor" fillOpacity="0.95" />

          {/* Textured Handgrip (Right side) */}
          <rect x="22" y="10" width="4" height="14" fill="currentColor" fillOpacity="0.45" />
          <rect x="23" y="12" width="2" height="1" fill="currentColor" fillOpacity="0.75" />
          <rect x="23" y="15" width="2" height="1" fill="currentColor" fillOpacity="0.75" />
          <rect x="23" y="18" width="2" height="1" fill="currentColor" fillOpacity="0.75" />
          <rect x="23" y="21" width="2" height="1" fill="currentColor" fillOpacity="0.75" />

          {/* Lens Outer Ring */}
          <rect x="10" y="11" width="12" height="12" fill="currentColor" fillOpacity="0.35" />
          <rect x="12" y="10" width="8" height="1" fill="currentColor" fillOpacity="0.9" />
          <rect x="12" y="23" width="8" height="1" fill="currentColor" fillOpacity="0.9" />
          <rect x="9" y="13" width="1" height="8" fill="currentColor" fillOpacity="0.9" />
          <rect x="22" y="13" width="1" height="8" fill="currentColor" fillOpacity="0.9" />

          {/* Lens Aperture & Inner Ring */}
          <rect x="11" y="12" width="10" height="10" fill="currentColor" fillOpacity="0.55" />
          <rect x="12" y="13" width="8" height="8" fill="currentColor" fillOpacity="0.1" />

          {/* Lens Center Glass with Specular Glare */}
          <rect x="13" y="14" width="6" height="6" fill="currentColor" fillOpacity="0.85" />
          <rect x="14" y="15" width="2" height="2" fill="currentColor" fillOpacity="1" />
          <rect x="17" y="18" width="1" height="1" fill="currentColor" fillOpacity="1" />

          {/* Assist / Tally Lamp */}
          <rect x="7" y="11" width="2" height="2" fill="currentColor" fillOpacity="1" />

          {/* Ambient Flash Sparkles */}
          <rect x="2" y="6" width="1" height="1" fill="currentColor" fillOpacity="0.6" />
          <rect x="28" y="5" width="1" height="1" fill="currentColor" fillOpacity="0.6" />
          <rect x="29" y="12" width="1" height="1" fill="currentColor" fillOpacity="0.4" />
        </svg>
      );

    case "design":
      // 32x32 Canonical Pixel Arrow Cursor & Creative Palette Swatches
      return (
        <svg viewBox="0 0 32 32" className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 drop-shadow-md" style={{ shapeRendering: "crispEdges" }}>
          {/* ── Canonical OS Pixel Arrow Cursor ── */}
          {/* Left Vertical Spine Outline */}
          <rect x="6" y="5" width="1" height="16" fill="currentColor" fillOpacity="1" />

          {/* Angled Hypotenuse Outline */}
          <rect x="7" y="6" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="8" y="7" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="9" y="8" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="10" y="9" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="11" y="10" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="12" y="11" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="13" y="12" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="14" y="13" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="15" y="14" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="16" y="15" width="1" height="1" fill="currentColor" fillOpacity="1" />

          {/* Horizontal Barb Notch Outline */}
          <rect x="12" y="16" width="6" height="1" fill="currentColor" fillOpacity="1" />

          {/* Barb Diagonal Return Outline */}
          <rect x="9" y="17" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="8" y="18" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="7" y="19" width="1" height="1" fill="currentColor" fillOpacity="1" />

          {/* Cursor Head Luminous Inner Fill */}
          <rect x="7" y="7" width="1" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="7" y="8" width="2" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="7" y="9" width="3" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="7" y="10" width="4" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="7" y="11" width="5" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="7" y="12" width="6" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="7" y="13" width="7" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="7" y="14" width="8" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="7" y="15" width="9" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="7" y="16" width="5" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="7" y="17" width="2" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="7" y="18" width="1" height="1" fill="currentColor" fillOpacity="0.85" />

          {/* Cursor Tail Outline */}
          <rect x="12" y="17" width="1" height="1" fill="currentColor" fillOpacity="1" />
          <rect x="10" y="18" width="1" height="2" fill="currentColor" fillOpacity="1" />
          <rect x="13" y="18" width="1" height="2" fill="currentColor" fillOpacity="1" />
          <rect x="11" y="20" width="1" height="2" fill="currentColor" fillOpacity="1" />
          <rect x="14" y="20" width="1" height="2" fill="currentColor" fillOpacity="1" />
          <rect x="12" y="22" width="3" height="1" fill="currentColor" fillOpacity="1" />

          {/* Cursor Tail Inner Core Fill */}
          <rect x="10" y="17" width="2" height="1" fill="currentColor" fillOpacity="0.85" />
          <rect x="11" y="18" width="2" height="2" fill="currentColor" fillOpacity="0.85" />
          <rect x="12" y="20" width="2" height="2" fill="currentColor" fillOpacity="0.85" />

          {/* ── Creative Design Swatch Tiles & Sparkles ── */}
          {/* Cascading palette chips */}
          <rect x="22" y="5" width="3" height="3" fill="currentColor" fillOpacity="1" />
          <rect x="26" y="8" width="3" height="3" fill="currentColor" fillOpacity="0.75" />
          <rect x="25" y="14" width="3" height="3" fill="currentColor" fillOpacity="0.55" />
          <rect x="22" y="19" width="3" height="3" fill="currentColor" fillOpacity="0.35" />

          {/* Creative sparkle star ✦ on top-right */}
          <rect x="23" y="1" width="1" height="3" fill="currentColor" fillOpacity="0.8" />
          <rect x="22" y="2" width="3" height="1" fill="currentColor" fillOpacity="0.8" />

          {/* Ambient pixels */}
          <rect x="2" y="10" width="1" height="1" fill="currentColor" fillOpacity="0.45" />
          <rect x="3" y="23" width="2" height="2" fill="currentColor" fillOpacity="0.35" />
        </svg>
      );

    default:
      return null;
  }
}

const teamCategories = [
  {
    title: 'Technical',
    description: 'Hackathons, workshops, and the infrastructure behind every TSS event.',
    textColor: 'text-white',
    bgClass: 'bg-center',
    backgroundurl: '/images/gradientBase12.jpg',
    illustration: '/images/illustrations/technical2.png'
  },
  {
    title: 'Sports',
    description: 'Organizes inter-college sports events and builds athletic excellence.',
    textColor: 'dark:text-white text-white',
    bgClass: 'bg-top',
    backgroundurl: '/images/gradientBas.jpg',
    illustration: '/images/illustrations/sports2.png'
  },
  {
    title: 'Placement',
    description: 'Connects students with recruiters & prepares them for their career.',
    textColor: 'text-white',
    bgClass: 'bg-top',
    backgroundurl: '/images/gradientBase4.jpg',
    illustration: '/images/illustrations/placement.png'
  },
  {
    title: 'Cultural',
    description: 'Fests, performances, and everything that makes campus life memorable.',
    textColor: 'text-black',
    bgClass: 'bg-left',
    backgroundurl: '/images/gradientBase11.jpg',
    illustration: '/images/illustrations/cultural.png'
  },
  {
    title: 'Alumni',
    description: 'Bridges alumni with current students through mentorship and networks.',
    textColor: 'dark:text-white text-white',
    bgClass: 'bg-bottom',
    backgroundurl: '/images/gradientBas3.jpg',
    illustration: '/images/illustrations/almuni.png'
  },
  {
    title: 'Sponsorship',
    description: 'Secures partnerships and funds that keep TSS events running at full scale.',
    textColor: 'text-black',
    bgClass: 'bg-top',
    backgroundurl: '/images/gradientBase11.jpg',
    illustration: '/images/illustrations/sponsorship2.png'
  },
  {
    title: 'Content & Media',
    description: 'Documents, shoots, and tells the story of TSS across every channel.',
    textColor: 'text-white',
    bgClass: 'bg-[center_right]',
    backgroundurl: '/images/gradientBase12.jpg',
    illustration: '/images/illustrations/content2.png'
  },
  {
    title: 'Design',
    description: 'Crafts the visual identity of TSS from event creatives to the digital experience.',
    textColor: 'text-white dark:text-white',
    bgClass: 'bg-center',
    backgroundurl: '/images/gradientBas.jpg',
    illustration: '/images/illustrations/design2.png'
  },
];

const marquee = [...teamCategories, ...teamCategories];

export default function HomeTeamSectionSimple() {
  return (
    <section className="w-full py-32 dark:bg-siteblack overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 lg:px-20">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <p className="text-xs flex gap-2 items-center font-medium uppercase text-neutral-700 dark:text-neutral-400 mb-3">
              <Users size={16} />
              Our teams
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 max-w-md leading-tight">
              <SplitText
                text="Our Core Team Divisions"
                delay={25}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                showCallback={false}
                textAlign="start"
              />
            </h2>
          </div>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 max-w-xs leading-relaxed md:text-right">
            Specialized teams working in sync — each driving a different dimension of student life at GNDU.
          </p>
        </div>

        {/* Cards grid */}
        <div className="flex flex-row h-72 sm:h-80 lg:h-90 gap-4 sm:gap-6 slide-animation">
          {marquee.map((category, index) => (
            <div
              key={`${category.title}-${index}`}
              className="group relative flex flex-col justify-between rounded-2xl bg-neutral-900 border border-neutral-400 dark:border-neutral-800 p-4 sm:p-7 hover:-translate-y-0.5 transition-all duration-300 w-64 h-72 sm:w-72 sm:h-80 lg:w-80 lg:h-90 overflow-hidden shadow-lg shadow-neutral-200/50 dark:shadow-none shrink-0"
            >
              {/* Background Image */}
              <div
                className={`absolute inset-0 bg-cover ${category.bgClass} transition-transform duration-700 group-hover:scale-110`}
                style={{ backgroundImage: `url(${category.backgroundurl})` }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/5 dark:bg-black/30" />

              {/* Title at top */}
              <div className={`relative z-20 ${category.textColor}`}>
                <h3 className="text-lg sm:text-2xl uppercase font-bold font-openai">
                  {category.title}
                </h3>
              </div>

              {/* ── Minimal Monochromatic Pixelated Illustration Centered (Matches Hero Pixel Art) ── */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className={`transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 ${category.textColor}`}>
                  <PixelIllustration title={category.title} />
                </div>
              </div>

              {/* Illustration centered in card */}
              {/* {category.illustration && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-36 h-36 sm:w-40 sm:h-40 lg:w-52 lg:h-52 group-hover:scale-105 transition-all duration-500">
                    <img
                      src={category.illustration}
                      alt=""
                      className="w-full h-full object-contain"
                      loading='lazy'
                    />
                  </div>
                </div>
              )} */}

              {/* Description pinned to bottom */}
              <div className={`relative z-20 ${category.textColor}`}>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}