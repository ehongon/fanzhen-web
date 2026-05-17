"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Zap, UserPlus, UserCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DaoFriend, getDaoFriendTypeLabel, DaoFriendType, DaoFriendStatus } from "@/lib/team-data";
import { cn } from "@/lib/utils";

interface DaoFriendCardProps {
  friend: DaoFriend;
  friendUser?: {
    id: string;
    name: string;
    avatar?: string;
    status?: string;
    currentStage?: string;
  };
  onAccept?: (friendId: string) => void;
  onReject?: (friendId: string) => void;
  onInteract?: (friendId: string) => void;
  className?: string;
}

function IntimacyBar({ intimacy }: { intimacy: number }) {
  const hearts = Math.ceil(intimacy / 20);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Heart
          key={i}
          className={cn(
            "w-3.5 h-3.5",
            i < hearts ? "text-red-400 fill-red-400" : "text-rice/20"
          )}
        />
      ))}
      <span className="text-xs text-rice/50 ml-1">{intimacy}</span>
    </div>
  );
}

function TypeBadge({ type }: { type: DaoFriendType }) {
  const colors: Record<DaoFriendType, string> = {
    peer: "bg-blue-400/10 text-blue-400 border-blue-400/30",
    master: "bg-gold/10 text-gold border-gold/30",
    student: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
    partner: "bg-red-400/10 text-red-400 border-red-400/30",
  };

  return (
    <Badge variant="outline" className={cn("text-xs", colors[type])}>
      {getDaoFriendTypeLabel(type)}
    </Badge>
  );
}

function StatusBadge({ status }: { status: DaoFriendStatus }) {
  const config = {
    pending: { label: "待确认", className: "bg-yellow-400/10 text-yellow-400 border-yellow-400/30" },
    accepted: { label: "已结交", className: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30" },
    blocked: { label: "已屏蔽", className: "bg-red-400/10 text-red-400 border-red-400/30" },
  };

  const { label, className } = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs", className)}>
      {label}
    </Badge>
  );
}

export default function DaoFriendCard({
  friend,
  friendUser,
  onAccept,
  onReject,
  onInteract,
  className,
}: DaoFriendCardProps) {
  const isPending = friend.status === "pending";
  const isAccepted = friend.status === "accepted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={cn(
        "relative rounded-xl border border-gold/20 bg-gradient-to-br from-ink/80 to-ink/60 p-5 group",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border-2 border-gold/30 flex items-center justify-center text-xl text-rice">
            {friendUser?.name?.charAt(0) || "?"}
          </div>
          {isAccepted && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-ink flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-200" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-rice truncate">
              {friendUser?.name || `用户${friend.friendId.slice(-4)}`}
            </h3>
            <TypeBadge type={friend.type} />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <StatusBadge status={friend.status} />
            {friendUser?.currentStage && (
              <span className="text-xs text-rice/50">{friendUser.currentStage}</span>
            )}
          </div>

          {isAccepted && (
            <div className="mb-3">
              <IntimacyBar intimacy={friend.intimacy} />
            </div>
          )}

          {friend.lastInteractionAt && (
            <div className="flex items-center gap-1 text-xs text-rice/40">
              <Clock className="w-3 h-3" />
              上次互动: {new Date(friend.lastInteractionAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        {isPending && (
          <>
            {onAccept && (
              <Button
                size="sm"
                onClick={() => onAccept(friend.id)}
                className="flex-1 bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-400 border border-emerald-400/30"
              >
                <UserCheck className="w-4 h-4 mr-1" />
                接受
              </Button>
            )}
            {onReject && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onReject(friend.id)}
                className="flex-1 border-red-400/30 text-red-400 hover:bg-red-400/10"
              >
                拒绝
              </Button>
            )}
          </>
        )}

        {isAccepted && onInteract && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onInteract(friend.id)}
              className="flex-1 border-gold/20 text-rice hover:bg-gold/10"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              交流
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onInteract(friend.id)}
              className="flex-1 border-gold/20 text-gold hover:bg-gold/10"
            >
              <Zap className="w-4 h-4 mr-1" />
              鼓励
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}
