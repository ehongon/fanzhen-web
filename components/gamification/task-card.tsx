'use client';

import { motion } from 'framer-motion';
import { Check, Circle, Trophy, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { DailyTask, UserTaskProgress } from '@/lib/daily-task-data';

interface TaskCardProps {
  task: DailyTask;
  progress?: UserTaskProgress;
  onComplete?: () => void;
  isCompleting?: boolean;
}

export function TaskCard({ task, progress, onComplete, isCompleting }: TaskCardProps) {
  const isCompleted = progress?.status === 'completed';
  const progressValue = progress?.progress ?? 0;

  const typeColors = {
    daily: 'border-l-4 border-l-[hsl(14,55%,50%)]',
    weekly: 'border-l-4 border-l-[hsl(30,45%,65%)]',
    monthly: 'border-l-4 border-l-[hsl(240,33%,14%)]',
  };

  const typeLabels = {
    daily: '每日',
    weekly: '每周',
    monthly: '每月',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={cn(
        'relative overflow-hidden rounded-xl border border-[hsl(40,15%,85%)] bg-[hsl(40,30%,96%)] p-4 shadow-sm transition-shadow hover:shadow-md',
        typeColors[task.type],
        isCompleted && 'opacity-75'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl',
            isCompleted
              ? 'bg-green-100'
              : 'bg-[hsl(40,20%,90%)]'
          )}
        >
          {isCompleted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Check className="h-6 w-6 text-green-600" />
            </motion.div>
          ) : (
            <span>{task.icon}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className={cn(
              'font-medium text-[hsl(0,0%,18%)]',
              isCompleted && 'line-through text-[hsl(0,0%,45%)]'
            )}>
              {task.title}
            </h4>
            <span className={cn(
              'rounded-full px-2 py-0.5 text-xs',
              task.type === 'daily' && 'bg-red-50 text-red-600',
              task.type === 'weekly' && 'bg-amber-50 text-amber-600',
              task.type === 'monthly' && 'bg-slate-50 text-slate-600'
            )}>
              {typeLabels[task.type]}
            </span>
            {task.category === 'optional' && (
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                选做
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-[hsl(0,0%,45%)]">{task.description}</p>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-[hsl(30,45%,55%)]">
              <Star className="h-3 w-3" />
              <span>+{task.reward.exp} 经验</span>
            </div>
            {task.reward.badge && (
              <div className="flex items-center gap-1 text-xs text-[hsl(14,55%,50%)]">
                <Trophy className="h-3 w-3" />
                <span>{task.reward.badge}</span>
              </div>
            )}
          </div>

          {!isCompleted && progressValue > 0 && progressValue < 100 && (
            <div className="mt-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[hsl(40,15%,90%)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressValue}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full bg-[hsl(14,55%,50%)]"
                />
              </div>
              <span className="mt-0.5 text-xs text-[hsl(0,0%,45%)]">{progressValue}%</span>
            </div>
          )}
        </div>

        {!isCompleted && onComplete && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              onClick={onComplete}
              disabled={isCompleting}
              className="bg-cinnabar-gradient text-white hover:opacity-90"
            >
              {isCompleting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Circle className="h-4 w-4" />
                </motion.div>
              ) : (
                '完成'
              )}
            </Button>
          </motion.div>
        )}

        {isCompleted && (
          <div className="flex h-8 items-center gap-1 rounded-full bg-green-100 px-3 text-xs text-green-700">
            <Check className="h-3 w-3" />
            已完成
          </div>
        )}
      </div>

      {isCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 -z-10 bg-gradient-to-r from-green-50/50 to-transparent"
        />
      )}
    </motion.div>
  );
}
