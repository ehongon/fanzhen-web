'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Flame, Target, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaskCard } from './task-card';
import type { DailyTask, UserTaskProgress } from '@/lib/daily-task-data';

interface TaskGroupProps {
  title: string;
  icon: React.ReactNode;
  tasks: DailyTask[];
  progressMap: Record<string, UserTaskProgress>;
  onCompleteTask: (taskId: string) => void;
  completingTaskId: string | null;
  defaultExpanded?: boolean;
}

function TaskGroup({
  title,
  icon,
  tasks,
  progressMap,
  onCompleteTask,
  completingTaskId,
  defaultExpanded = true,
}: TaskGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const completedCount = tasks.filter(
    (task) => progressMap[task.id]?.status === 'completed'
  ).length;

  return (
    <div className="rounded-xl border border-[hsl(40,15%,85%)] bg-[hsl(40,30%,96%)] overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 hover:bg-[hsl(40,15%,92%)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(14,55%,50%)]/10 text-[hsl(14,55%,50%)]">
            {icon}
          </div>
          <div>
            <h3 className="font-serif-cn text-lg font-semibold text-[hsl(0,0%,18%)]">
              {title}
            </h3>
            <p className="text-sm text-[hsl(0,0%,45%)]">
              已完成 {completedCount}/{tasks.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-[hsl(40,15%,90%)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%` }}
                className="h-full rounded-full bg-[hsl(14,55%,50%)]"
              />
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-[hsl(0,0%,45%)]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[hsl(0,0%,45%)]" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 p-4 pt-0">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TaskCard
                    task={task}
                    progress={progressMap[task.id]}
                    onComplete={() => onCompleteTask(task.id)}
                    isCompleting={completingTaskId === task.id}
                  />
                </motion.div>
              ))}

              {tasks.length === 0 && (
                <div className="py-8 text-center text-[hsl(0,0%,45%)]">
                  暂无任务
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface DailyTasksProps {
  dailyRequired: DailyTask[];
  dailyOptional: DailyTask[];
  weeklyTasks: DailyTask[];
  monthlyTasks: DailyTask[];
  progressMap: Record<string, UserTaskProgress>;
  onCompleteTask: (taskId: string) => void;
  completingTaskId: string | null;
}

export function DailyTasks({
  dailyRequired,
  dailyOptional,
  weeklyTasks,
  monthlyTasks,
  progressMap,
  onCompleteTask,
  completingTaskId,
}: DailyTasksProps) {
  const dailyCompleted = dailyRequired.filter(
    (t) => progressMap[t.id]?.status === 'completed'
  ).length;
  const dailyTotal = dailyRequired.length;

  const optionalCompleted = dailyOptional.filter(
    (t) => progressMap[t.id]?.status === 'completed'
  ).length;
  const optionalTarget = 3;

  const weeklyCompleted = weeklyTasks.filter(
    (t) => progressMap[t.id]?.status === 'completed'
  ).length;
  const weeklyTotal = weeklyTasks.length;

  const monthlyCompleted = monthlyTasks.filter(
    (t) => progressMap[t.id]?.status === 'completed'
  ).length;
  const monthlyTotal = monthlyTasks.length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={<Flame className="h-5 w-5" />}
          label="今日必做"
          value={`${dailyCompleted}/${dailyTotal}`}
          color="red"
        />
        <StatCard
          icon={<Target className="h-5 w-5" />}
          label="今日选做"
          value={`${optionalCompleted}/${optionalTarget}`}
          color="amber"
        />
        <StatCard
          icon={<Calendar className="h-5 w-5" />}
          label="本周任务"
          value={`${weeklyCompleted}/${weeklyTotal}`}
          color="blue"
        />
        <StatCard
          icon={<Calendar className="h-5 w-5" />}
          label="本月任务"
          value={`${monthlyCompleted}/${monthlyTotal}`}
          color="purple"
        />
      </div>

      <TaskGroup
        title="每日必做"
        icon={<Flame className="h-5 w-5" />}
        tasks={dailyRequired}
        progressMap={progressMap}
        onCompleteTask={onCompleteTask}
        completingTaskId={completingTaskId}
        defaultExpanded={true}
      />

      <TaskGroup
        title="每日选做"
        icon={<Target className="h-5 w-5" />}
        tasks={dailyOptional}
        progressMap={progressMap}
        onCompleteTask={onCompleteTask}
        completingTaskId={completingTaskId}
        defaultExpanded={true}
      />

      <TaskGroup
        title="每周任务"
        icon={<Calendar className="h-5 w-5" />}
        tasks={weeklyTasks}
        progressMap={progressMap}
        onCompleteTask={onCompleteTask}
        completingTaskId={completingTaskId}
        defaultExpanded={false}
      />

      <TaskGroup
        title="每月任务"
        icon={<Calendar className="h-5 w-5" />}
        tasks={monthlyTasks}
        progressMap={progressMap}
        onCompleteTask={onCompleteTask}
        completingTaskId={completingTaskId}
        defaultExpanded={false}
      />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'red' | 'amber' | 'blue' | 'purple';
}) {
  const colorClasses = {
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        'flex flex-col items-center rounded-xl p-3',
        colorClasses[color]
      )}
    >
      <div className="mb-1">{icon}</div>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs opacity-70">{label}</div>
    </motion.div>
  );
}
