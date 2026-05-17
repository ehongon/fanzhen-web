"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  X,
  Filter,
  ChevronDown,
  GraduationCap,
  Bookmark,
  Layers,
} from "lucide-react";
import {
  categories,
  dianjiList,
} from "@/lib/dianji-data";
import CategoryCard from "@/components/dianji/category-card";
import DianjiCard from "@/components/dianji/dianji-card";
import { cn } from "@/lib/utils";

const stageOptions = ["全部阶段", "炼形化精", "炼精化气", "炼气化神", "炼神返虚", "全阶段"];
const difficultyOptions = ["全部难度", "入门", "进阶", "深入"];
const readingOptions = ["全部建议", "必读", "选读", "参考"];

export default function DianjiPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("全部阶段");
  const [difficultyFilter, setDifficultyFilter] = useState("全部难度");
  const [readingFilter, setReadingFilter] = useState("全部建议");
  const [showFilters, setShowFilters] = useState(false);

  const totalCount = dianjiList.length;

  const filteredDianji = useMemo(() => {
    let result = dianjiList;

    if (selectedCategory) {
      result = result.filter((d) => d.categoryCode === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.includes(q) ||
          d.title.toLowerCase().includes(q) ||
          d.author.includes(q) ||
          d.author.toLowerCase().includes(q) ||
          d.code.toLowerCase().includes(q) ||
          d.summary.includes(q) ||
          d.corePoints.some((p) => p.includes(q))
      );
    }

    if (stageFilter !== "全部阶段") {
      result = result.filter(
        (d) => d.stage === stageFilter || d.stageTags.includes(stageFilter)
      );
    }

    if (difficultyFilter !== "全部难度") {
      result = result.filter((d) => d.difficulty === difficultyFilter);
    }

    if (readingFilter !== "全部建议") {
      result = result.filter((d) => d.readingAdvice === readingFilter);
    }

    return result;
  }, [selectedCategory, searchQuery, stageFilter, difficultyFilter, readingFilter]);

  const activeFilterCount = [
    stageFilter !== "全部阶段",
    difficultyFilter !== "全部难度",
    readingFilter !== "全部建议",
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setStageFilter("全部阶段");
    setDifficultyFilter("全部难度");
    setReadingFilter("全部建议");
    setSearchQuery("");
  };

  const selectedCategoryObj = selectedCategory
    ? categories.find((c) => c.code === selectedCategory)
    : null;

  const stats = useMemo(() => {
    const mustRead = dianjiList.filter((d) => d.readingAdvice === "必读").length;
    const optional = dianjiList.filter((d) => d.readingAdvice === "选读").length;
    const reference = dianjiList.filter((d) => d.readingAdvice === "参考").length;
    return { mustRead, optional, reference };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-ink-gradient py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-gold/30 rounded-full" />
          <div className="absolute bottom-10 right-20 w-48 h-48 border border-gold/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-gold/10 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <BookOpen className="h-4 w-4 text-gold" />
              <span className="text-sm text-gold font-medium">智慧传承</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif-cn font-bold text-rice mb-4">
              典籍文献
            </h1>
            <p className="text-lg md:text-xl text-rice/70 max-w-2xl mx-auto mb-8">
              八大体系，八十四部经典，贯通东西修行智慧
            </p>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Layers className="h-4 w-4 text-gold" />
                <span className="text-rice text-sm">
                  <span className="font-bold text-gold">{categories.length}</span> 大体系
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <BookOpen className="h-4 w-4 text-gold" />
                <span className="text-rice text-sm">
                  <span className="font-bold text-gold">{totalCount}</span> 部典籍
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <Bookmark className="h-4 w-4 text-gold" />
                <span className="text-rice text-sm">
                  <span className="font-bold text-gold">{stats.mustRead}</span> 部必读
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <GraduationCap className="h-4 w-4 text-gold" />
                <span className="text-rice text-sm">
                  <span className="font-bold text-gold">
                    {dianjiList.filter((d) => d.difficulty === "入门").length}
                  </span>{" "}
                  部入门
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif-cn font-bold text-foreground">
              分类浏览
            </h2>
            <span className="text-sm text-muted-foreground">
              点击分类筛选典籍
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                isActive={selectedCategory === category.code}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.code ? null : category.code
                  )
                }
              />
            ))}
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12"
        >
          <div className="flex flex-col gap-4">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-serif-cn font-bold text-foreground">
                  {selectedCategoryObj?.name || "全部典籍"}
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({filteredDianji.length} 部)
                </span>
                {(selectedCategory || activeFilterCount > 0 || searchQuery) && (
                  <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground hover:bg-muted/80 transition-colors"
                  >
                    <X className="h-3 w-3" />
                    清除全部
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="搜索书名、作者、编号、内容..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-card",
                      "text-sm placeholder:text-muted-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-cinnabar/30 focus:border-cinnabar/50",
                      "transition-all"
                    )}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all",
                    showFilters || activeFilterCount > 0
                      ? "border-cinnabar/30 bg-cinnabar/5 text-cinnabar"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Filter className="h-4 w-4" />
                  筛选
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cinnabar text-white text-xs">
                      {activeFilterCount}
                    </span>
                  )}
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform",
                      showFilters && "rotate-180"
                    )}
                  />
                </button>
              </div>
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl border border-border bg-card p-4 space-y-4">
                    {/* Stage Filter */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Layers className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">修炼阶段</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {stageOptions.map((stage) => (
                          <button
                            key={stage}
                            onClick={() => setStageFilter(stage)}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-sm transition-all",
                              stageFilter === stage
                                ? "bg-cinnabar text-white"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            )}
                          >
                            {stage}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">难度等级</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {difficultyOptions.map((diff) => (
                          <button
                            key={diff}
                            onClick={() => setDifficultyFilter(diff)}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-sm transition-all",
                              difficultyFilter === diff
                                ? "bg-cinnabar text-white"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            )}
                          >
                            {diff}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Reading Advice Filter */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Bookmark className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">阅读建议</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {readingOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setReadingFilter(opt)}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-sm transition-all",
                              readingFilter === opt
                                ? "bg-cinnabar text-white"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            )}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Grid */}
          {filteredDianji.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {filteredDianji.map((dianji, index) => (
                <DianjiCard key={dianji.id} dianji={dianji} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">
                {searchQuery
                  ? "未找到匹配的典籍"
                  : "该筛选条件下暂无典籍"}
              </p>
              <button
                onClick={clearAllFilters}
                className="text-sm text-cinnabar hover:underline"
              >
                清除筛选条件
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
