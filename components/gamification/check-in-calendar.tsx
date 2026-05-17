'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  generateCalendarDays,
  formatDate,
  getCheckInReward,
  WEEKDAY_NAMES,
  MONTH_NAMES,
  isSpecialDate,
  type CheckInDayInfo,
} from '@/lib/daily-task-data';
import { Button } from '@/components/ui/button';

interface CheckInCalendarProps {
  checkInDates: string[];
  streakDays: number;
  onCheckIn: () => void;
  isCheckingIn: boolean;
}

export function CheckInCalendar({
  checkInDates,
  streakDays,
  onCheckIn,
  isCheckingIn,
}: CheckInCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showReward, setShowReward] = useState(false);
  const [rewardExp, setRewardExp] = useState(0);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = formatDate(new Date());
  const hasCheckedInToday = checkInDates.includes(today);

  const calendarDays = generateCalendarDays(year, month, checkInDates);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleCheckIn = useCallback(() => {
    if (hasCheckedInToday || isCheckingIn) return;

    const reward = getCheckInReward(streakDays + 1);
    setRewardExp(reward);
    setShowReward(true);
    onCheckIn();

    setTimeout(() => {
      setShowReward(false);
    }, 3000);
  }, [hasCheckedInToday, isCheckingIn, streakDays, onCheckIn]);

  const todayInfo = calendarDays.find((day) => day.isToday);
  const specialToday = todayInfo ? isSpecialDate(new Date(todayInfo.date)) : null;

  return (
    <div className="relative">
      <div className="rounded-xl border border-[hsl(40,15%,85%)] bg-[hsl(40,30%,96%)] p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevMonth}
              className="h-8 w-8 text-[hsl(0,0%,45%)] hover:text-[hsl(0,0%,18%)]"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-serif-cn text-lg font-semibold text-[hsl(0,0%,18%)]">
              {year}年 {MONTH_NAMES[month]}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextMonth}
              className="h-8 w-8 text-[hsl(0,0%,45%)] hover:text-[hsl(0,0%,18%)]"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {!hasCheckedInToday && (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Button
                onClick={handleCheckIn}
                disabled={isCheckingIn}
                className="bg-cinnabar-gradient text-white hover:opacity-90"
              >
                <Sparkles className="mr-1 h-4 w-4" />
                立即签到
              </Button>
            </motion.div>
          )}

          {hasCheckedInToday && (
            <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              <Check className="h-4 w-4" />
              已签到
            </div>
          )}
        </div>

        {specialToday && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-center text-sm text-amber-700"
          >
            <Sparkles className="mr-1 inline h-4 w-4" />
            今日{specialToday.name}，签到可获得额外奖励
          </motion.div>
        )}

        <div className="grid grid-cols-7 gap-1">
          {WEEKDAY_NAMES.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-xs font-medium text-[hsl(0,0%,45%)]"
            >
              {day}
            </div>
          ))}

          {calendarDays.map((day, index) => (
            <CalendarDayCell
              key={`${day.date}-${index}`}
              day={day}
              streakDays={streakDays}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showReward && (
          <RewardOverlay exp={rewardExp} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CalendarDayCell({
  day,
  streakDays,
}: {
  day: CheckInDayInfo;
  streakDays: number;
}) {
  const isStreakDay = day.isCheckedIn && streakDays > 1;

  return (
    <motion.div
      whileHover={!day.isFuture ? { scale: 1.1 } : {}}
      className={cn(
        'relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-colors',
        !day.isCurrentMonth && 'text-[hsl(0,0%,70%)]',
        day.isCurrentMonth && !day.isCheckedIn && !day.isFuture && 'text-[hsl(0,0%,18%)] hover:bg-[hsl(40,15%,90%)]',
        day.isToday && 'ring-2 ring-[hsl(14,55%,50%)] ring-offset-1',
        day.isCheckedIn && 'bg-[hsl(14,55%,50%)] text-white',
        day.isFuture && 'cursor-default text-[hsl(0,0%,70%)]',
        day.specialDate && day.isCurrentMonth && !day.isCheckedIn && 'font-semibold text-[hsl(30,45%,55%)]'
      )}
    >
      <span className="relative z-10">{day.dayOfMonth}</span>

      {day.specialDate && day.isCurrentMonth && (
        <span className="mt-0.5 text-[8px] leading-none opacity-70">
          {day.specialDate}
        </span>
      )}

      {day.isCheckedIn && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Check className="h-5 w-5 text-white" strokeWidth={3} />
        </motion.div>
      )}

      {isStreakDay && (
        <div className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-400" />
      )}
    </motion.div>
  );
}

function RewardOverlay({ exp }: { exp: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="rounded-2xl bg-[hsl(40,33%,94%)] p-8 text-center shadow-2xl"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 2 }}
        >
          <Sparkles className="mx-auto h-16 w-16 text-[hsl(30,45%,65%)]" />
        </motion.div>

        <h3 className="mt-4 font-serif-cn text-2xl font-bold text-[hsl(0,0%,18%)]">
          签到成功
        </h3>

        <div className="mt-2 text-[hsl(0,0%,45%)]">获得奖励</div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="mt-3 text-4xl font-bold text-[hsl(14,55%,50%)]"
        >
          +{exp} 经验
        </motion.div>

        <div className="mt-4 flex justify-center gap-2">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: [-20, -60, -100],
                x: [0, (i - 2.5) * 20, (i - 2.5) * 40],
                opacity: [1, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
              className="text-2xl"
            >
              ✨
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
