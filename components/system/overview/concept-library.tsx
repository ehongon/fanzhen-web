"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type CoreConcept, SCHOOL_NAMES } from "@/lib/system-overview-data";
import {
  ChevronDown,
  BookOpen,
  Lightbulb,
  GraduationCap,
  X,
} from "lucide-react";

interface ConceptLibraryProps {
  concepts: CoreConcept[];
}

const conceptIcons: Record<string, React.ReactNode> = {
  trinity: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="3" />
      <circle cx="6" cy="16" r="3" />
      <circle cx="18" cy="16" r="3" />
      <path d="M12 11v2M9 14l-1.5 1M15 14l1.5 1" />
    </svg>
  ),
  balance: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v18M3 12h18M7 7l10 10M17 7L7 17" />
    </svg>
  ),
  yinyang: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20" />
      <circle cx="12" cy="7" r="2" fill="currentColor" />
      <circle cx="12" cy="17" r="2" />
    </svg>
  ),
  cycle: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      <path d="M21 3v9h-9" />
    </svg>
  ),
  mind: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  heal: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  breathe: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10" />
      <path d="M12 6v6l4 2" />
      <path d="M20 4v6h-6" />
    </svg>
  ),
  universe: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  ),
};

export default function ConceptLibrary({ concepts }: ConceptLibraryProps) {
  const [selectedConcept, setSelectedConcept] = useState<CoreConcept | null>(
    null
  );

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-serif text-3xl font-bold text-foreground">
            核心概念速查
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            理解这些核心概念，是深入修炼体系的关键
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-cinnabar/60" />
        </div>

        {/* 概念卡片网格 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedConcept(concept)}
            >
              <div className="relative h-full overflow-hidden rounded-xl border bg-card p-5 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover">
                {/* 图标 */}
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cinnabar/10 text-cinnabar transition-transform duration-500 group-hover:scale-110">
                  {conceptIcons[concept.icon] || (
                    <BookOpen className="h-6 w-6" />
                  )}
                </div>

                <h3 className="mb-1 font-serif text-base font-bold">
                  {concept.title}
                </h3>
                <p className="mb-2 text-xs text-muted-foreground">
                  {concept.subtitle}
                </p>

                <p className="line-clamp-2 text-sm leading-relaxed text-foreground/70">
                  {concept.explanation}
                </p>

                <div className="mt-3 flex items-center text-xs font-medium text-cinnabar opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span>查看详细解释</span>
                  <ChevronDown className="ml-1 h-3 w-3 rotate-[-90deg]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 展开的详情弹窗 */}
        <AnimatePresence>
          {selectedConcept && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setSelectedConcept(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 关闭按钮 */}
                <button
                  onClick={() => setSelectedConcept(null)}
                  className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* 头部 */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cinnabar/10 text-cinnabar">
                    {conceptIcons[selectedConcept.icon] || (
                      <BookOpen className="h-7 w-7" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold">
                      {selectedConcept.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedConcept.subtitle}
                    </p>
                  </div>
                </div>

                {/* 详细解释 */}
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-bold">
                      <BookOpen className="h-4 w-4 text-cinnabar" />
                      详细解释
                    </h4>
                    <p className="leading-relaxed text-foreground/80">
                      {selectedConcept.explanation}
                    </p>
                  </div>

                  {/* 白话说明 */}
                  <div className="rounded-xl border border-gold/30 bg-rice/30 p-4">
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-gold-dark">
                      <Lightbulb className="h-4 w-4" />
                      白话说明
                    </h4>
                    <p className="leading-relaxed text-foreground/80">
                      {selectedConcept.plainExplanation}
                    </p>
                  </div>

                  {/* 应用指导 */}
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-bold">
                      <GraduationCap className="h-4 w-4 text-cinnabar" />
                      应用指导
                    </h4>
                    <p className="leading-relaxed text-foreground/80">
                      {selectedConcept.application}
                    </p>
                  </div>

                  {/* 各家观点 */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-bold">
                      <BookOpen className="h-4 w-4 text-cinnabar" />
                      各家观点
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {Object.entries(selectedConcept.schoolsView).map(
                        ([school, view]) => (
                          <div
                            key={school}
                            className="rounded-lg border p-3"
                            style={{ borderColor: "#e8e0d4" }}
                          >
                            <div className="mb-1 text-xs font-bold text-cinnabar">
                              {SCHOOL_NAMES[school as keyof typeof SCHOOL_NAMES]}
                            </div>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                              {view}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
