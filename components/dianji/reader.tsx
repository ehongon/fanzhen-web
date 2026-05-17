"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Type,
  Moon,
  Sun,
  ScrollText,
  MessageSquareQuote,
  Languages,
  ChevronLeft,
  ChevronRight,
  PanelRightClose,
  PanelLeftOpen,
  PanelRightOpen,
  BookMarked,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dianji, Chapter } from "@/lib/dianji-data";
import ChapterNav from "./chapter-nav";

type FontSize = "small" | "medium" | "large";
type ViewMode = "original" | "annotation" | "vernacular";

interface ReaderProps {
  dianji: Dianji;
}

const fontSizeMap: Record<FontSize, string> = {
  small: "text-base leading-relaxed",
  medium: "text-lg leading-loose",
  large: "text-xl leading-loose",
};

const fontSizeLabel: Record<FontSize, string> = {
  small: "小",
  medium: "中",
  large: "大",
};

const STORAGE_KEY_PREFIX = "fanzhen-reader-";

function getStorageKey(dianjiId: string) {
  return `${STORAGE_KEY_PREFIX}${dianjiId}`;
}

interface ReaderProgress {
  chapterId: string;
  scrollTop: number;
  timestamp: number;
}

function loadProgress(dianjiId: string): ReaderProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(getStorageKey(dianjiId));
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return null;
}

