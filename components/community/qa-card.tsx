"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  CheckCircle2,
  HelpCircle,
  Award,
  ChevronRight,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface QACardProps {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    level: string;
    levelColor: string;
  };
  status: "solved" | "unsolved";
  answerCount: number;
  bestAnswer?: {
    content: string;
    author: string;
    likes: number;
  };
  bounty?: number;
  tags: string[];
  publishedAt: string;
  onClick?: () => void;
}

export default function QACard({
  title,
  content,
  author,
  status,
  answerCount,
  bestAnswer,
  bounty,
  tags,
  publishedAt,
  onClick,
}: QACardProps) {
  const [expanded, setExpanded] = useState(false);

  const isSolved = status === "solved";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="bg-card rounded-xl border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="p-5">
        {/* 头部：状态 + 悬赏 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className={cn(
                "flex items-center space-x-1 px-2 py-0.5 h-6",
                isSolved
                  ? "border-green-500/50 text-green-600 bg-green-50"
                  : "border-orange-500/50 text-orange-600 bg-orange-50"
              )}
            >
              {isSolved ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <HelpCircle className="w-3.5 h-3.5" />
              )}
              <span className="text-xs">
                {isSolved ? "已解决" : "待回答"}
              </span>
            </Badge>
            {bounty && bounty > 0 && (
              <Badge
                variant="outline"
                className="bg-gold/10 text-gold-dark border-gold/30 flex items-center space-x-1 px-2 py-0.5 h-6"
              >
                <Star className="w-3 h-3 fill-gold" />
                <span className="text-xs">悬赏 {bounty} 积分</span>
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{publishedAt}</span>
        </div>

        {/* 问题标题 */}
        <h3 className="font-serif-cn font-semibold text-lg text-foreground mb-2 line-clamp-2 hover:text-cinnabar transition-colors">
          {title}
        </h3>

        {/* 问题内容 */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
          {content}
        </p>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-ink/5 text-ink-light hover:bg-ink/10 text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* 最佳答案预览 */}
        {bestAnswer && (
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : "auto" }}
            className="bg-gold/5 rounded-lg p-3 mb-4 border border-gold/20"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-4 h-4 text-gold" />
              <span className="text-xs font-medium text-gold-dark">
                最佳答案
              </span>
              <span className="text-xs text-muted-foreground">
                by {bestAnswer.author}
              </span>
            </div>
            <p
              className={cn(
                "text-sm text-foreground leading-relaxed",
                !expanded && "line-clamp-2"
              )}
            >
              {bestAnswer.content}
            </p>
            {bestAnswer.content.length > 80 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                className="text-xs text-cinnabar hover:text-cinnabar-dark mt-1 transition-colors"
              >
                {expanded ? "收起" : "展开"}
              </button>
            )}
          </motion.div>
        )}

        {/* 底部信息 */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold/20 to-cinnabar/20 flex items-center justify-center text-xs">
                {author.avatar || author.name[0]}
              </div>
              <span className="text-sm text-foreground">{author.name}</span>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs px-1.5 py-0 h-4 border-0",
                  author.levelColor
                )}
              >
                {author.level}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>{answerCount} 回答</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
