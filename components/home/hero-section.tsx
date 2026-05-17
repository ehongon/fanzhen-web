"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ParticleBackground from "@/components/effects/particle-background";
import TypingEffect from "@/components/effects/typing-effect";

// Qi flow canvas background
function QiFlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const drawQiFlow = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      time += 0.005;

      // Draw flowing qi lines
      for (let i = 0; i < 8; i++) {
        const yOffset = (rect.height / 8) * i + 50;
        const amplitude = 30 + i * 5;
        const frequency = 0.003 + i * 0.001;
        const speed = time * (0.5 + i * 0.1);

        ctx.beginPath();
        ctx.moveTo(0, yOffset);

        for (let x = 0; x < rect.width; x += 2) {
          const y =
            yOffset +
            Math.sin(x * frequency + speed) * amplitude +
            Math.sin(x * frequency * 0.5 + speed * 1.5) * (amplitude * 0.5);
          ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, yOffset - amplitude, 0, yOffset + amplitude);
        gradient.addColorStop(0, "rgba(212, 165, 116, 0)");
        gradient.addColorStop(0.5, `rgba(212, 165, 116, ${0.03 + i * 0.005})`);
        gradient.addColorStop(1, "rgba(212, 165, 116, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw floating qi particles
      for (let i = 0; i < 20; i++) {
        const x = ((time * 30 + i * 100) % (rect.width + 100)) - 50;
        const y =
          rect.height * 0.3 +
          Math.sin(time * 2 + i * 0.8) * rect.height * 0.2 +
          Math.cos(time * 1.5 + i * 1.2) * 50;
        const size = 1 + Math.sin(time + i) * 0.5;
        const opacity = 0.1 + Math.sin(time * 3 + i * 2) * 0.05;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 165, 116, ${opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(drawQiFlow);
    };

    drawQiFlow();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// Glowing title text component
function GlowingTitle({ text, color }: { text: string; color: string }) {
  return (
    <motion.span
      className="relative inline-block"
      animate={{
        textShadow: [
          `0 0 10px ${color}40, 0 0 20px ${color}30, 0 0 30px ${color}20`,
          `0 0 20px ${color}60, 0 0 40px ${color}40, 0 0 60px ${color}30`,
          `0 0 10px ${color}40, 0 0 20px ${color}30, 0 0 30px ${color}20`,
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.span>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-ink">
      {/* SVG Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/hero-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* Qi flow canvas background */}
      <QiFlowCanvas />

      {/* Particle animation */}
      <ParticleBackground
        particleCount={150}
        speed={0.2}
        color="212, 165, 116"
        connectionDistance={80}
        opacity={0.7}
      />

      {/* Decorative circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl"
        style={{ zIndex: 1 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cinnabar/5 blur-3xl"
        style={{ zIndex: 1 }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.05, 0.07, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main Title with glow effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif-cn font-bold tracking-wider">
            <GlowingTitle text="凡" color="#d4a574" />
            <GlowingTitle text="真" color="#f5f0e8" />
          </h1>
        </motion.div>

        {/* Subtitle with typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-rice/80 font-serif-cn tracking-[0.2em] sm:tracking-[0.3em]">
            <TypingEffect
              text="凡人之躯，真人之道"
              speed={120}
              delay={1200}
              cursorClassName="bg-gold"
            />
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-xs sm:text-sm md:text-base text-rice/50 max-w-lg mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
        >
          融合传统修炼智慧与现代科学方法，
          <br className="hidden sm:block" />
          为你指引一条清晰的修行之路
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(199, 91, 57, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 bg-cinnabar hover:bg-cinnabar-light text-rice rounded-full text-sm font-medium transition-colors duration-300 shadow-lg shadow-cinnabar/30 min-h-[44px]"
          >
            开始修炼
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 165, 116, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 border border-gold/40 text-gold hover:bg-gold/10 rounded-full text-sm font-medium transition-colors duration-300 min-h-[44px]"
          >
            探索体系
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator with bounce animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          className="flex flex-col items-center text-rice/40 cursor-pointer"
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ color: "rgba(212, 165, 116, 0.7)" }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
        >
          <span className="text-xs tracking-widest mb-2">向下探索</span>
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(212, 165, 116, 0)",
                "0 0 10px rgba(212, 165, 116, 0.3)",
                "0 0 0px rgba(212, 165, 116, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-full p-1"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
