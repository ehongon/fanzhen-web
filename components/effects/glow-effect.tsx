"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowEffectProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowIntensity?: number;
  pulse?: boolean;
  pulseDuration?: number;
  hover?: boolean;
}

export default function GlowEffect({
  children,
  className,
  glowColor = "rgba(212, 165, 116, 0.4)",
  glowIntensity = 20,
  pulse = false,
  pulseDuration = 2,
  hover = false,
}: GlowEffectProps) {
  const boxShadow = `0 0 ${glowIntensity}px ${glowColor}, 0 0 ${glowIntensity * 2}px ${glowColor.replace(
    /[\d.]+\)$/,
    "0.2)"
  )}`;

  return (
    <div
      className={cn(
        "relative",
        pulse && "animate-pulse-glow",
        hover && "transition-shadow duration-500 hover:shadow-glow-gold",
        className
      )}
      style={{
        boxShadow: pulse ? undefined : boxShadow,
        animationDuration: pulse ? `${pulseDuration}s` : undefined,
      }}
    >
      {children}
    </div>
  );
}

// Text glow effect
interface TextGlowProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowIntensity?: number;
  pulse?: boolean;
}

export function TextGlow({
  children,
  className,
  glowColor = "rgba(212, 165, 116, 0.6)",
  glowIntensity = 10,
  pulse = false,
}: TextGlowProps) {
  return (
    <span
      className={cn(pulse && "animate-pulse", className)}
      style={{
        textShadow: `0 0 ${glowIntensity}px ${glowColor}, 0 0 ${glowIntensity * 2}px ${glowColor.replace(
          /[\d.]+\)$/,
          "0.3)"
        )}`,
      }}
    >
      {children}
    </span>
  );
}

// Border glow effect
interface BorderGlowProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
  glowColor?: string;
  glowIntensity?: number;
  borderWidth?: number;
  rounded?: string;
}

export function BorderGlow({
  children,
  className,
  borderColor = "rgba(212, 165, 116, 0.3)",
  glowColor = "rgba(212, 165, 116, 0.2)",
  glowIntensity = 15,
  borderWidth = 1,
  rounded = "rounded-xl",
}: BorderGlowProps) {
  return (
    <div
      className={cn("relative", rounded, className)}
      style={{
        border: `${borderWidth}px solid ${borderColor}`,
        boxShadow: `inset 0 0 ${glowIntensity}px ${glowColor}, 0 0 ${glowIntensity}px ${glowColor}`,
      }}
    >
      {children}
    </div>
  );
}
