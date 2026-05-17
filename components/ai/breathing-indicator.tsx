"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BreathingIndicatorProps {
  className?: string;
}

export function BreathingIndicator({ className }: BreathingIndicatorProps) {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="relative flex items-center justify-center w-10 h-10">
        {/* Outer ring */}
        <motion.div
          className="absolute w-10 h-10 rounded-full border border-cinnabar/30"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Middle ring */}
        <motion.div
          className="absolute w-7 h-7 rounded-full bg-cinnabar/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
        {/* Inner dot */}
        <motion.div
          className="relative w-4 h-4 rounded-full bg-cinnabar"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
          style={{
            boxShadow: "0 0 8px rgba(199, 91, 57, 0.5)",
          }}
        />
        {/* Pulse ring */}
        <motion.div
          className="absolute w-10 h-10 rounded-full border border-cinnabar/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-rice/70">思考中</span>
        <motion.span
          className="text-xs text-rice/40"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          正在凝聚真气...
        </motion.span>
      </div>
    </div>
  );
}
