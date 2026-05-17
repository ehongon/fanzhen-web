'use client';

import { motion } from 'framer-motion';
import { Flame, TrendingUp, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCounterProps {
  streakDays: number;
  maxStreak: number;
  totalCheckIns: number;
}

export function StreakCounter({ streakDays, maxStreak, totalCheckIns }: StreakCounterProps) {
  const isLongStreak = streakDays >= 7;
  const isMediumStreak = streakDays >= 3 && streakDays < 7;

  return (
    <div className="rounded-xl border border-[hsl(40,15%,85%)] bg-[hsl(40,30%,96%)] p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={
              isLongStreak
                ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }
                : {}
            }
            transition={
              isLongStreak
                ? {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }
                : {}
            }
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-2xl',
              isLongStreak && 'bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/30',
              isMediumStreak && 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30',
              !isLongStreak && !isMediumStreak && 'bg-gradient-to-br from-[hsl(40,20%,88%)] to-[hsl(40,15%,85%)]'
            )}
          >
            <Flame
              className={cn(
                'h-8 w-8',
                isLongStreak && 'text-white',
                isMediumStreak && 'text-white',
                !isLongStreak && !isMediumStreak && 'text-[hsl(0,0%,45%)]'
              )}
            />
          </motion.div>

          <div>
            <div className="flex items-baseline gap-1">
              <motion.span
                key={streakDays}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn(
                  'text-3xl font-bold',
                  isLongStreak && 'text-orange-600',
                  isMediumStreak && 'text-amber-600',
                  !isLongStreak && !isMediumStreak && 'text-[hsl(0,0%,18%)]'
                )}
              >
                {streakDays}
              </motion.span>
              <span className="text-sm text-[hsl(0,0%,45%)]">天</span>
            </div>
            <p className="text-sm text-[hsl(0,0%,45%)]">连续签到</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-[hsl(40,20%,90%)] px-3 py-1.5">
            <TrendingUp className="h-4 w-4 text-[hsl(0,0%,45%)]" />
            <div>
              <div className="text-xs text-[hsl(0,0%,45%)]">最高记录</div>
              <div className="text-sm font-semibold text-[hsl(0,0%,18%)]">{maxStreak} 天</div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-[hsl(40,20%,90%)] px-3 py-1.5">
            <Award className="h-4 w-4 text-[hsl(0,0%,45%)]" />
            <div>
              <div className="text-xs text-[hsl(0,0%,45%)]">累计签到</div>
              <div className="text-sm font-semibold text-[hsl(0,0%,18%)]">{totalCheckIns} 天</div>
            </div>
          </div>
        </div>
      </div>

      {streakDays > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-[hsl(0,0%,45%)]">
            <span>连续签到进度</span>
            <span>{streakDays % 7}/7 天</span>
          </div>
          <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-[hsl(40,15%,90%)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((streakDays % 7) / 7) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={cn(
                'h-full rounded-full',
                isLongStreak && 'bg-gradient-to-r from-orange-500 to-red-500',
                isMediumStreak && 'bg-gradient-to-r from-amber-400 to-orange-500',
                !isLongStreak && !isMediumStreak && 'bg-[hsl(14,55%,50%)]'
              )}
            />
          </div>
          {isLongStreak && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-center text-xs text-orange-600"
            >
              🔥 太棒了！你已保持连续签到 {streakDays} 天
            </motion.p>
          )}
        </div>
      )}
    </div>
  );
}
