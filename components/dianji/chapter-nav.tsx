"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Chapter } from "@/lib/dianji-data";

interface ChapterNavProps {
  chapters: Chapter[];
  currentChapterId: string;
  onChapterSelect: (chapterId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function ChapterNav({
  chapters,
  currentChapterId,
  onChapterSelect,
  isCollapsed,
  onToggleCollapse,
}: ChapterNavProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set([currentChapterId])
  );

  const toggleExpand = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  if (isCollapsed) {
    return (
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 48 }}
        className="shrink-0 border-r border-border bg-card/50 backdrop-blur-sm"
      >
        <div className="flex h-full flex-col items-center py-4">
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title="展开目录"
          >
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="mt-4 flex flex-col items-center gap-2">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => onChapterSelect(chapter.id)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors",
                  currentChapterId === chapter.id
                    ? "bg-cinnabar text-white"
                    : "hover:bg-muted text-muted-foreground"
                )}
                title={chapter.title}
              >
                {chapters.indexOf(chapter) + 1}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 280 }}
      className="shrink-0 border-r border-border bg-card/50 backdrop-blur-sm overflow-hidden"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-cinnabar" />
            <span className="text-sm font-semibold">章节目录</span>
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            title="收起目录"
          >
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <nav className="space-y-0.5 px-2">
            {chapters.map((chapter, index) => {
              const isActive = currentChapterId === chapter.id;
              const isExpanded = expandedChapters.has(chapter.id);

              return (
                <div key={chapter.id}>
                  <button
                    onClick={() => {
                      onChapterSelect(chapter.id);
                      toggleExpand(chapter.id);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      isActive
                        ? "bg-cinnabar/10 text-cinnabar font-medium"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs",
                        isActive
                          ? "bg-cinnabar text-white"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className="truncate">{chapter.title}</span>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-6 border-l border-border pl-3 py-1 space-y-0.5">
                          {chapter.content.map((_, lineIndex) => (
                            <button
                              key={lineIndex}
                              onClick={() => onChapterSelect(chapter.id)}
                              className={cn(
                                "w-full text-left text-xs px-2 py-1 rounded transition-colors truncate",
                                isActive
                                  ? "text-cinnabar/70 hover:bg-cinnabar/5"
                                  : "text-muted-foreground hover:bg-muted"
                              )}
                            >
                              第{lineIndex + 1}段
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.div>
  );
}
