"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  items: {
    title: string;
    href: string;
  }[];
}

export default function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-card h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="p-4 space-y-2">
        <h2 className="mb-4 px-2 text-lg font-semibold tracking-tight">
          目录导航
        </h2>
        {items.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === item.href && "bg-accent"
            )}
            asChild
          >
            <Link href={item.href}>{item.title}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
