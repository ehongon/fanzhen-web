"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PostCardProps {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    level: string;
    levelColor: string;
  };
  tags: {
    stage?: string;
    gongfa?: string;
    topic?: string;
  };
  stats: {
    likes: number;
    comments: number;
    bookmarks: number;
  };
  publishedAt: string;
  onClick?: () => void;
}

export default function PostCard({
  title,
  content,
  author,
  tags,
  stats,
  publishedAt,
  onClick,
}: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(stats.likes);
  const [bookmarkCount, setBookmarkCount] = useState(stats.bookmarks);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
    setBookmarkCount(bookmarked ? bookmarkCount - 1 : bookmarkCount + 1);
  };

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
        {/* 用户信息 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-cinnabar/30 flex items-center justify-center text-lg">
                {author.avatar || author.name[0]}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                <Award className="w-2.5 h-2.5 text-ink" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm text-foreground">
                  {author.name}
                </span>
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
              <span className="text-xs text-muted-foreground">{publishedAt}</span>
            </div>
          </div>
        </div>

        {/* 标题 */}
        <h3 className="font-serif-cn font-semibold text-lg text-foreground mb-2 line-clamp-2 hover:text-cinnabar transition-colors">
          {title}
        </h3>

        {/* 内容摘要 */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3 leading-relaxed">
          {content}
        </p>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.stage && (
            <Badge
              variant="secondary"
              className="bg-cinnabar/10 text-cinnabar hover:bg-cinnabar/20 text-xs"
            >
              {tags.stage}
            </Badge>
          )}
          {tags.gongfa && (
            <Badge
              variant="secondary"
              className="bg-gold/10 text-gold-dark hover:bg-gold/20 text-xs"
            >
              {tags.gongfa}
            </Badge>
          )}
          {tags.topic && (
            <Badge
              variant="secondary"
              className="bg-ink/5 text-ink-light hover:bg-ink/10 text-xs"
            >
              {tags.topic}
            </Badge>
          )}
        </div>

        {/* 互动数据 */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center space-x-1 text-sm transition-colors",
                liked
                  ? "text-cinnabar"
                  : "text-muted-foreground hover:text-cinnabar"
              )}
            >
              <Heart
                className={cn("w-4 h-4", liked && "fill-current")}
              />
              <span>{likeCount}</span>
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{stats.comments}</span>
            </button>
            <button
              onClick={handleBookmark}
              className={cn(
                "flex items-center space-x-1 text-sm transition-colors",
                bookmarked
                  ? "text-gold"
                  : "text-muted-foreground hover:text-gold"
              )}
            >
              <Bookmark
                className={cn("w-4 h-4", bookmarked && "fill-current")}
              />
              <span>{bookmarkCount}</span>
            </button>
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
