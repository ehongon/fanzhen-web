"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { TimelineEvent } from "@/lib/schools-data";

interface SchoolTimelineProps {
  history: TimelineEvent[];
  color: string;
}

export default function SchoolTimeline({ history, color }: SchoolTimelineProps) {
  return (
    <div className="relative">
      {/* 时间线 */}
      <div
        className="absolute left-4 top-0 bottom-0 w-0.5 md:left-6"
        style={{ backgroundColor: `${color}30` }}
      />

      <div className="space-y-8">
        {history.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative pl-12 md:pl-16"
          >
            {/* 节点 */}
            <div
              className="absolute left-2 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-white md:left-4"
              style={{ borderColor: color }}
            >
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>

            {/* 内容 */}
            <div className="rounded-xl border bg-white/60 p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" style={{ color }} />
                <span
                  className="text-sm font-medium"
                  style={{ color }}
                >
                  {event.period}
                </span>
              </div>
              <h4 className="mb-2 font-serif text-lg font-bold text-charcoal">
                {event.title}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
