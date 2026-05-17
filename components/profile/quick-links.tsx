"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Heart,
  Edit3,
  HelpCircle,
  ChevronRight,
  Target,
  Settings,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuickLink {
  label: string;
  icon: LucideIcon;
  href: string;
  color: string;
  bgColor: string;
}

interface QuickLinksProps {
  links?: QuickLink[];
}

const defaultLinks: QuickLink[] = [
  {
    label: "我的修炼记录",
    icon: BookOpen,
    href: "#records",
    color: "text-cinnabar",
    bgColor: "bg-cinnabar/10",
  },
  {
    label: "我的收藏",
    icon: Heart,
    href: "#favorites",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    label: "我的心得",
    icon: Edit3,
    href: "#posts",
    color: "text-gold-dark",
    bgColor: "bg-gold/10",
  },
  {
    label: "我的问答",
    icon: HelpCircle,
    href: "#qa",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    label: "修炼计划",
    icon: Target,
    href: "#plan",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    label: "设置",
    icon: Settings,
    href: "/profile/settings",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
  },
];

export default function QuickLinks({ links = defaultLinks }: QuickLinksProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="font-serif-cn font-semibold text-base sm:text-lg text-foreground mb-3 sm:mb-4">
        快捷入口
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-card rounded-xl border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 p-4 sm:p-5 flex items-center gap-3 group min-h-[44px]"
            >
              <div
                className={cn(
                  "w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  link.bgColor
                )}
              >
                <Icon className={cn("w-4 h-4 sm:w-5 sm:h-5", link.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-foreground group-hover:text-cinnabar transition-colors block truncate">
                  {link.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-cinnabar transition-colors flex-shrink-0" />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}
