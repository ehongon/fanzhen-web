"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView, Variants } from "framer-motion";

// Animation variant types
type AnimationVariant = "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "fadeIn";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
  threshold?: number;
  variant?: AnimationVariant;
  scale?: number;
}

// Framer Motion variants
const getVariants = (variant: AnimationVariant, distance: number, scale: number): Variants => {
  const variants: Record<AnimationVariant, Variants> = {
    fadeInUp: {
      hidden: { opacity: 0, y: distance },
      visible: { opacity: 1, y: 0 },
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -distance },
      visible: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -distance },
      visible: { opacity: 1, x: 0 },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: distance },
      visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: scale },
      visible: { opacity: 1, scale: 1 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  };

  return variants[variant];
};

// Legacy CSS-based ScrollReveal
export default function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 600,
  direction = "up",
  distance = 30,
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, threshold]);

  const getTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "left":
        return `translateX(${distance}px)`;
      case "right":
        return `translateX(-${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0)" : getTransform(),
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// Framer Motion based ScrollReveal with more animation variants
interface MotionScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: AnimationVariant;
  distance?: number;
  scale?: number;
  once?: boolean;
  threshold?: number;
  amount?: "some" | "all" | number;
}

export function MotionScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  variant = "fadeInUp",
  distance = 30,
  scale = 0.9,
  once = true,
  amount = 0.3,
}: MotionScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const variants = getVariants(variant, distance, scale);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Batch reveal for multiple items with stagger effect
interface BatchRevealProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  baseDelay?: number;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
}

export function BatchReveal({
  children,
  className,
  itemClassName,
  baseDelay = 0,
  staggerDelay = 100,
  direction = "up",
  distance = 30,
  duration = 600,
}: BatchRevealProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollReveal
          key={index}
          className={itemClassName}
          delay={baseDelay + index * staggerDelay}
          duration={duration}
          direction={direction}
          distance={distance}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}

// Staggered children reveal using Framer Motion
interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
  variant?: AnimationVariant;
  distance?: number;
  scale?: number;
  once?: boolean;
  amount?: "some" | "all" | number;
}

export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.1,
  baseDelay = 0,
  duration = 0.5,
  variant = "fadeInUp",
  distance = 30,
  scale = 0.9,
  once = true,
  amount = 0.3,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseDelay,
      },
    },
  };

  const itemVariants = getVariants(variant, distance, scale);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants} transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}>
              {child}
            </motion.div>
          ))
        : (
            <motion.div variants={itemVariants} transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}>
              {children}
            </motion.div>
          )}
    </motion.div>
  );
}

// Parallax scroll effect
interface ParallaxRevealProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export function ParallaxReveal({
  children,
  className,
  speed = 0.5,
  direction = "up",
}: ParallaxRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      const multiplier = direction === "up" ? -1 : 1;
      setOffset(scrolled * speed * multiplier * 0.01);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

// Text reveal with character stagger
interface TextRevealProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
}

export function TextReveal({
  text,
  className,
  charClassName,
  delay = 0,
  staggerDelay = 0.03,
  duration = 0.5,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex flex-wrap", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          className={cn(char === " " ? "w-[0.3em]" : "", charClassName)}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
