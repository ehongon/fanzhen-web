"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  angle: number;
  angleSpeed: number;
  amplitude: number;
  frequency: number;
  baseY: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  speed?: number;
  color?: string;
  connectionDistance?: number;
  className?: string;
  opacity?: number;
}

export default function ParticleBackground({
  particleCount = 150,
  speed = 0.3,
  color = "212, 165, 116",
  connectionDistance = 80,
  className,
  opacity = 1,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const timeRef = useRef(0);

  const createParticle = useCallback(
    (canvas: HTMLCanvasElement): Particle => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x,
        y,
        baseY: y,
        vx: (Math.random() - 0.5) * speed * 0.5,
        vy: (Math.random() - 0.5) * speed * 0.3 - 0.05,
        size: Math.random() * 2.5 + 0.8,
        opacity: Math.random() * 0.4 + 0.3,
        life: 0,
        maxLife: Math.random() * 400 + 300,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02,
        amplitude: Math.random() * 30 + 10,
        frequency: Math.random() * 0.01 + 0.005,
      };
    },
    [speed]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas));
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      timeRef.current += 1;

      particlesRef.current.forEach((particle, index) => {
        const time = timeRef.current;

        // Mouse interaction - attraction force
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 && dist > 5) {
            const force = (200 - dist) / 200;
            particle.vx += (dx / dist) * force * 0.03;
            particle.vy += (dy / dist) * force * 0.03;
          }
        }

        // Sine wave movement for "Qi" flow feeling
        particle.angle += particle.angleSpeed;
        const sineOffset = Math.sin(time * particle.frequency + particle.angle) * particle.amplitude;
        
        particle.x += particle.vx;
        particle.y = particle.baseY + sineOffset * 0.5;
        particle.baseY += particle.vy;
        particle.life++;

        // Damping
        particle.vx *= 0.998;
        particle.vy *= 0.998;

        // Wrap around edges
        if (particle.x < -10) particle.x = rect.width + 10;
        if (particle.x > rect.width + 10) particle.x = -10;
        if (particle.baseY < -10) particle.baseY = rect.height + 10;
        if (particle.baseY > rect.height + 10) particle.baseY = -10;

        // Reset if life exceeded
        if (particle.life > particle.maxLife) {
          particlesRef.current[index] = createParticle(canvas);
          return;
        }

        // Fade in and out
        const lifeRatio = particle.life / particle.maxLife;
        const fadeIn = Math.min(lifeRatio * 5, 1);
        const fadeOut = Math.min((1 - lifeRatio) * 5, 1);
        const currentOpacity = particle.opacity * Math.min(fadeIn, fadeOut) * opacity;

        // Gold foil gradient colors
        const goldColors = [
          { r: 212, g: 165, b: 116 }, // #d4a574
          { r: 228, g: 201, b: 160 }, // #e4c9a0
        ];
        const colorMix = (Math.sin(time * 0.01 + index) + 1) / 2;
        const r = Math.round(goldColors[0].r + (goldColors[1].r - goldColors[0].r) * colorMix);
        const g = Math.round(goldColors[0].g + (goldColors[1].g - goldColors[0].g) * colorMix);
        const b = Math.round(goldColors[0].b + (goldColors[1].b - goldColors[0].b) * colorMix);

        // Glow effect with shadowBlur
        ctx.save();
        ctx.shadowBlur = particle.size * 4;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.5})`;

        // Draw particle with gradient
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity})`);
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.4})`);
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.1})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 235, 200, ${currentOpacity * 1.2})`;
        ctx.fill();

        ctx.restore();
      });

      // Draw connections between nearby particles
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const connectionOpacity = (1 - dist / connectionDistance) * 0.08 * opacity;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 165, 116, ${connectionOpacity})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [particleCount, speed, color, connectionDistance, opacity, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-auto", className)}
      style={{ zIndex: 1 }}
    />
  );
}
