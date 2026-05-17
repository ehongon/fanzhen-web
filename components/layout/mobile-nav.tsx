"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Compass,
  BookOpen,
  Users,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "首页",
    href: "/",
    icon: Home,
  },
  {
    label: "修炼",
    href: "/system",
    icon: Compass,
  },
  {
    label: "同修",
    href: "/fellowship",
    icon: Users,
  },
  {
    label: "社区",
    href: "/community",
    icon: BookOpen,
  },
  {
    label: "我的",
    href: "/profile",
    icon: User,
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50 sm:hidden safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-16 h-full min-h-[44px] transition-colors",
                isActive ? "text-cinnabar" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {isActive && (
                  <motion.div
                    layoutId="mobileNavIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cinnabar"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
