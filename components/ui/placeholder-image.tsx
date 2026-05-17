"use client";

import { cn } from "@/lib/utils";
import {
  Mountain,
  BookOpen,
  MapPin,
  User,
  Activity,
  type LucideIcon,
} from "lucide-react";

export type PlaceholderType = "hero" | "gongfa" | "dianji" | "profile" | "meridian";

interface PlaceholderImageProps {
  type: PlaceholderType;
  title?: string;
  subtitle?: string;
  className?: string;
  iconSize?: number;
  aspectRatio?: string;
}

const typeConfig: Record<
  PlaceholderType,
  {
    icon: LucideIcon;
    gradient: string;
    iconColor: string;
    textColor: string;
    borderColor: string;
    glowColor: string;
  }
> = {
  hero: {
    icon: Mountain,
    gradient: "from-ink-dark via-ink to-ink-light",
    iconColor: "text-gold/60",
    textColor: "text-gold",
    borderColor: "border-gold/20",
    glowColor: "rgba(212, 165, 116, 0.15)",
  },
  gongfa: {
    icon: BookOpen,
    gradient: "from-cinnabar/20 via-ink to-ink-light",
    iconColor: "text-cinnabar/60",
    textColor: "text-cinnabar",
    borderColor: "border-cinnabar/20",
    glowColor: "rgba(199, 91, 57, 0.15)",
  },
  dianji: {
    icon: MapPin,
    gradient: "from-sky-400/20 via-ink to-ink-light",
    iconColor: "text-sky-400/60",
    textColor: "text-sky-400",
    borderColor: "border-sky-400/20",
    glowColor: "rgba(56, 189, 248, 0.15)",
  },
  profile: {
    icon: User,
    gradient: "from-gold/20 via-ink to-ink-light",
    iconColor: "text-gold/60",
    textColor: "text-gold",
    borderColor: "border-gold/20",
    glowColor: "rgba(212, 165, 116, 0.15)",
  },
  meridian: {
    icon: Activity,
    gradient: "from-emerald-500/20 via-ink to-ink-light",
    iconColor: "text-emerald-500/60",
    textColor: "text-emerald-500",
    borderColor: "border-emerald-500/20",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
};

export default function PlaceholderImage({
  type,
  title,
  subtitle,
  className,
  iconSize = 48,
  aspectRatio = "aspect-video",
}: PlaceholderImageProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border",
        config.borderColor,
        aspectRatio,
        className
      )}
      style={{
        boxShadow: `inset 0 0 40px ${config.glowColor}`,
      }}
    >
      {/* Gradient background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          config.gradient
        )}
      />

      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${config.glowColor}, transparent)` }}
        />
        <div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${config.glowColor}, transparent)` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
        <div
          className={cn(
            "mb-4 p-4 rounded-full bg-white/5 backdrop-blur-sm",
            config.borderColor,
            "border"
          )}
        >
          <Icon className={config.iconColor} size={iconSize} strokeWidth={1.5} />
        </div>

        {title && (
          <h3 className={cn("text-lg font-serif-cn font-bold", config.textColor)}>
            {title}
          </h3>
        )}

        {subtitle && (
          <p className="text-sm text-rice/50 mt-1">{subtitle}</p>
        )}

        {!title && !subtitle && (
          <span className={cn("text-sm font-serif-cn", config.textColor, "opacity-60")}>
            {type === "hero" && "山水意境"}
            {type === "gongfa" && "功法图示"}
            {type === "dianji" && "典籍插图"}
            {type === "profile" && "个人头像"}
            {type === "meridian" && "经脉图示"}
          </span>
        )}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t border-l opacity-30" style={{ borderColor: config.glowColor }} />
      <div className="absolute top-3 right-3 w-6 h-6 border-t border-r opacity-30" style={{ borderColor: config.glowColor }} />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l opacity-30" style={{ borderColor: config.glowColor }} />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r opacity-30" style={{ borderColor: config.glowColor }} />
    </div>
  );
}

// Simple placeholder for inline use
export function InlinePlaceholder({
  type,
  size = 40,
  className,
}: {
  type: PlaceholderType;
  size?: number;
  className?: string;
}) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-lg border",
        config.borderColor,
        className
      )}
      style={{
        width: size,
        height: size,
        boxShadow: `inset 0 0 20px ${config.glowColor}`,
      }}
    >
      <Icon
        size={size * 0.4}
        className={config.iconColor}
        strokeWidth={1.5}
      />
    </div>
  );
}
