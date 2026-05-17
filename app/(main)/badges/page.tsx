"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { badges, mockUserBadges } from "@/lib/badge-data";
import BadgeGallery from "@/components/gamification/badge-gallery";
import BadgeNotification from "@/components/gamification/badge-notification";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BadgesPage() {
  const [showSecret, setShowSecret] = useState(false);
  const [notificationBadge, setNotificationBadge] = useState<{
    badge: typeof badges[0];
    userBadge: typeof mockUserBadges[0];
  } | null>(null);

  // 模拟获得徽章的通知（实际项目中由后端触发）
  const simulateEarnBadge = (badgeId: string) => {
    const badge = badges.find((b) => b.id === badgeId);
    const userBadge = mockUserBadges.find((ub) => ub.badgeId === badgeId);
    if (badge && userBadge) {
      setNotificationBadge({ badge, userBadge });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 页面头部 */}
      <div className="bg-ink-gradient text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
              <Shield className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              徽章墙
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              在修炼之路上，每一枚徽章都是成长的印记。收集徽章，见证你的修行历程。
            </p>
          </motion.div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 控制栏 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              我的徽章
            </h2>
            <p className="text-sm text-muted-foreground">
              已获得 {mockUserBadges.length} / {badges.length} 枚徽章
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSecret(!showSecret)}
            className="gap-2"
          >
            {showSecret ? (
              <>
                <EyeOff className="w-4 h-4" />
                隐藏秘密徽章
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                显示秘密徽章
              </>
            )}
          </Button>
        </div>

        {/* 徽章展示 */}
        <BadgeGallery
          badges={badges}
          userBadges={mockUserBadges}
          showSecret={showSecret}
        />

        {/* 测试按钮（实际项目中删除） */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">测试徽章通知：</p>
          <div className="flex flex-wrap gap-2">
            {mockUserBadges.slice(0, 3).map((ub) => {
              const badge = badges.find((b) => b.id === ub.badgeId);
              return (
                <Button
                  key={ub.badgeId}
                  variant="outline"
                  size="sm"
                  onClick={() => simulateEarnBadge(ub.badgeId)}
                >
                  测试：{badge?.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 徽章获得通知 */}
      {notificationBadge && (
        <BadgeNotification
          badge={notificationBadge.badge}
          userBadge={notificationBadge.userBadge}
          onClose={() => setNotificationBadge(null)}
          onShare={() => {
            // 分享功能
            console.log("分享徽章:", notificationBadge.badge.name);
          }}
        />
      )}
    </div>
  );
}
