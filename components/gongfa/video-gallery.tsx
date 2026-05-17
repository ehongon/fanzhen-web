"use client";

import { motion } from "framer-motion";
import { Play, Clock, User, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { VideoLink } from "@/lib/gongfa-data";

interface VideoGalleryProps {
  videos: VideoLink[];
}

function getPlatformIcon(platform: VideoLink["platform"]) {
  if (platform === "bilibili") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="currentColor"
      >
        <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="currentColor"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function getPlatformColor(platform: VideoLink["platform"]) {
  return platform === "bilibili"
    ? "bg-pink-50 text-pink-600 border-pink-200"
    : "bg-red-50 text-red-600 border-red-200";
}

function getPlatformLabel(platform: VideoLink["platform"]) {
  return platform === "bilibili" ? "哔哩哔哩" : "YouTube";
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  if (!videos || videos.length === 0) {
    return (
      <Card className="border-border/50">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">暂无修炼视频</p>
        </CardContent>
      </Card>
    );
  }

  const bilibiliVideos = videos.filter((v) => v.platform === "bilibili");
  const youtubeVideos = videos.filter((v) => v.platform === "youtube");

  return (
    <div className="space-y-8">
      {/* Bilibili 视频 */}
      {bilibiliVideos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-pink-500 rounded-full" />
            哔哩哔哩
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bilibiliVideos.map((video, index) => (
              <VideoCard key={index} video={video} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* YouTube 视频 */}
      {youtubeVideos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-red-500 rounded-full" />
            YouTube
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {youtubeVideos.map((video, index) => (
              <VideoCard key={index} video={video} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function VideoCard({ video, index }: { video: VideoLink; index: number }) {
  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="block group"
    >
      <Card className="border-border/50 overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        {/* 缩略图区域 */}
        <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center overflow-hidden">
          {/* 播放按钮 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-white/90 dark:bg-black/70 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <Play className="w-7 h-7 text-primary fill-primary ml-1" />
            </motion.div>
          </div>

          {/* 平台标签 */}
          <div className="absolute top-3 left-3">
            <span className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
              getPlatformColor(video.platform)
            )}>
              {getPlatformIcon(video.platform)}
              {getPlatformLabel(video.platform)}
            </span>
          </div>

          {/* 时长标签 */}
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-medium">
              <Clock className="w-3 h-3" />
              {video.duration}
            </span>
          </div>
        </div>

        {/* 内容区域 */}
        <CardContent className="p-4">
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {video.title}
          </h4>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <User className="w-3.5 h-3.5" />
            <span>{video.instructor}</span>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {video.description}
          </p>

          <div className="flex items-center gap-1 text-xs text-primary font-medium group-hover:underline">
            <ExternalLink className="w-3 h-3" />
            点击观看
          </div>
        </CardContent>
      </Card>
    </motion.a>
  );
}

// 需要导入 cn 函数
import { cn } from "@/lib/utils";
