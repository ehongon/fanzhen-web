"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Globe,
  HeartPulse,
  Flower2,
  Sparkles,
  Sword,
  CircleDot,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/dianji-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  YinYang: CircleDot,
  Lotus: Flower2,
  BookOpen,
  HeartPulse,
  Sword,
  Sparkles,
  Globe,
};

interface CategoryCardProps {
  category: Category;
  index: number;
  isActive?: boolean;
  onClick?: () => void;
}

export default function CategoryCard({
  category,
  index,
  isActive,
  onClick,
}: CategoryCardProps) {
  const Icon = iconMap[category.icon] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={cn(
        "group cursor-pointer rounded-xl border-2 p-5 transition-all duration-300",
        "hover:shadow-xl hover:shadow-black/10",
        "bg-white/80 backdrop-blur-sm",
        isActive
          ? cn(category.borderColor, "ring-2 ring-offset-2 ring-cinnabar/30")
          : category.borderColor
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
            category.bgColor
          )}
        >
          <Icon className={cn("h-6 w-6", category.color)} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-charcoal group-hover:text-cinnabar transition-colors">
              {category.name}
            </h3>
            <span
              className={cn(
                "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                category.bgColor,
                category.color
              )}
            >
              {category.count}部
            </span>
          </div>

          <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
            {category.description}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {category.representativeCodes.slice(0, 3).map((code) => (
                <span
                  key={code}
                  className="inline-block rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {code}
                </span>
              ))}
            </div>
            <ChevronRight
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                isActive && "rotate-90 text-cinnabar",
                "group-hover:translate-x-0.5"
              )}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
