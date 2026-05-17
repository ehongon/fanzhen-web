"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Send,
  X,
  Award,
  ChevronLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: string;
  };
  content: string;
  likes: number;
  publishedAt: string;
}

export interface PostDetailProps {
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
  comments: Comment[];
  onClose?: () => void;
}

export default function PostDetail({
  title,
  content,
  author,
  tags,
  stats,
  publishedAt,
  comments: initialComments,
  onClose,
}: PostDetailProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(stats.likes);
  const [bookmarkCount, setBookmarkCount] = useState(stats.bookmarks);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    setBookmarkCount(bookmarked ? bookmarkCount - 1 : bookmarkCount + 1);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "我",
        avatar: "我",
        level: "炼精化气",
      },
      content: newComment,
      likes: 0,
      publishedAt: "刚刚",
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  const displayedComments = showAllComments
    ? comments
    : comments.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-card rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <button
            onClick={onClose}
            className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">返回</span>
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* 作者信息 */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-cinnabar/30 flex items-center justify-center text-xl">
                  {author.avatar || author.name[0]}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                  <Award className="w-3 h-3 text-ink" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">
                    {author.name}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs px-2 py-0 h-5 border-0",
                      author.levelColor
                    )}
                  >
                    {author.level}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {publishedAt}
                </span>
              </div>
            </div>

            {/* 标题 */}
            <h2 className="font-serif-cn font-bold text-2xl text-foreground mb-4">
              {title}
            </h2>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.stage && (
                <Badge
                  variant="secondary"
                  className="bg-cinnabar/10 text-cinnabar hover:bg-cinnabar/20"
                >
                  {tags.stage}
                </Badge>
              )}
              {tags.gongfa && (
                <Badge
                  variant="secondary"
                  className="bg-gold/10 text-gold-dark hover:bg-gold/20"
                >
                  {tags.gongfa}
                </Badge>
              )}
              {tags.topic && (
                <Badge
                  variant="secondary"
                  className="bg-ink/5 text-ink-light hover:bg-ink/10"
                >
                  {tags.topic}
                </Badge>
              )}
            </div>

            {/* 正文 */}
            <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-wrap mb-6">
              {content}
            </div>

            {/* 互动按钮 */}
            <div className="flex items-center justify-between py-4 border-t border-b border-border/50 mb-6">
              <div className="flex items-center space-x-6">
                <button
                  onClick={handleLike}
                  className={cn(
                    "flex items-center space-x-2 transition-colors",
                    liked
                      ? "text-cinnabar"
                      : "text-muted-foreground hover:text-cinnabar"
                  )}
                >
                  <Heart
                    className={cn("w-5 h-5", liked && "fill-current")}
                  />
                  <span className="font-medium">{likeCount}</span>
                </button>
                <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">{comments.length}</span>
                </button>
                <button
                  onClick={handleBookmark}
                  className={cn(
                    "flex items-center space-x-2 transition-colors",
                    bookmarked
                      ? "text-gold"
                      : "text-muted-foreground hover:text-gold"
                  )}
                >
                  <Bookmark
                    className={cn("w-5 h-5", bookmarked && "fill-current")}
                  />
                  <span className="font-medium">{bookmarkCount}</span>
                </button>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* 评论输入 */}
            <div className="mb-6">
              <h3 className="font-serif-cn font-semibold text-lg mb-3">
                发表评论
              </h3>
              <div className="flex space-x-3">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="分享你的想法..."
                  className="flex-1 min-h-[80px] resize-none"
                />
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="bg-cinnabar hover:bg-cinnabar-light text-rice self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* 评论列表 */}
            <div>
              <h3 className="font-serif-cn font-semibold text-lg mb-3">
                评论 ({comments.length})
              </h3>
              <AnimatePresence>
                {displayedComments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex space-x-3 mb-4 pb-4 border-b border-border/30 last:border-0"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/20 to-cinnabar/20 flex items-center justify-center text-sm flex-shrink-0">
                      {comment.author.avatar || comment.author.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">
                          {comment.author.name}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-xs px-1.5 py-0 h-4 border-gold/30 text-gold-dark"
                        >
                          {comment.author.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {comment.publishedAt}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {comment.content}
                      </p>
                      <button className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground hover:text-cinnabar transition-colors">
                        <Heart className="w-3 h-3" />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {comments.length > 3 && !showAllComments && (
                <button
                  onClick={() => setShowAllComments(true)}
                  className="w-full py-2 text-sm text-cinnabar hover:text-cinnabar-dark transition-colors"
                >
                  查看全部 {comments.length} 条评论
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
