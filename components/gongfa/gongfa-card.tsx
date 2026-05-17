"use client";

import Link from "next/link";
import { Star, Clock, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  type Gongfa,
  SCHOOL_COLORS,
  STAGE_COLORS,
  DIFFICULTY_LABELS,
} from "@/lib/gongfa-data";

interface GongfaCardProps {
  gongfa: Gongfa;
}

export function GongfaCard({ gongfa }: GongfaCardProps) {
  return (
    <Link href={`/gongfa/${gongfa.slug}`} className="block group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover border-border/50 bg-card/80 backdrop-blur-sm">
        {/* 图片区域 */}
        <div className="relative h-48 bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-stone-300 dark:text-stone-600 transition-transform duration-300 group-hover:scale-110" />
          </div>
          {/* 难度标签 */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{gongfa.difficulty}星</span>
            </div>
          </div>
          {/* 类型标签 */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="outline"
              className="bg-white/80 dark:bg-black/60 backdrop-blur-sm text-xs"
            >
              {gongfa.type}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {gongfa.schools.map((school) => (
              <Badge
                key={school}
                variant="outline"
                className={`text-xs ${SCHOOL_COLORS[school]}`}
              >
                {school}
              </Badge>
            ))}
            <Badge
              variant="outline"
              className={`text-xs ${STAGE_COLORS[gongfa.stage]}`}
            >
              {gongfa.stage}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold font-serif-cn group-hover:text-primary transition-colors line-clamp-1">
            {gongfa.name}
          </h3>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* 功效标签 */}
          <div className="flex flex-wrap gap-1">
            {gongfa.effects.map((effect) => (
              <span
                key={effect}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-primary/10 text-primary"
              >
                {effect}
              </span>
            ))}
          </div>

          {/* 耗时 */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{gongfa.duration}</span>
            <span className="mx-1">·</span>
            <span className="text-xs">{DIFFICULTY_LABELS[gongfa.difficulty]}</span>
          </div>

          {/* 描述 */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {gongfa.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
