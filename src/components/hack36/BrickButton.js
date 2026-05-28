import React from "react";
import { BsCursorFill } from "react-icons/bs";

export default function BrickButton({ href = "#", text, children, size = "lg", className = "" }) {
  const content = text || children;

  const sizeClasses = size === "sm"
    ? "px-6 py-2.5 text-xs md:text-sm"
    : size === "responsive"
      ? "px-6 py-2.5 text-xs md:px-14 md:py-5 md:text-2xl"
      : "px-8 md:px-14 py-5 text-lg md:text-2xl";

  const dotClasses = size === "sm"
    ? "w-1.5 h-1.5"
    : size === "responsive"
      ? "w-1.5 h-1.5 md:w-3 md:h-3"
      : "w-3 h-3";

  const dotOffsets = size === "sm"
    ? { top: "top-1.5", bottom: "bottom-1.5", left: "left-1.5", right: "right-1.5" }
    : size === "responsive"
      ? { top: "top-1.5 md:top-3", bottom: "bottom-1.5 md:bottom-3", left: "left-1.5 md:left-3", right: "right-1.5 md:right-3" }
      : { top: "top-3", bottom: "bottom-3", left: "left-3", right: "right-3" };

  return (
    <a
      href={href}
      className={`relative inline-flex rounded-lg items-center justify-center gap-4 hover:bg-purple-500 hover:text-purple-900 uppercase font-sohne font-black tracking-wider no-underline bg-purple-600 text-purple-200 transition-colors shadow-2xl ${sizeClasses} ${className}`}
    >
      <span className={`absolute ${dotOffsets.top} ${dotOffsets.right} ${dotClasses} bg-purple-950/50 rounded-full`}></span>
      <span className={`absolute ${dotOffsets.top} ${dotOffsets.left} ${dotClasses} bg-purple-950/50 rounded-full`}></span>
      <span className={`absolute ${dotOffsets.bottom} ${dotOffsets.right} ${dotClasses} bg-purple-950/50 rounded-full`}></span>
      <span className={`absolute ${dotOffsets.bottom} ${dotOffsets.left} ${dotClasses} bg-purple-950/50 rounded-full`}></span>
      {content}
      <BsCursorFill className="w-3 h-3 -mt-1/2 -ml-1" />
    </a>
  );
}