function saveProgress(dianjiId: string, progress: ReaderProgress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getStorageKey(dianjiId), JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export default function Reader({ dianji }: ReaderProps) {
  const [currentChapterId, setCurrentChapterId] = useState<string>(
    dianji.chapters[0]?.id || ""
  );
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("original");
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [savedProgress, setSavedProgress] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    const progress = loadProgress(dianji.id);
    if (progress) {
      const chapterExists = dianji.chapters.some(
        (c) => c.id === progress.chapterId
      );
      if (chapterExists) {
        setCurrentChapterId(progress.chapterId);
      }
    }
  }, [dianji.id, dianji.chapters]);

  // Save progress when chapter changes
  const handleChapterSelect = useCallback(
    (chapterId: string) => {
      setCurrentChapterId(chapterId);
      saveProgress(dianji.id, {
        chapterId,
        scrollTop: 0,
        timestamp: Date.now(),
      });
      setSavedProgress(true);
      setTimeout(() => setSavedProgress(false), 2000);
    },
    [dianji.id]
  );

  const currentChapter =
    dianji.chapters.find((c) => c.id === currentChapterId) ||
    dianji.chapters[0];

  const toggleFontSize = () => {
    const sizes: FontSize[] = ["small", "medium", "large"];
    const currentIndex = sizes.indexOf(fontSize);
    setFontSize(sizes[(currentIndex + 1) % sizes.length]);
  };

  const toggleViewMode = () => {
    const modes: ViewMode[] = ["original", "annotation", "vernacular"];
    const currentIndex = modes.indexOf(viewMode);
    setViewMode(modes[(currentIndex + 1) % modes.length]);
  };

  const getViewModeIcon = () => {
    switch (viewMode) {
      case "original":
        return <ScrollText className="h-4 w-4" />;
      case "annotation":
        return <MessageSquareQuote className="h-4 w-4" />;
      case "vernacular":
        return <Languages className="h-4 w-4" />;
    }
  };

  const getViewModeLabel = () => {
    switch (viewMode) {
      case "original":
        return "原文";
      case "annotation":
        return "注释";
      case "vernacular":
        return "白话";
    }
  };

  const renderContent = (chapter: Chapter) => {
    // 内容完整性检查
    const hasContent = chapter.content && chapter.content.length > 0;
    const hasAnnotations = chapter.annotations && Object.keys(chapter.annotations).length > 0;
    const hasVernacular = chapter.vernacular && chapter.vernacular.length > 0;

    if (!hasContent) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">本章内容正在整理中...</p>
        </div>
      );
    }

    return (
      <div className={cn("space-y-6", fontSizeMap[fontSize])}>
        {chapter.content.map((line, index) => {
          const isHighlighted = chapter.highlights?.includes(index);
          const annotation = chapter.annotations?.[index];
          const vernacularLine = chapter.vernacular?.[index];

          return (
            <div key={index} className="group/line">
              {/* 原文段落 */}
              <p
                className={cn(
                  "transition-colors leading-loose tracking-wide",
                  isHighlighted
                    ? "text-cinnabar font-medium"
                    : "text-foreground"
                )}
              >
                {line}
              </p>

              {/* 注释模式 */}
              {viewMode === "annotation" && annotation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 ml-4 pl-4 border-l-2 border-gold"
                >
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    {annotation}
                  </p>
                </motion.div>
              )}

              {/* 白话模式 */}
              {viewMode === "vernacular" && vernacularLine && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 ml-4 pl-4 border-l-2 border-emerald-400"
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {vernacularLine}
                  </p>
                </motion.div>
              )}
            </div>
          );
        })}

        {/* 内容完整性提示 */}
        {viewMode === "annotation" && !hasAnnotations && (
          <div className="mt-8 p-4 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-700">
              本章暂无详细注释，建议阅读原文并结合自身体悟理解。
            </p>
          </div>
        )}
        {viewMode === "vernacular" && !hasVernacular && (
          <div className="mt-8 p-4 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-700">
              本章暂无白话翻译，建议阅读原文并结合注释理解。
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderRightPanel = () => {
    if (!rightPanelOpen) {
      return (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          className="shrink-0 border-l border-border bg-card/50 backdrop-blur-sm"
        >
          <div className="flex h-full flex-col items-center py-4">
            <button
              onClick={() => setRightPanelOpen(true)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title="展开侧栏"
            >
              <PanelRightOpen className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 320 }}
        className="shrink-0 border-l border-border bg-card/50 backdrop-blur-sm overflow-hidden"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-sm font-semibold">
              {viewMode === "original" && "阅读辅助"}
              {viewMode === "annotation" && "注释详解"}
              {viewMode === "vernacular" && "白话翻译"}
            </span>
            <button
              onClick={() => setRightPanelOpen(false)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <PanelRightClose className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {viewMode === "original" && (
              <div className="space-y-4">
                <div className="rounded-lg border border-gold/30 bg-gold/5 p-4">
                  <h4 className="text-sm font-semibold text-gold-dark mb-2 flex items-center gap-2">
                    <BookMarked className="h-4 w-4" />
                    凡真注释
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    本章为{dianji.title}的核心内容，对应凡真修炼体系的
                    <span className="text-cinnabar font-medium">
                      {dianji.stage}
                    </span>
                    阶段。
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    建议在阅读时结合自身体修体验，重点理解标红句子的深层含义。
                  </p>
                </div>

                {currentChapter.annotations &&
                  Object.keys(currentChapter.annotations).length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">本章注释</h4>
                      {Object.entries(currentChapter.annotations).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="text-sm border-l-2 border-gold pl-3"
                          >
                            <span className="text-cinnabar font-medium">
                              第{Number(key) + 1}段
                            </span>
                            <p className="text-muted-foreground mt-1">
                              {value}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            )}

            {viewMode === "annotation" && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  原文中已显示注释，此处为汇总视图。
                </p>
                {currentChapter.annotations &&
                  Object.entries(currentChapter.annotations).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="rounded-lg border border-border p-3"
                      >
                        <p className="text-sm font-medium text-foreground mb-1">
                          {currentChapter.content[Number(key)]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {value}
                        </p>
                      </div>
                    )
                  )}
              </div>
            )}

            {viewMode === "vernacular" && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  原文中已显示白话翻译，此处为汇总视图。
                </p>
                {currentChapter.vernacular?.map((line, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-border p-3"
                  >
                    <p className="text-sm font-medium text-foreground mb-1">
                      {currentChapter.content[index]}
                    </p>
                    <p className="text-sm text-muted-foreground">{line}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "flex h-[calc(100vh-4rem)] overflow-hidden transition-colors",
        isDarkMode ? "dark bg-ink-dark" : "bg-background"
      )}
    >
      <ChapterNav
        chapters={dianji.chapters}
        currentChapterId={currentChapterId}
        onChapterSelect={handleChapterSelect}
        isCollapsed={!leftPanelOpen}
        onToggleCollapse={() => setLeftPanelOpen(!leftPanelOpen)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <div
          className={cn(
            "flex items-center justify-between border-b px-4 py-2 gap-2 flex-wrap",
            isDarkMode
              ? "border-border/20 bg-ink"
              : "border-border bg-card/50"
          )}
        >
          <div className="flex items-center gap-1">
            {!leftPanelOpen && (
              <button
                onClick={() => setLeftPanelOpen(true)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                title="展开目录"
              >
                <PanelLeftOpen className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
            <span className="text-sm font-medium text-muted-foreground">
              {currentChapter.title}
            </span>
            {savedProgress && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-2"
              >
                进度已保存
              </motion.span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleFontSize}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors",
                "hover:bg-muted"
              )}
              title="字体大小"
            >
              <Type className="h-4 w-4" />
              <span className="text-xs">{fontSizeLabel[fontSize]}</span>
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                "hover:bg-muted",
                isDarkMode && "text-gold"
              )}
              title="夜间模式"
            >
              {isDarkMode ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={toggleViewMode}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors",
                "hover:bg-muted"
              )}
              title="切换视图"
            >
              {getViewModeIcon()}
              <span className="text-xs">{getViewModeLabel()}</span>
            </button>

            {!rightPanelOpen && (
              <button
                onClick={() => setRightPanelOpen(true)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                title="展开侧栏"
              >
                <PanelRightOpen className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-8">
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                <span className="font-mono">{dianji.code}</span>
                <span>|</span>
                <span>{dianji.author}</span>
                <span>|</span>
                <span className="text-cinnabar">{dianji.stage}</span>
              </div>
              <h1
                className={cn(
                  "font-serif-cn font-bold",
                  fontSize === "small"
                    ? "text-2xl"
                    : fontSize === "medium"
                      ? "text-3xl"
                      : "text-4xl"
                )}
              >
                {dianji.title}
              </h1>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapterId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2
                    className={cn(
                      "font-serif-cn font-semibold text-center mb-6",
                      fontSize === "small"
                        ? "text-lg"
                        : fontSize === "medium"
                          ? "text-xl"
                          : "text-2xl"
                    )}
                  >
                    {currentChapter.title}
                  </h2>

                  {renderContent(currentChapter)}
                </div>

                {viewMode === "original" && (
                  <div className="my-8 rounded-xl border-2 border-gold/40 bg-gold/5 p-6">
                    <h3 className="text-sm font-semibold text-gold-dark mb-3 flex items-center gap-2">
                      <MessageSquareQuote className="h-4 w-4" />
                      凡真注释
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      本章内容对应凡真修炼体系的
                      <span className="text-cinnabar font-medium">
                        {dianji.stage}
                      </span>
                      阶段。建议在阅读时保持心识宁静，将文字义理与体内气机运行相印证。重点句子以朱砂色标出，乃历代修炼者验证之关键口诀。
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
              {dianji.prevId ? (
                <a
                  href={`/dianji/${dianji.prevId}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cinnabar transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  上一篇
                </a>
              ) : (
                <div />
              )}

              {dianji.nextId ? (
                <a
                  href={`/dianji/${dianji.nextId}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cinnabar transition-colors"
                >
                  下一篇
                  <ChevronRight className="h-4 w-4" />
                </a>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>

      {renderRightPanel()}
    </div>
  );
}
