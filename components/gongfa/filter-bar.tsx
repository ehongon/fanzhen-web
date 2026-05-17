"use client";

import { useState } from "react";
import { Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SCHOOLS,
  STAGES,
  GONGFA_TYPES,
  EFFECTS,
  SCHOOL_COLORS,
  STAGE_COLORS,
  TYPE_COLORS,
} from "@/lib/gongfa-data";

export interface FilterState {
  schools: string[];
  stages: string[];
  types: string[];
  difficulty: number[];
  effects: string[];
}

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFilter = <T extends string>(
    key: keyof FilterState,
    value: T
  ) => {
    const current = filters[key] as T[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const toggleDifficulty = (level: number) => {
    const current = filters.difficulty;
    const updated = current.includes(level)
      ? current.filter((v) => v !== level)
      : [...current, level];
    onChange({ ...filters, difficulty: updated });
  };

  const clearFilters = () => {
    onChange({
      schools: [],
      stages: [],
      types: [],
      difficulty: [],
      effects: [],
    });
  };

  const hasActiveFilters =
    filters.schools.length > 0 ||
    filters.stages.length > 0 ||
    filters.types.length > 0 ||
    filters.difficulty.length > 0 ||
    filters.effects.length > 0;

  const activeCount =
    filters.schools.length +
    filters.stages.length +
    filters.types.length +
    filters.difficulty.length +
    filters.effects.length;

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden">
      {/* 头部 */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
          <span className="text-xs sm:text-sm font-medium">筛选条件</span>
          {activeCount > 0 && (
            <Badge variant="secondary" className="text-[10px] sm:text-xs">
              {activeCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-muted-foreground hover:text-foreground min-h-[32px]"
              onClick={clearFilters}
            >
              <X className="w-3 h-3 mr-1" />
              清除
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 min-h-[32px] min-w-[32px]"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* 筛选内容 */}
      {isExpanded && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3 sm:space-y-4 border-t border-border/50 pt-3 sm:pt-4">
          {/* 所属流派 */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">所属流派</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {SCHOOLS.map((school) => (
                <button
                  key={school}
                  onClick={() => toggleFilter("schools", school)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium border transition-all duration-200 min-h-[28px] sm:min-h-[32px] ${
                    filters.schools.includes(school)
                      ? SCHOOL_COLORS[school] + " ring-1 sm:ring-2 ring-offset-1"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {school}
                </button>
              ))}
            </div>
          </div>

          {/* 所属阶段 */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">所属阶段</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {STAGES.map((stage) => (
                <button
                  key={stage}
                  onClick={() => toggleFilter("stages", stage)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium border transition-all duration-200 min-h-[28px] sm:min-h-[32px] ${
                    filters.stages.includes(stage)
                      ? STAGE_COLORS[stage] + " ring-1 sm:ring-2 ring-offset-1"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {/* 功法类型 */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">功法类型</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {GONGFA_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleFilter("types", type)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium border transition-all duration-200 min-h-[28px] sm:min-h-[32px] ${
                    filters.types.includes(type)
                      ? TYPE_COLORS[type] + " ring-1 sm:ring-2 ring-offset-1"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 难度等级 */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">难度等级</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => toggleDifficulty(level)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium border transition-all duration-200 min-h-[28px] sm:min-h-[32px] ${
                    filters.difficulty.includes(level)
                      ? "bg-yellow-100 text-yellow-800 border-yellow-300 ring-1 sm:ring-2 ring-offset-1"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {"★".repeat(level)}{"☆".repeat(5 - level)}
                </button>
              ))}
            </div>
          </div>

          {/* 主要功效 */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">主要功效</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {EFFECTS.map((effect) => (
                <button
                  key={effect}
                  onClick={() => toggleFilter("effects", effect)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium border transition-all duration-200 min-h-[28px] sm:min-h-[32px] ${
                    filters.effects.includes(effect)
                      ? "bg-primary/10 text-primary border-primary/30 ring-1 sm:ring-2 ring-offset-1"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {effect}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
