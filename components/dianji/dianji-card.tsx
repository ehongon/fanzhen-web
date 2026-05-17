"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookMarked, GraduationCap, Bookmark, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Dianji } from "@/lib/dianji-data";

interface DianjiCardProps {
  dianji: Dianji;
  index: number;
}

const stageColorMap: Record<string, string> = {
  炼形化精: "bg-emerald-50 text-emerald-700 border-emerald-200",
  炼精化气: "bg-amber-50 text-amber-700 border-amber-200",
  炼气化神: "bg-violet-50 text-violet-700 border-violet-200",
  炼神返虚: "bg-rose-50 text-rose-700 border-rose-200",
  全阶段: "bg-cinnabar/10 text-cinnabar border-cinnabar/20",
};

const difficultyConfig: Record<string, { color: string; icon: null }> = {
  入门: { color: "text-emerald-600 bg-emerald-50", icon: null },
  进阶: { color: "text-amber-600 bg-amber-50", icon: null },
  深入: { color: "text-rose-600 bg-rose-50", icon: null },
};

const readingConfig: Record<string, { color: string; icon: typeof Bookmark | null }> = {
  必读: { color: "bg-cinnabar text-white", icon: Bookmark },
  选读: { color: "bg-blue-600 text-white", icon: Sparkles },
  参考: { color: "bg-muted text-muted-foreground", icon: GraduationCap },
  深入: { color: "bg-violet-600 text-white", icon: BookMarked },
};

export default function DianjiCard({ dianji, index }: DianjiCardProps) {
  const readingStyle = readingConfig[dianji.readingAdvice];
  const ReadingIcon = readingStyle.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <Link href={`/dianji/${dianji.id}`}>
        <div
          className={cn(
            "group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5",
            "transition-all duration-300 hover:shadow-lg hover:shadow-black/8 hover:-translate-y-1"
          )}
        >
          {/* Top Row: Code + Badges */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {dianji.code}
            </span>
            <Badge
              variant="outline"
              className={cn(
                "text-xs font-medium",
                stageColorMap[dianji.stage] || "bg-muted text-muted-foreground"
              )}
            >
              {dianji.stage}
            </Badge>
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium",
                readingStyle.color
              )}
            >
              {ReadingIcon && <ReadingIcon className="h-3 w-3" />}
              {dianji.readingAdvice}
            </span>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium",
                difficultyConfig[dianji.difficulty].color
              )}
            >
              {dianji.difficulty}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-cinnabar/10 transition-colors">
              <BookMarked className="h-7 w-7 text-muted-foreground/60 group-hover:text-cinnabar transition-colors" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-foreground group-hover:text-cinnabar transition-colors truncate">
                {dianji.title}
              </h3>

              <p className="mt-0.5 text-sm text-muted-foreground">
                {dianji.author}
              </p>

              <p className="mt-2 text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
                {dianji.summary}
              </p>

              {/* Core Points Preview */}
              {dianji.corePoints.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {dianji.corePoints.slice(0, 2).map((point, i) => (
                    <span
                      key={i}
                      className="inline-block text-xs bg-gold/10 text-gold-dark px-2 py-0.5 rounded truncate max-w-[200px]"
                    >
                      {point}
                    </span>
                  ))}
                  {dianji.corePoints.length > 2 && (
                    <span className="text-xs text-muted-foreground px-1">
                      +{dianji.corePoints.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
