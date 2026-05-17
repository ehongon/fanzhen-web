"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LEVELS,
  getStageInfo,
  type Level,
} from "@/lib/gamification-data";
import {
  X,
  Share2,
  Sparkles,
  LockOpen,
  Award,
} from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  previousLevel: number;
}

export function LevelUpModal({
  isOpen,
  onClose,
  newLevel,
  previousLevel,
}: LevelUpModalProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showContent, setShowContent] = useState(false);

  const newLevelData = LEVELS.find((l) => l.id === newLevel) || LEVELS[0];
  const stageInfo = getStageInfo(newLevelData.stageCode);

  // 生成粒子效果
  const generateParticles = useCallback(() => {
    const colors = ["#FFD700", "#FFA500", "#FF6347", "#FF1493", "#9370DB", "#00CED1"];
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (isOpen) {
      generateParticles();
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
      setParticles([]);
    }
  }, [isOpen, generateParticles]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "凡真修炼 - 等级突破",
        text: `我在凡真修炼中突破到了${newLevelData.name}（Lv.${newLevel}），一起来修炼吧！`,
        url: window.location.href,
      });
    } else {
      // 复制到剪贴板
      navigator.clipboard.writeText(
        `我在凡真修炼中突破到了${newLevelData.name}（Lv.${newLevel}），一起来修炼吧！`
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 背景遮罩 */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 粒子效果 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -100, -200],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* 弹窗内容 */}
          <motion.div
            className="relative bg-card border rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* 顶部渐变背景 */}
            <div
              className={cn(
                "h-32 bg-gradient-to-b flex items-center justify-center relative",
                newLevelData.gradient
              )}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <Sparkles className="w-16 h-16 text-white" />
              </motion.div>

              {/* 关闭按钮 */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* 内容区域 */}
            <div className="p-6 text-center">
              <AnimatePresence>
                {showContent && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* 突破提示 */}
                    <div className="text-sm text-muted-foreground mb-2">
                      恭喜突破！
                    </div>

                    {/* 等级变化 */}
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <motion.div
                        className="text-2xl font-bold text-muted-foreground"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        Lv.{previousLevel}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                      >
                        <Award className="w-8 h-8 text-yellow-500" />
                      </motion.div>
                      <motion.div
                        className={cn(
                          "text-3xl font-bold",
                          newLevel <= 9
                            ? "text-green-600"
                            : newLevel <= 18
                            ? "text-blue-600"
                            : newLevel <= 27
                            ? "text-purple-600"
                            : "text-yellow-600"
                        )}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        Lv.{newLevel}
                      </motion.div>
                    </div>

                    {/* 新等级名称 */}
                    <motion.h2
                      className="text-2xl font-bold mb-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 }}
                    >
                      {newLevelData.name}
                    </motion.h2>

                    {/* 阶段信息 */}
                    <motion.div
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium mb-4",
                        "bg-gradient-to-r text-white",
                        stageInfo.gradient
                      )}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      {newLevelData.stage}
                    </motion.div>

                    {/* 等级描述 */}
                    <motion.p
                      className="text-muted-foreground text-sm mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      {newLevelData.description}
                    </motion.p>

                    {/* 解锁特权 */}
                    <motion.div
                      className="bg-muted rounded-xl p-4 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <LockOpen className="w-4 h-4 text-primary" />
                        <span className="font-medium">解锁新特权</span>
                      </div>
                      <ul className="space-y-2">
                        {newLevelData.benefits.map((benefit, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.8 + index * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {benefit}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* 操作按钮 */}
                    <motion.div
                      className="flex gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.2 }}
                    >
                      <Button
                        onClick={handleShare}
                        variant="outline"
                        className="flex-1 gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        分享成就
                      </Button>
                      <Button
                        onClick={onClose}
                        className={cn(
                          "flex-1 gap-2 bg-gradient-to-r text-white",
                          newLevelData.gradient
                        )}
                      >
                        继续修炼
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
