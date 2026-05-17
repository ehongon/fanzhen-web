'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Star, Trophy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  exp: number;
  badge?: string;
  item?: string;
  streakDays?: number;
}

export function RewardModal({
  isOpen,
  onClose,
  exp,
  badge,
  item,
  streakDays,
}: RewardModalProps) {
  const [displayExp, setDisplayExp] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [showItem, setShowItem] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDisplayExp(0);
      setShowBadge(false);
      setShowItem(false);

      const duration = 1500;
      const steps = 60;
      const increment = exp / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= exp) {
          setDisplayExp(exp);
          clearInterval(timer);

          if (badge) {
            setTimeout(() => setShowBadge(true), 300);
          }
          if (item) {
            setTimeout(() => setShowItem(true), 600);
          }
        } else {
          setDisplayExp(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isOpen, exp, badge, item]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl bg-[hsl(40,33%,94%)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden p-6">
              <div className="absolute inset-0 bg-gradient-to-b from-[hsl(30,45%,65%)]/10 to-transparent" />

              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-1 text-[hsl(0,0%,45%)] hover:bg-[hsl(40,15%,90%)]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(30,45%,65%)] to-[hsl(14,55%,50%)] shadow-lg"
                >
                  <Sparkles className="h-10 w-10 text-white" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 font-serif-cn text-2xl font-bold text-[hsl(0,0%,18%)]"
                >
                  任务完成
                </motion.h2>

                {streakDays && streakDays > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-1 text-sm text-[hsl(0,0%,45%)]"
                  >
                    连续签到 {streakDays} 天
                  </motion.p>
                )}

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="mt-6"
                >
                  <div className="text-sm text-[hsl(0,0%,45%)]">获得经验</div>
                  <div className="mt-1 text-5xl font-bold text-[hsl(14,55%,50%)]">
                    +{displayExp}
                  </div>
                </motion.div>

                <AnimatePresence>
                  {showBadge && badge && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-amber-700"
                    >
                      <Trophy className="h-4 w-4" />
                      <span className="text-sm font-medium">获得徽章：{badge}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showItem && item && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-700"
                    >
                      <Star className="h-4 w-4" />
                      <span className="text-sm font-medium">获得物品：{item}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6 flex justify-center gap-2">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0, opacity: 0 }}
                      animate={{
                        y: [-10, -40, -80],
                        x: [0, (i - 3.5) * 15, (i - 3.5) * 30],
                        opacity: [0, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        delay: 0.6 + i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                      className="text-xl"
                    >
                      {i % 3 === 0 ? '✨' : i % 3 === 1 ? '⭐' : '🎉'}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={onClose}
                    className="flex-1 bg-cinnabar-gradient text-white hover:opacity-90"
                  >
                    太棒了
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: '凡真修炼',
                          text: `我在凡真连续签到${streakDays || 1}天，获得${exp}经验！`,
                        });
                      }
                    }}
                    className="border-[hsl(40,15%,85%)]"
                  >
                    <Share2 className="mr-1 h-4 w-4" />
                    分享
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
