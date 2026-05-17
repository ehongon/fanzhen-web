"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
  onComplete?: () => void;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
}

export default function TypingEffect({
  text,
  speed = 100,
  delay = 0,
  className,
  cursorClassName,
  showCursor = true,
  onComplete,
  as: Component = "span",
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <Component className={cn("inline", className)}>
      {displayedText}
      {showCursor && started && !isComplete && (
        <span
          className={cn(
            "inline-block w-[2px] h-[1em] bg-gold ml-0.5 animate-pulse align-middle",
            cursorClassName
          )}
        />
      )}
      {showCursor && isComplete && (
        <span
          className={cn(
            "inline-block w-[2px] h-[1em] bg-gold/50 ml-0.5 animate-pulse align-middle",
            cursorClassName
          )}
        />
      )}
    </Component>
  );
}

// Multi-line typing effect
interface MultiLineTypingProps {
  lines: string[];
  speed?: number;
  lineDelay?: number;
  delay?: number;
  className?: string;
  lineClassName?: string;
  cursorClassName?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export function MultiLineTyping({
  lines,
  speed = 100,
  lineDelay = 500,
  delay = 0,
  className,
  lineClassName,
  cursorClassName,
  showCursor = true,
  onComplete,
}: MultiLineTypingProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleLineComplete = useCallback(() => {
    if (currentLine < lines.length - 1) {
      setCompletedLines((prev) => [...prev, lines[currentLine]]);
      setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, lineDelay);
    } else {
      setCompletedLines((prev) => [...prev, lines[currentLine]]);
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentLine, lines, lineDelay, onComplete]);

  return (
    <div className={className}>
      {completedLines.map((line, index) => (
        <div key={index} className={lineClassName}>
          {line}
        </div>
      ))}
      {!isComplete && currentLine < lines.length && (
        <div className={lineClassName}>
          <TypingEffect
            text={lines[currentLine]}
            speed={speed}
            delay={currentLine === 0 ? delay : 0}
            showCursor={showCursor}
            cursorClassName={cursorClassName}
            onComplete={handleLineComplete}
          />
        </div>
      )}
    </div>
  );
}
