"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  BookOpen,
  Smile,
  Frown,
  Meh,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface CultivationRecord {
  id: string;
  date: string;
  gongfa: string;
  duration: number;
  feeling: "good" | "normal" | "bad";
  note: string;
}

interface CultivationLogProps {
  records: CultivationRecord[];
  className?: string;
}

const feelingConfig = {
  good: { icon: Smile, label: "顺畅", color: "text-green-600 bg-green-50" },
  normal: { icon: Meh, label: "一般", color: "text-yellow-600 bg-yellow-50" },
  bad: { icon: Frown, label: "困难", color: "text-red-600 bg-red-50" },
};

const gongfaColors: Record<string, string> = {
  站桩: "bg-cinnabar/10 text-cinnabar border-cinnabar/30",
  呼吸法: "bg-gold/10 text-gold-dark border-gold/30",
  冥想: "bg-ink/10 text-ink-light border-ink/30",
  小周天: "bg-purple-100 text-purple-700 border-purple-300",
  太极拳: "bg-blue-100 text-blue-700 border-blue-300",
};

export default function CultivationLog({
  records,
  className,
}: CultivationLogProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();

  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const getRecordsForDate = (dateStr: string) => {
    return records.filter((r) => r.date === dateStr);
  };

  const hasRecords = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return records.some((r) => r.date === dateStr);
  };

  const getDayRecords = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return getRecordsForDate(dateStr);
  };

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const selectedRecords = selectedDate
    ? getRecordsForDate(selectedDate)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "bg-card rounded-xl border border-border/50 shadow-card p-5",
        className
      )}
    >
      {/* 头部 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif-cn font-semibold text-lg text-foreground">
          修炼记录
        </h3>
        <Button
          size="sm"
          onClick={() => setShowAddModal(true)}
          className="bg-cinnabar hover:bg-cinnabar-light text-rice"
        >
          <Plus className="w-4 h-4 mr-1" />
          记录
        </Button>
      </div>

      {/* 日历头部 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <span className="font-serif-cn font-semibold text-foreground">
          {year}年 {month + 1}月
        </span>
        <button
          onClick={nextMonth}
          className="p-1 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* 星期标题 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日历格子 */}
      <div className="grid grid-cols-7 gap-1">
        {/* 空白格子 */}
        {Array.from({ length: startDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* 日期格子 */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayRecords = getDayRecords(day);
          const hasRecord = dayRecords.length > 0;
          const isSelected =
            selectedDate ===
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          return (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                setSelectedDate(isSelected ? null : dateStr);
              }}
              className={cn(
                "aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all",
                isToday(day)
                  ? "bg-cinnabar/10 border border-cinnabar/30"
                  : isSelected
                  ? "bg-gold/10 border border-gold/30"
                  : hasRecord
                  ? "bg-muted/50 hover:bg-muted"
                  : "hover:bg-muted/50"
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium",
                  isToday(day)
                    ? "text-cinnabar"
                    : isSelected
                    ? "text-gold-dark"
                    : "text-foreground"
                )}
              >
                {day}
              </span>
              {hasRecord && (
                <div className="flex space-x-0.5 mt-0.5">
                  {dayRecords.slice(0, 3).map((_, ri) => (
                    <div
                      key={ri}
                      className="w-1 h-1 rounded-full bg-cinnabar"
                    />
                  ))}
                  {dayRecords.length > 3 && (
                    <span className="text-[8px] text-cinnabar leading-none">
                      +
                    </span>
                  )}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* 选中日期的记录详情 */}
      <AnimatePresence>
        {selectedDate && selectedRecords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-border/50"
          >
            <h4 className="text-sm font-medium text-foreground mb-3">
              {selectedDate} 的修炼记录
            </h4>
            <div className="space-y-2">
              {selectedRecords.map((record) => {
                const FeelingIcon = feelingConfig[record.feeling].icon;
                return (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-cinnabar/20 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-cinnabar" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs px-1.5 py-0 h-5",
                            gongfaColors[record.gongfa] ||
                              "bg-muted text-muted-foreground"
                          )}
                        >
                          {record.gongfa}
                        </Badge>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{record.duration}分钟</span>
                        </div>
                      </div>
                      {record.note && (
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {record.note}
                        </p>
                      )}
                    </div>
                    <div
                      className={cn(
                        "flex items-center space-x-1 px-2 py-0.5 rounded-full",
                        feelingConfig[record.feeling].color
                      )}
                    >
                      <FeelingIcon className="w-3 h-3" />
                      <span className="text-xs">
                        {feelingConfig[record.feeling].label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 添加记录弹窗 */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card rounded-2xl shadow-2xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif-cn text-xl font-bold">
                  记录修炼
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-muted-foreground text-center py-8">
                记录功能开发中，敬请期待...
              </p>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                >
                  关闭
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
