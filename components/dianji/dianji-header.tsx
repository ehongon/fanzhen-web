"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  GraduationCap,
  Layers,
  Sparkles,
  Target,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Dianji, Category } from "@/lib/dianji-data";

interface DianjiHeaderProps {
  dianji: Dianji;
  category?: Category;
}

const stageColorMap: Record<string, string> = {
  炼形化精: "bg-emerald-50 text-emerald-700 border-emerald-200",
  炼精化气: "bg-amber-50 text-amber-700 border-amber-200",
  炼气化神: "bg-violet-50 text-violet-700 border-violet-200",
  炼神返虚: "bg-rose-50 text-rose-700 border-rose-200",
  全阶段: "bg-cinnabar/10 text-cinnabar border-cinnabar/20",
};

const difficultyConfig: Record<string, { color: string; label: string }> = {
  入门: { color: "text-emerald-600 bg-emerald-50 border-emerald-200", label: "入门" },
  进阶: { color: "text-amber-600 bg-amber-50 border-amber-200", label: "进阶" },
  深入: { color: "text-rose-600 bg-rose-50 border-rose-200", label: "深入" },
};

const readingConfig: Record<string, { color: string; icon: typeof Bookmark; label: string }> = {
  必读: { color: "bg-cinnabar text-white", icon: Bookmark, label: "必读" },
  选读: { color: "bg-blue-600 text-white", icon: Sparkles, label: "选读" },
  参考: { color: "bg-slate-500 text-white", icon: GraduationCap, label: "参考" },
  深入: { color: "bg-violet-600 text-white", icon: BookOpen, label: "深入" },
};

export default function DianjiHeader({ dianji, category }: DianjiHeaderProps) {
  const readingStyle = readingConfig[dianji.readingAdvice];
  const ReadingIcon = readingStyle.icon;
  const diffStyle = difficultyConfig[dianji.difficulty];

  return (
    <div className="relative overflow-hidden bg-ink-gradient">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gold/30 rounded-full" />
        <div className="absolute bottom-5 right-20 w-48 h-48 border border-gold/20 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-rice/60 mb-6"
        >
          <Link
            href="/dianji"
            className="flex items-center gap-1 hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            典籍文献
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-rice/40">{dianji.title}</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Top Meta */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="text-xs font-mono text-gold bg-gold/10 px-2 py-0.5 rounded">
              {dianji.code}
            </span>
            {category && (
              <span className="text-xs text-rice/60 bg-white/10 px-2 py-0.5 rounded flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {category.name}
              </span>
            )}
            <Badge
              variant="outline"
              className={cn(
                "text-xs font-medium",
                stageColorMap[dianji.stage] || "bg-muted text-muted-foreground"
              )}
            >
              <Layers className="h-3 w-3 mr-1" />
              {dianji.stage}
            </Badge>
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium",
                readingStyle.color
              )}
            >
              <ReadingIcon className="h-3 w-3" />
              {readingStyle.label}
            </span>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium border",
                diffStyle.color
              )}
            >
              <GraduationCap className="h-3 w-3 inline mr-1" />
              {diffStyle.label}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif-cn font-bold text-rice mb-3">
            {dianji.title}
          </h1>

          {/* Author */}
          <p className="text-lg text-rice/70 mb-6">
            {dianji.author}
          </p>

          {/* Summary */}
          <p className="text-rice/60 leading-relaxed max-w-3xl mb-8">
            {dianji.summary}
          </p>

          {/* Core Points */}
          <div className="rounded-xl border border-gold/30 bg-gold/5 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-gold" />
              <h3 className="text-sm font-semibold text-gold">
                核心印证点
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dianji.corePoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.3, duration: 0.4 }}
                  className="flex items-start gap-2"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cinnabar/20 text-cinnabar text-xs font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-rice/80 leading-relaxed">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
