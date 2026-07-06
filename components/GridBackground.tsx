"use client";

import { motion } from "framer-motion";

// Fixed grid intersection points (in % of container) where a glow pulses.
// Tweak/add points to match the density you want.
const GLOW_POINTS = [
  { top: "18%", left: "22%", delay: 0 },
  { top: "62%", left: "12%", delay: 0.8 },
  { top: "30%", left: "68%", delay: 1.6 },
  { top: "75%", left: "58%", delay: 0.4 },
  { top: "48%", left: "85%", delay: 2.2 },
  { top: "10%", left: "50%", delay: 1.2 },
];

export default function GridBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base grid lines — dark mode (purple lines) */}
      <div
        className="absolute inset-0 opacity-[0.05] hidden dark:block"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79,70,229,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,70,229,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Base grid lines — light mode (soft gray lines) */}
      <div
        className="absolute inset-0 opacity-[0.06] block dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(15,15,20,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,15,20,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Pulsing intersection glows — dark mode (purple) */}
      {GLOW_POINTS.map((point, i) => (
        <motion.div
          key={`dark-${i}`}
          className="absolute w-2 h-2 rounded-full bg-brand-400 hidden dark:block"
          style={{
            top: point.top,
            left: point.left,
            boxShadow: "0 0 12px 4px rgba(129,140,248,0.6)",
          }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.4, 0.8] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: point.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Pulsing intersection glows — light mode (neutral dark-gray/black) */}
      {GLOW_POINTS.map((point, i) => (
        <motion.div
          key={`light-${i}`}
          className="absolute w-2 h-2 rounded-full bg-neutral-700 block dark:hidden"
          style={{
            top: point.top,
            left: point.left,
            boxShadow: "0 0 10px 3px rgba(0,0,0,0.25)",
          }}
          animate={{ opacity: [0.1, 0.7, 0.1], scale: [0.8, 1.3, 0.8] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: point.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
