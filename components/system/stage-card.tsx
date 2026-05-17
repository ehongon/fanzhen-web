"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface StageCardProps {
  stage: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  methods: string[];
  verification: string[];
  color: string;
  icon: React.ReactNode;
  index: number;
}

export default function StageCard({
  stage,
  title,
  subtitle,
  description,
  features,
  methods,
  verification,
  color,
  icon,
  index,
}: StageCardProps) {
  return (
    <Link href={`/system/${stage}`} className="block group">
      <div
        className={cn(
          "relative h-full rounded-xl border-2 bg-card p-6 transition-all duration-500",
          "hover:-translate-y-2 hover:shadow-card-hover",
          "flex flex-col"
        )}
        style={{
          borderColor: `${color}30`,
        }}
      >
        {/* 顶部颜色条 */}
        <div
          className="absolute left-0 right-0 top-0 h-1 rounded-t-xl transition-all duration-500 group-hover:h-1.5"
          style={{ backgroundColor: color }}
        />

        {/* 阶段编号 */}
        <div className="mb-4 flex items-center justify-between">
          <span
            className="rounded-full px-3 py-1 text-xs font-medium text-white"
            style={{ backgroundColor: color }}
          >
            第 {index + 1} 阶段
          </span>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {icon}
          </div>
        </div>

        {/* 标题区域 */}
        <div className="mb-3">
          <h3
            className="mb-1 font-serif text-2xl font-bold tracking-tight"
            style={{ color }}
          >
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {/* 描述 */}
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* 核心目标 */}
        <div className="mb-4 rounded-lg bg-muted/50 p-3">
          <p className="text-xs font-medium text-muted-foreground">核心目标</p>
          <p className="mt-1 text-sm font-medium" style={{ color }}>
            {subtitle}
          </p>
        </div>

        {/* 典型特征 */}
        <div className="mb-4 flex-1">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            典型特征
          </p>
          <ul className="space-y-1.5">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start text-sm">
                <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 主要功法 */}
        <div className="mb-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            主要功法
          </p>
          <div className="flex flex-wrap gap-2">
            {methods.map((method, i) => (
              <span
                key={i}
                className="rounded-md px-2 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${color}12`,
                  color,
                }}
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* 验证标准 */}
        <div className="border-t border-border pt-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            验证标准
          </p>
          <div className="flex flex-wrap gap-2">
            {verification.map((item, i) => (
              <span
                key={i}
                className="rounded-md border px-2 py-1 text-xs"
                style={{
                  borderColor: `${color}25`,
                  color: `${color}cc`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* 悬停指示 */}
        <div className="mt-4 flex items-center text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ color }}>
          <span>查看详情</span>
          <svg className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
