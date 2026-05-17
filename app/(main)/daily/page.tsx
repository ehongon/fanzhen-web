'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ListTodo, Flame } from 'lucide-react';
import { CheckInCalendar } from '@/components/gamification/check-in-calendar';
import { DailyTasks } from '@/components/gamification/daily-tasks';
import { StreakCounter } from '@/components/gamification/streak-counter';
import { RewardModal } from '@/components/gamification/reward-modal';
import {
  DAILY_TASKS,
  WEEKLY_TASKS,
  MONTHLY_TASKS,
  formatDate,
  calculateStreak,
  type UserTaskProgress,
} from '@/lib/daily-task-data';

interface DailyData {
  checkInDates: string[];
  streakDays: number;
  maxStreak: number;
  totalCheckIns: number;
  taskProgress: Record<string, UserTaskProgress>;
}

export default function DailyPage() {
  const [data, setData] = useState<DailyData>({
    checkInDates: [],
    streakDays: 0,
    maxStreak: 0,
    totalCheckIns: 0,
    taskProgress: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [rewardModal, setRewardModal] = useState<{
    isOpen: boolean;
    exp: number;
    badge?: string;
    streakDays?: number;
  }>({
    isOpen: false,
    exp: 0,
  });

  const fetchData = useCallback(async () => {
    try {
      const [streakRes, tasksRes] = await Promise.all([
        fetch('/api/daily/streak'),
        fetch('/api/daily/tasks'),
      ]);

      const streakData = await streakRes.json();
      const tasksData = await tasksRes.json();

      if (streakData.success) {
        setData((prev) => ({
          ...prev,
          checkInDates: streakData.data.checkInDates || [],
          streakDays: streakData.data.streakDays || 0,
          maxStreak: streakData.data.maxStreak || 0,
          totalCheckIns: streakData.data.totalCheckIns || 0,
        }));
      }

      if (tasksData.success) {
        const progressMap: Record<string, UserTaskProgress> = {};
        tasksData.data?.forEach((progress: UserTaskProgress) => {
          progressMap[progress.taskId] = progress;
        });
        setData((prev) => ({ ...prev, taskProgress: progressMap }));
      }
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCheckIn = useCallback(async () => {
    if (isCheckingIn) return;
    setIsCheckingIn(true);

    try {
      const response = await fetch('/api/daily/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (result.success) {
        const today = formatDate(new Date());
        const newCheckInDates = [...data.checkInDates, today];
        const newStreak = calculateStreak(newCheckInDates);

        setData((prev) => ({
          ...prev,
          checkInDates: newCheckInDates,
          streakDays: newStreak,
          totalCheckIns: prev.totalCheckIns + 1,
          maxStreak: Math.max(prev.maxStreak, newStreak),
        }));

        setRewardModal({
          isOpen: true,
          exp: result.data.reward.exp,
          streakDays: newStreak,
        });
      }
    } catch (error) {
      console.error('签到失败:', error);
    } finally {
      setIsCheckingIn(false);
    }
  }, [isCheckingIn, data.checkInDates]);

  const handleCompleteTask = useCallback(
    async (taskId: string) => {
      if (completingTaskId) return;
      setCompletingTaskId(taskId);

      try {
        const response = await fetch('/api/daily/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ taskId }),
        });

        const result = await response.json();

        if (result.success) {
          setData((prev) => ({
            ...prev,
            taskProgress: {
              ...prev.taskProgress,
              [taskId]: {
                ...prev.taskProgress[taskId],
                taskId,
                status: 'completed',
                progress: 100,
                completedAt: new Date(),
                date: formatDate(new Date()),
                userId: '',
              },
            },
          }));

          const task =
            DAILY_TASKS.find((t) => t.id === taskId) ||
            WEEKLY_TASKS.find((t) => t.id === taskId) ||
            MONTHLY_TASKS.find((t) => t.id === taskId);

          if (task) {
            setRewardModal({
              isOpen: true,
              exp: task.reward.exp,
              badge: task.reward.badge,
            });
          }
        }
      } catch (error) {
        console.error('完成任务失败:', error);
      } finally {
        setCompletingTaskId(null);
      }
    },
    [completingTaskId]
  );

  const dailyRequired = DAILY_TASKS.filter((t) => t.category === 'required');
  const dailyOptional = DAILY_TASKS.filter((t) => t.category === 'optional');

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-8 w-8 rounded-full border-2 border-[hsl(14,55%,50%)] border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-serif-cn text-3xl font-bold text-[hsl(0,0%,18%)]">
          每日修炼
        </h1>
        <p className="mt-1 text-[hsl(0,0%,45%)]">
          坚持每日修炼，积少成多，终成大器
        </p>
      </motion.div>

      <div className="space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <Flame className="h-5 w-5 text-[hsl(14,55%,50%)]" />
            <h2 className="font-serif-cn text-xl font-semibold text-[hsl(0,0%,18%)]">
              连续签到
            </h2>
          </div>
          <StreakCounter
            streakDays={data.streakDays}
            maxStreak={data.maxStreak}
            totalCheckIns={data.totalCheckIns}
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-[hsl(14,55%,50%)]" />
            <h2 className="font-serif-cn text-xl font-semibold text-[hsl(0,0%,18%)]">
              签到日历
            </h2>
          </div>
          <CheckInCalendar
            checkInDates={data.checkInDates}
            streakDays={data.streakDays}
            onCheckIn={handleCheckIn}
            isCheckingIn={isCheckingIn}
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-3 flex items-center gap-2">
            <ListTodo className="h-5 w-5 text-[hsl(14,55%,50%)]" />
            <h2 className="font-serif-cn text-xl font-semibold text-[hsl(0,0%,18%)]">
              修炼任务
            </h2>
          </div>
          <DailyTasks
            dailyRequired={dailyRequired}
            dailyOptional={dailyOptional}
            weeklyTasks={WEEKLY_TASKS}
            monthlyTasks={MONTHLY_TASKS}
            progressMap={data.taskProgress}
            onCompleteTask={handleCompleteTask}
            completingTaskId={completingTaskId}
          />
        </motion.section>
      </div>

      <RewardModal
        isOpen={rewardModal.isOpen}
        onClose={() => setRewardModal((prev) => ({ ...prev, isOpen: false }))}
        exp={rewardModal.exp}
        badge={rewardModal.badge}
        streakDays={rewardModal.streakDays}
      />
    </div>
  );
}
