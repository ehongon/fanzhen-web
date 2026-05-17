"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingBorderProps {
  children: ReactNode;
  className?: string;
  color?: string;
  glowIntensity?: number;
  pulse?: boolean;
  pulseDuration?: number;
  borderWidth?: number;
  borderRadius?: string;
  hover?: boolean;
  hoverScale?: number;
}

export default function GlowingBorder({
  children,
  className,
  color = "#d4a574",
  glowIntensity = 15,
  pulse = true,
  pulseDuration = 3,
  borderWidth = 1,
  borderRadius = "rounded-xl",
  hover = true,
  hoverScale = 1.02,
}: GlowingBorderProps) {
  const glowColor = color;
  const glowColorTransparent = `${color}20`;
  const glowColorMedium = `${color}40`;

  return (
    <motion.div
      className={cn("relative", borderRadius, className)}
      whileHover={
        hover
          ? {
              scale: hoverScale,
            }
          : undefined
      }
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect layer */}
      {pulse && (
        <motion.div
          className={cn("absolute -inset-[1px]", borderRadius)}
          style={{
            background: `linear-gradient(90deg, ${glowColorTransparent}, ${glowColorMedium}, ${glowColorTransparent})`,
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% 0%", "-200% 0%"],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: pulseDuration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Inner border */}
      <div
        className={cn(
          "relative h-full w-full",
          borderRadius
        )}
        style={{
          border: `${borderWidth}px solid ${glowColor}30`,
          boxShadow: `
            inset 0 0 ${glowIntensity}px ${glowColorTransparent},
            0 0 ${glowIntensity}px ${glowColorTransparent},
            0 0 ${glowIntensity * 2}px ${glowColorTransparent}
          `,
        }}
      >
        {children}
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2"
        style={{
          borderColor: glowColor,
          borderTopLeftRadius: "inherit",
          opacity: 0.6,
        }}
      />
      <div
        className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2"
        style={{
          borderColor: glowColor,
          borderTopRightRadius: "inherit",
          opacity: 0.6,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2"
        style={{
          borderColor: glowColor,
          borderBottomLeftRadius: "inherit",
          opacity: 0.6,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2"
        style={{
          borderColor: glowColor,
          borderBottomRightRadius: "inherit",
          opacity: 0.6,
        }}
      />
    </motion.div>
  );
}

// Animated gradient border
interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  duration?: number;
  borderWidth?: number;
  borderRadius?: string;
}

export function GradientBorder({
  children,
  className,
  colors = ["#d4a574", "#c75b39", "#8b6fae", "#d4a574"],
  duration = 4,
  borderWidth = 2,
  borderRadius = "rounded-xl",
}: GradientBorderProps) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <div className={cn("relative p-[2px]", borderRadius, className)}>
      {/* Animated gradient background */}
      <motion.div
        className={cn("absolute inset-0", borderRadius)}
        style={{
          background: gradient,
          backgroundSize: "300% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner content */}
      <div
        className={cn(
          "relative h-full w-full bg-ink-light",
          borderRadius
        )}
        style={{
          margin: `${borderWidth}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Pulsing glow container
interface PulsingGlowProps {
  children: ReactNode;
  className?: string;
  color?: string;
  intensity?: number;
  duration?: number;
  borderRadius?: string;
}

export function PulsingGlow({
  children,
  className,
  color = "#d4a574",
  intensity = 20,
  duration = 2,
  borderRadius = "rounded-xl",
}: PulsingGlowProps) {
  return (
    <motion.div
      className={cn("relative", borderRadius, className)}
      animate={{
        boxShadow: [
          `0 0 ${intensity * 0.5}px ${color}20`,
          `0 0 ${intensity}px ${color}40`,
          `0 0 ${intensity * 0.5}px ${color}20`,
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Neon border effect
interface NeonBorderProps {
  children: ReactNode;
  className?: string;
  color?: string;
  flicker?: boolean;
  borderWidth?: number;
  borderRadius?: string;
}

export function NeonBorder({
  children,
  className,
  color = "#d4a574",
  flicker = true,
  borderWidth = 1,
  borderRadius = "rounded-xl",
}: NeonBorderProps) {
  return (
    <motion.div
      className={cn("relative", borderRadius, className)}
      style={{
        border: `${borderWidth}px solid ${color}`,
        boxShadow: `
          0 0 5px ${color}40,
          0 0 10px ${color}30,
          inset 0 0 5px ${color}20
        `,
      }}
      animate={
        flicker
          ? {
              opacity: [1, 0.95, 1, 0.98, 1],
              boxShadow: [
                `0 0 5px ${color}40, 0 0 10px ${color}30, inset 0 0 5px ${color}20`,
                `0 0 8px ${color}50, 0 0 15px ${color}40, inset 0 0 8px ${color}30`,
                `0 0 5px ${color}40, 0 0 10px ${color}30, inset 0 0 5px ${color}20`,
                `0 0 6px ${color}45, 0 0 12px ${color}35, inset 0 0 6px ${color}25`,
                `0 0 5px ${color}40, 0 0 10px ${color}30, inset 0 0 5px ${color}20`,
              ],
            }
          : undefined
      }
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
