"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QiElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  blur: number;
  color: string;
}

interface FloatingQiProps {
  count?: number;
  className?: string;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
}

export default function FloatingQi({
  count = 15,
  className,
  colors = ["#d4a574", "#e4c9a0", "#c75b39", "#f5f0e8"],
  minSize = 4,
  maxSize = 20,
  minDuration = 8,
  maxDuration = 20,
}: FloatingQiProps) {
  const [elements, setElements] = useState<QiElement[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const newElements: QiElement[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: minSize + Math.random() * (maxSize - minSize),
      duration: minDuration + Math.random() * (maxDuration - minDuration),
      delay: Math.random() * 5,
      opacity: 0.1 + Math.random() * 0.3,
      blur: 1 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setElements(newElements);
  }, [dimensions, count, colors, minSize, maxSize, minDuration, maxDuration]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      style={{ zIndex: 0 }}
    >
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full"
          style={{
            width: element.size,
            height: element.size,
            left: element.x,
            top: element.y,
            background: `radial-gradient(circle, ${element.color} 0%, transparent 70%)`,
            filter: `blur(${element.blur}px)`,
            opacity: element.opacity,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [
              element.opacity,
              element.opacity * 1.5,
              element.opacity * 0.5,
              element.opacity * 1.2,
              element.opacity,
            ],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Floating orb with glow effect
interface FloatingOrbProps {
  className?: string;
  color?: string;
  size?: number;
  duration?: number;
  delay?: number;
}

export function FloatingOrb({
  className,
  color = "#d4a574",
  size = 60,
  duration = 6,
  delay = 0,
}: FloatingOrbProps) {
  return (
    <motion.div
      className={cn("absolute pointer-events-none", className)}
      style={{
        width: size,
        height: size,
      }}
      animate={{
        y: [0, -20, 0, 15, 0],
        x: [0, 10, -8, 5, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}30 0%, ${color}10 40%, transparent 70%)`,
          boxShadow: `0 0 ${size * 0.5}px ${color}20, 0 0 ${size}px ${color}10`,
        }}
      />
    </motion.div>
  );
}

// Floating text character effect
interface FloatingTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  baseDelay?: number;
}

export function FloatingText({
  text,
  className,
  charClassName,
  baseDelay = 0,
}: FloatingTextProps) {
  return (
    <div className={cn("inline-flex", className)}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className={cn("inline-block", charClassName)}
          animate={{
            y: [0, -5, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            delay: baseDelay + index * 0.1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}
