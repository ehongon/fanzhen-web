"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  item: string;
  description: string;
}

interface ChecklistProps {
  title: string;
  items: ChecklistItem[];
  color: string;
  storageKey?: string;
}

export default function Checklist({
  title,
  items,
  color,
  storageKey,
}: ChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(() => {
    if (storageKey && typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          return new Set(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
    }
    return new Set<number>();
  });

  const toggleItem = useCallback(
    (index: number) => {
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        if (storageKey && typeof window !== "undefined") {
          localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));
        }
        return next;
      });
    },
    [storageKey]
  );

  const progress = items.length > 0 ? Math.round((checked.size / items.length) * 100) : 0;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg" style={{ color }}>
            {title}
          </CardTitle>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium text-white"
            style={{ backgroundColor: color }}
          >
            {checked.size}/{items.length}
          </span>
        </div>
        {/* 进度条 */}
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: color,
            }}
          />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          完成度 {progress}%
        </p>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {items.map((item, index) => {
          const isChecked = checked.has(index);
          return (
            <div
              key={index}
              onClick={() => toggleItem(index)}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-all duration-200",
                "hover:bg-muted/50",
                isChecked && "border-opacity-50 bg-muted/30"
              )}
              style={{
                borderColor: isChecked ? `${color}40` : undefined,
              }}
            >
              {/* 勾选框 */}
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all duration-200",
                  isChecked ? "border-transparent text-white" : "border-muted-foreground/30"
                )}
                style={{
                  backgroundColor: isChecked ? color : "transparent",
                }}
              >
                {isChecked && (
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              {/* 内容 */}
              <div className="flex-1">
                <p
                  className={cn(
                    "text-sm font-medium transition-all duration-200",
                    isChecked && "text-muted-foreground line-through"
                  )}
                >
                  {item.item}
                </p>
                <p
                  className={cn(
                    "mt-0.5 text-xs text-muted-foreground transition-all duration-200",
                    isChecked && "text-muted-foreground/60"
                  )}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
