"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SchoolData } from "@/lib/schools-data";

interface SchoolCardProps {
  school: SchoolData;
  index: number;
}

export default function SchoolCard({ school, index }: SchoolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/schools/${school.id}`}>
        <Card className="group h-full cursor-pointer overflow-hidden border-0 bg-white/80 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
          <CardContent className="p-0">
            {/* 顶部色条 */}
            <div
              className="h-1.5 w-full transition-all duration-300 group-hover:h-2"
              style={{ backgroundColor: school.color }}
            />

            <div className="p-6">
              {/* 标题区域 */}
              <div className="mb-4 flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white"
                  style={{ backgroundColor: school.color }}
                >
                  {school.name[0]}
                </div>
                <motion.div
                  className="flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: `${school.color}15` }}
                >
                  <ArrowRight
                    className="h-4 w-4"
                    style={{ color: school.color }}
                  />
                </motion.div>
              </div>

              {/* 学派名称 */}
              <h3 className="mb-1 font-serif text-xl font-bold text-charcoal">
                {school.name}家
              </h3>
              <p className="mb-3 text-sm text-muted-foreground">
                {school.subtitle}
              </p>

              {/* 分隔线 */}
              <div
                className="mb-3 h-px w-12"
                style={{ backgroundColor: `${school.color}40` }}
              />

              {/* 核心特点 */}
              <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-charcoal/70">
                {school.overview.slice(0, 60)}...
              </p>

              {/* 底部信息 */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" style={{ color: school.color }} />
                  <span>{school.classics.length}部经典</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: school.color }}
                  />
                  <span>{school.levels.length}个层次</span>
                </div>
              </div>

              {/* 与凡真对应 */}
              <div
                className="mt-4 rounded-lg px-3 py-2 text-xs"
                style={{
                  backgroundColor: `${school.color}08`,
                  color: school.colorDark,
                }}
              >
                <span className="font-medium">凡真对应：</span>
                {school.fanzhenSummary.slice(0, 30)}...
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
