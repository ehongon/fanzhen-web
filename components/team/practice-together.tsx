"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Users, Clock, Zap, CheckCircle2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeamPractice, TeamPracticeStatus } from "@/lib/team-data";
import { cn } from "@/lib/utils";

interface PracticeTogetherProps {
  practice: TeamPractice;
  currentUserId?: string;
  onJoin?: () => void;
  onStart?: () => void;
  onComplete?: () => void;
  className?: string;
}

function CountdownTimer({ targetTime, onComplete }: { targetTime: Date; onComplete?: () => void }) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const target = new Date(targetTime).getTime();
      const diff = target - now;
      setRemaining(Math.max(0, diff));
      if (diff <= 0 && onComplete) {
        onComplete();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetTime, onComplete]);

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  return (
    <div className="flex items-center justify-center gap-2">
      {[
        { value: hours, label: "时" },
        { value: minutes, label: "分" },
        { value: seconds, label: "秒" },
      ].map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className="w-16 h-20 rounded-lg bg-ink border border-gold/30 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gold tabular-nums">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-xs text-rice/50">{item.label}</span>
          </div>
          {index < 2 && (
            <span className="text-2xl text-gold/50">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

function PracticeTimer({ duration, onComplete }: { duration: number; onComplete?: () => void }) {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const totalSeconds = duration * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && elapsed < totalSeconds) {
      interval = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          if (next >= totalSeconds && onComplete) {
            onComplete();
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, elapsed, totalSeconds, onComplete]);

  const progress = (elapsed / totalSeconds) * 100;
  const remaining = totalSeconds - elapsed;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div className="space-y-6">
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-rice/10"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="text-gold"
            initial={false}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-rice tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <span className="text-sm text-rice/50 mt-1">剩余时间</span>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <Button
          size="lg"
          onClick={() => setIsRunning(!isRunning)}
          className={cn(
            "w-20 h-20 rounded-full",
            isRunning
              ? "bg-red-400/20 hover:bg-red-400/30 text-red-400 border-red-400/30"
              : "bg-gold/20 hover:bg-gold/30 text-gold border-gold/30"
          )}
        >
          {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            setIsRunning(false);
            setElapsed(0);
          }}
          className="w-20 h-20 rounded-full border-gold/20 text-rice hover:bg-gold/10"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>

      <div className="w-full h-2 bg-rice/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold to-gold/60 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

function SyncAnimation() {
  return (
    <div className="flex items-center justify-center gap-4 py-8">
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className="w-3 h-3 rounded-full bg-gold"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
}

export default function PracticeTogether({
  practice,
  currentUserId,
  onJoin,
  onStart,
  onComplete,
  className,
}: PracticeTogetherProps) {
  const [practiceState, setPracticeState] = useState<TeamPracticeStatus>(practice.status);
  const isParticipant = currentUserId && practice.participants.includes(currentUserId);
  const canJoin = !isParticipant && practice.status === "scheduled";

  const handleStart = useCallback(() => {
    setPracticeState("ongoing");
    onStart?.();
  }, [onStart]);

  const handleComplete = useCallback(() => {
    setPracticeState("completed");
    onComplete?.();
  }, [onComplete]);

  return (
    <div className={cn("space-y-6", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-gold/20 bg-gradient-to-br from-ink/80 to-ink/60 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-rice">{practice.gongfaName}</h2>
            <p className="text-sm text-rice/60 mt-1">
              {new Date(practice.scheduledTime).toLocaleString()}
            </p>
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-sm font-medium",
            practiceState === "scheduled" && "bg-blue-400/10 text-blue-400",
            practiceState === "ongoing" && "bg-gold/10 text-gold",
            practiceState === "completed" && "bg-emerald-400/10 text-emerald-400",
            practiceState === "cancelled" && "bg-red-400/10 text-red-400",
          )}>
            {practiceState === "scheduled" && "即将开始"}
            {practiceState === "ongoing" && "进行中"}
            {practiceState === "completed" && "已完成"}
            {practiceState === "cancelled" && "已取消"}
          </div>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2 text-rice/70">
            <Clock className="w-4 h-4" />
            <span>{practice.duration}分钟</span>
          </div>
          <div className="flex items-center gap-2 text-rice/70">
            <Users className="w-4 h-4" />
            <span>{practice.participants.length}人参与</span>
          </div>
          <div className="flex items-center gap-2 text-gold">
            <Zap className="w-4 h-4" />
            <span>+{Math.min(50, practice.participants.length * 10)}%经验</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {practiceState === "scheduled" && (
            <motion.div
              key="scheduled"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <CountdownTimer
                targetTime={new Date(practice.scheduledTime)}
                onComplete={handleStart}
              />
              
              {canJoin && onJoin && (
                <Button
                  onClick={onJoin}
                  className="w-full bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  加入修炼
                </Button>
              )}
              
              {isParticipant && (
                <div className="text-center py-3 text-sm text-emerald-400 bg-emerald-400/10 rounded-lg border border-emerald-400/20">
                  <CheckCircle2 className="w-4 h-4 inline mr-1" />
                  已加入，等待开始
                </div>
              )}
            </motion.div>
          )}

          {practiceState === "ongoing" && (
            <motion.div
              key="ongoing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <SyncAnimation />
              <PracticeTimer
                duration={practice.duration}
                onComplete={handleComplete}
              />
              <div className="flex items-center justify-center gap-2 text-sm text-rice/50">
                <Users className="w-4 h-4" />
                <span>{practice.participants.length}人正在同步修炼</span>
              </div>
            </motion.div>
          )}

          {practiceState === "completed" && (
            <motion.div
              key="completed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-4 py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
              </motion.div>
              <h3 className="text-xl font-bold text-rice">修炼完成</h3>
              <p className="text-rice/60">
                本次修炼共{practice.duration}分钟，获得经验加成
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">+{practice.duration * 10}</div>
                  <div className="text-xs text-rice/50">基础经验</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">
                    +{Math.floor(practice.duration * 10 * 0.3)}
                  </div>
                  <div className="text-xs text-rice/50">组队加成(30%)</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
