"use client";

import { useState, useRef, useCallback } from "react";
import { motion, PanInfo, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface SwipeableTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  onChange?: (tabId: string) => void;
}

export default function SwipeableTabs({
  tabs,
  defaultTab,
  className,
  onChange,
}: SwipeableTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const activeIndex = tabs.findIndex((t) => t.id === activeTab);

  const handleTabChange = useCallback(
    (tabId: string) => {
      setActiveTab(tabId);
      onChange?.(tabId);
    },
    [onChange]
  );

  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      const threshold = 50;
      const velocity = info.velocity.x;
      const offset = info.offset.x;

      if (offset < -threshold || velocity < -500) {
        // 向左滑动，切换到下一个标签
        const nextIndex = Math.min(activeIndex + 1, tabs.length - 1);
        handleTabChange(tabs[nextIndex].id);
      } else if (offset > threshold || velocity > 500) {
        // 向右滑动，切换到上一个标签
        const prevIndex = Math.max(activeIndex - 1, 0);
        handleTabChange(tabs[prevIndex].id);
      }
    },
    [activeIndex, tabs, handleTabChange]
  );

  return (
    <div className={cn("w-full", className)}>
      {/* 标签头 */}
      <div className="relative flex items-center border-b border-border/50 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "relative flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors min-h-[44px]",
              activeTab === tab.id
                ? "text-cinnabar"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cinnabar"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* 可滑动内容区域 */}
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {tabs.map((tab, index) => (
            <motion.div
              key={tab.id}
              className="w-full flex-shrink-0"
              drag={index === activeIndex ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{ x: index === activeIndex ? x : 0 }}
            >
              <div className="p-4">{tab.content}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
