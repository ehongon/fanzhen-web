"use client";

import { useState, useMemo } from "react";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GongfaCard } from "@/components/gongfa/gongfa-card";
import { FilterBar, type FilterState } from "@/components/gongfa/filter-bar";
import { gongfaList, type Gongfa } from "@/lib/gongfa-data";

export default function GongfaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    schools: [],
    stages: [],
    types: [],
    difficulty: [],
    effects: [],
  });

  const filteredGongfa = useMemo(() => {
    return gongfaList.filter((gongfa: Gongfa) => {
      // 搜索过滤
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = gongfa.name.toLowerCase().includes(query);
        const matchDesc = gongfa.description.toLowerCase().includes(query);
        const matchEffects = gongfa.effects.some((e) =>
          e.toLowerCase().includes(query)
        );
        if (!matchName && !matchDesc && !matchEffects) return false;
      }

      // 流派过滤
      if (filters.schools.length > 0) {
        if (!gongfa.schools.some((s) => filters.schools.includes(s)))
          return false;
      }

      // 阶段过滤
      if (filters.stages.length > 0) {
        if (!filters.stages.includes(gongfa.stage)) return false;
      }

      // 类型过滤
      if (filters.types.length > 0) {
        if (!filters.types.includes(gongfa.type)) return false;
      }

      // 难度过滤
      if (filters.difficulty.length > 0) {
        if (!filters.difficulty.includes(gongfa.difficulty)) return false;
      }

      // 功效过滤
      if (filters.effects.length > 0) {
        if (!gongfa.effects.some((e) => filters.effects.includes(e)))
          return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen">
      {/* 页面头部 */}
      <div className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 border-b border-border/50">
        <div className="container mx-auto px-3 sm:px-4 py-10 sm:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>修炼指南</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-cn mb-4 sm:mb-6">
              功法数据库
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed px-2">
              收录系统化的功法资料，包含详细的练习指导和注意事项，
              <br className="hidden md:block" />
              助您选择最适合的修炼方法，循序渐进提升修为。
            </p>
          </div>
        </div>
      </div>

      {/* 搜索和筛选区域 */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* 搜索栏 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索功法名称、描述或功效..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base bg-card/80 backdrop-blur-sm"
            />
          </div>

          {/* 筛选栏 */}
          <FilterBar filters={filters} onChange={setFilters} />

          {/* 结果统计 */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              共找到 <span className="font-medium text-foreground">{filteredGongfa.length}</span> 个功法
            </p>
          </div>

          {/* 功法卡片网格 */}
          {filteredGongfa.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredGongfa.map((gongfa) => (
                <GongfaCard key={gongfa.id} gongfa={gongfa} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-2">
                未找到符合条件的功法
              </p>
              <p className="text-sm text-muted-foreground">
                尝试调整筛选条件或搜索关键词
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
