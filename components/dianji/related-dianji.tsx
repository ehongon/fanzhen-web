"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookMarked, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dianji } from "@/lib/dianji-data";

interface RelatedDianjiProps {
  dianjiList: Dianji[];
  currentId: string;
}

const stageColorMap: Record<string, string> = {
  炼形化精: "text-emerald-700 bg-emerald-50",
  炼精化气: "text-amber-700 bg-amber-50",
  炼气化神: "text-violet-700 bg-violet-50",
  炼神返虚: "text-rose-700 bg-rose-50",
  全阶段: "text-cinnabar bg-cinnabar/10",
};

export default function RelatedDianji({ dianjiList, currentId }: RelatedDianjiProps) {
  const filtered = dianjiList.filter((d) => d.id !== currentId).slice(0, 4);

  if (filtered.length === 0) return null;

  return (
    <section className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookMarked className="h-5 w-5 text-cinnabar" />
              <h2 className="text-xl font-serif-cn font-bold text-foreground">
                相关典籍推荐
              </h2>
            </div>
            <Link
              href="/dianji"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-cinnabar transition-colors"
            >
              查看全部
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((dianji, index) => (
              <motion.div
                key={dianji.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link href={`/dianji/${dianji.id}`}>
                  <div
                    className={cn(
                      "group rounded-xl border border-border/60 bg-card p-4",
                      "transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {dianji.code}
                      </span>
                      <span
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded",
                          stageColorMap[dianji.stage] || "text-muted-foreground bg-muted"
                        )}
                      >
                        {dianji.stage}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground group-hover:text-cinnabar transition-colors truncate">
                      {dianji.title}
                    </h3>

                    <p className="text-xs text-muted-foreground mt-1">
                      {dianji.author}
                    </p>

                    <p className="text-xs text-muted-foreground/70 mt-2 line-clamp-2">
                      {dianji.summary}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          dianji.readingAdvice === "必读"
                            ? "bg-cinnabar text-white"
                            : dianji.readingAdvice === "选读"
                            ? "bg-blue-600 text-white"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {dianji.readingAdvice}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {dianji.difficulty}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
