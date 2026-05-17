"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge, UserBadge, tierConfig } from "@/lib/badge-data";
import { Button } from "@/components/ui/button";
import { Share2, X, Sparkles, Star, Trophy } from "lucide-react";

interface BadgeNotificationProps {
  badge: Badge;
  userBadge: UserBadge;
  onClose: () => void;
  onShare?: () => void;
}

export default function BadgeNotification({
  badge,
  userBadge,
  onClose,
  onShare,
}: BadgeNotificationProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const tierInfo = tierConfig[badge.tier as keyof typeof tierConfig];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 生成粒子效果
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 400 - 200,
    y: Math.random() * -300 - 50,
    rotation: Math.random() * 360,
    scale: Math.random() * 0.5 + 0.5,
    color: [badge.color, "#ffd700", "#c75b39", "#d4a574"][Math.floor(Math.random() * 4)],
    delay: Math.random() * 0.5,
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* 粒子效果 */}
        <AnimatePresence>
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  initial={{
                    x: "50vw",
                    y: "50vh",
                    scale: 0,
                    rotate: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: `calc(50vw + ${particle.x}px)`,
                    y: `calc(50vh + ${particle.y}px)`,
                    scale: particle.scale,
                    rotate: particle.rotation,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 2,
                    delay: particle.delay,
                    ease: "easeOut",
                  }}
                  className="absolute w-3 h-3 rounded-full"
                  style={{ backgroundColor: particle.color }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* 通知卡片 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: 0.1,
            },
          }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-card border border-border rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 overflow-hidden"
        >
          {/* 发光背景 */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at center, ${badge.color}, transparent 70%)`,
            }}
          />

          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* 内容 */}
          <div className="relative text-center">
            {/* 徽章图标 */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.3,
                },
              }}
              className="mx-auto mb-6"
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mx-auto relative"
                style={{
                  background: `linear-gradient(135deg, ${badge.color}30, ${badge.color}60)`,
                  border: `3px solid ${badge.color}`,
                  boxShadow: `0 0 30px ${badge.glowColor}, inset 0 0 20px ${badge.glowColor}`,
                }}
              >
                {badge.icon}

                {/* 旋转光环 */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `2px dashed ${badge.color}`,
                    opacity: 0.5,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </motion.div>

            {/* 标题 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="text-sm text-gold font-medium">
                  恭喜获得新徽章！
                </span>
                <Sparkles className="w-5 h-5 text-gold" />
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-1">
                {badge.name}
              </h2>

              <div className="flex items-center justify-center gap-1 mb-3">
                <Star className="w-4 h-4" style={{ color: badge.color }} />
                <span className="text-sm text-muted-foreground">
                  {tierInfo?.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({tierInfo?.stars})
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {badge.description}
              </p>

              {/* 奖励信息 */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="bg-gold/10 rounded-lg px-4 py-2">
                  <p className="text-xs text-muted-foreground">经验奖励</p>
                  <p className="text-lg font-bold text-gold">
                    +{badge.expReward * userBadge.tier} EXP
                  </p>
                </div>
                <div className="bg-cinnabar/10 rounded-lg px-4 py-2">
                  <p className="text-xs text-muted-foreground">获得时间</p>
                  <p className="text-sm font-medium text-cinnabar">
                    {userBadge.earnedAt.toLocaleDateString("zh-CN")}
                  </p>
                </div>
              </div>

              {/* 按钮 */}
              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  className="flex-1 bg-cinnabar hover:bg-cinnabar-dark text-white"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  太棒了！
                </Button>
                {onShare && (
                  <Button
                    variant="outline"
                    onClick={onShare}
                    className="flex-1"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    分享
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// 连续获得徽章的通知
interface MultiBadgeNotificationProps {
  badges: { badge: Badge; userBadge: UserBadge }[];
  onClose: () => void;
}

export function MultiBadgeNotification({
  badges,
  onClose,
}: MultiBadgeNotificationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < badges.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, badges.length]);

  const current = badges[currentIndex];

  if (!current) return null;

  return (
    <BadgeNotification
      badge={current.badge}
      userBadge={current.userBadge}
      onClose={isComplete ? onClose : () => setCurrentIndex((prev) => prev + 1)}
    />
  );
}
