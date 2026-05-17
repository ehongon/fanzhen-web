"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type DailyMission,
} from "@/lib/gamification-data";
import {
  Flame,
  BookOpen,
  MessageCircle,
  Zap,
  CheckCircle2,
  Circle,
  Gift,
  Target,
} from "lucide-react";

const missionIconMap: Record<string, React.ElementType> = {
  Flame,
  BookOpen,
  MessageCircle,
  Zap,
  Target,
  Gift,
};

interface DailyMissionProps {
  missions: DailyMission[];
  onClaim?: (missionId: string) => void;
  className?: string;
}

export function DailyMissionList({ missions, onClaim, className }: DailyMissionProps) {
  const completedCount = missions.filter((m) => m.completed).length;
  const claimedCount = missions.filter((m) => m.claimed).length;
  const totalExp = missions
    .filter((m) => m.completed && !m.claimed)
    .reduce((sum, m) => sum + m.expReward, 0);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">每日任务</CardTitle>
          </div>
          <div className="text-sm text-muted-foreground">
            {completedCount}/{missions.length} 完成
          </div>
        </div>

        {/* 总体进度 */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / missions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {missions.map((mission, index) => {
          const IconComponent = missionIconMap[mission.icon] || Target;
          const progress = Math.min(mission.current / mission.target, 1);
          const canClaim = mission.completed && !mission.claimed;

          return (
            <motion.div
              key={mission.id}
              className={cn(
                "relative p-3 rounded-xl border transition-all",
                mission.claimed
                  ? "bg-muted/50 border-muted"
                  : mission.completed
                  ? "bg-primary/5 border-primary/20"
                  : "bg-card border-border hover:border-border/80"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                {/* 图标 */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    mission.claimed
                      ? "bg-muted text-muted-foreground"
                      : mission.completed
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent"
                  )}
                >
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={cn(
                        "font-medium text-sm",
                        mission.claimed && "text-muted-foreground line-through"
                      )}
                    >
                      {mission.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      +{mission.expReward} XP
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-2">
                    {mission.description}
                  </p>

                  {/* 进度条 */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={cn(
                          "h-full rounded-full",
                          mission.completed
                            ? "bg-primary"
                            : "bg-accent"
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {mission.current}/{mission.target} {mission.unit}
                    </span>
                  </div>
                </div>

                {/* 状态/领取按钮 */}
                <div className="flex-shrink-0">
                  {mission.claimed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : canClaim ? (
                    <Button
                      size="sm"
                      className="h-8 text-xs gap-1"
                      onClick={() => onClaim?.(mission.id)}
                    >
                      <Gift className="w-3 h-3" />
                      领取
                    </Button>
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* 可领取总奖励 */}
        {totalExp > 0 && (
          <motion.div
            className="flex items-center justify-between p-3 bg-primary/5 rounded-xl border border-primary/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-sm font-medium">可领取总奖励</span>
            <span className="text-sm font-bold text-primary">+{totalExp} XP</span>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

interface DailyMissionMiniProps {
  missions: DailyMission[];
  className?: string;
}

export function DailyMissionMini({ missions, className }: DailyMissionMiniProps) {
  const completedCount = missions.filter((m) => m.completed).length;
  const progress = completedCount / missions.length;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">每日任务</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {completedCount}/{missions.length}
        </span>
      </div>

      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex gap-1 mt-2">
        {missions.map((mission) => {
          const IconComponent = missionIconMap[mission.icon] || Target;
          return (
            <div
              key={mission.id}
              className={cn(
                "flex-1 h-8 rounded-md flex items-center justify-center",
                mission.claimed
                  ? "bg-green-100 text-green-600"
                  : mission.completed
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
              title={mission.title}
            >
              <IconComponent className="w-4 h-4" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
