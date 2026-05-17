"use client";

import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Flame,
  Award,
  Edit3,
  Camera,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface UserProfile {
  name: string;
  avatar: string;
  level: string;
  levelColor: string;
  registerDate: string;
  streakDays: number;
  constitution: string;
  mainGongfa: string;
}

interface ProfileCardProps {
  user: UserProfile;
  onEdit?: () => void;
  onAvatarUpload?: () => void;
}

export default function ProfileCard({ user, onEdit, onAvatarUpload }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl border border-border/50 shadow-card p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* 头像 */}
        <div className="relative group self-center sm:self-start">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-gold/30 to-cinnabar/30 flex items-center justify-center text-3xl sm:text-4xl border-2 border-gold/30">
            {user.avatar}
          </div>
          <button
            onClick={onAvatarUpload}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-cinnabar text-rice flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg active:opacity-100 sm:active:opacity-0"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* 用户信息 */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground font-serif-cn">
              {user.name}
            </h2>
            <Badge
              variant="outline"
              className={cn("px-2 py-0.5 h-6 border-0", user.levelColor)}
            >
              <Award className="w-3 h-3 mr-1" />
              {user.level}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>注册于 {user.registerDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-cinnabar" />
              <span>连续修炼 {user.streakDays} 天</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
            <Badge variant="secondary" className="text-xs">
              <Shield className="w-3 h-3 mr-1" />
              {user.constitution}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              主修: {user.mainGongfa}
            </Badge>
          </div>
        </div>

        {/* 编辑按钮 */}
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="border-gold/30 text-gold-dark hover:bg-gold/10 self-center sm:self-start min-h-[44px]"
        >
          <Edit3 className="w-4 h-4 mr-1" />
          编辑资料
        </Button>
      </div>
    </motion.div>
  );
}
