"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { User, Settings, LogOut, ChevronDown, UserCircle } from "lucide-react";

export function UserMenu() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    logout();
    setIsOpen(false);
    // 使用window.location确保cookie被清除后刷新
    window.location.href = "/";
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm text-charcoal hover:text-cinnabar transition-colors"
        >
          登录
        </Link>
        <Link
          href="/register"
          className="text-sm px-4 py-2 bg-cinnabar text-white rounded-md hover:bg-cinnabar-dark transition-colors"
        >
          注册
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gold/10 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-cinnabar/20 flex items-center justify-center">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <UserCircle className="w-5 h-5 text-cinnabar" />
          )}
        </div>
        <span className="text-sm text-charcoal hidden sm:block">{user?.name}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-rice-paper border border-gold/20 rounded-md shadow-lg z-50 py-1">
            <div className="px-4 py-2 border-b border-gold/10">
              <p className="text-sm font-medium text-charcoal">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal hover:bg-gold/10 transition-colors"
            >
              <User className="w-4 h-4" />
              个人中心
            </Link>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal hover:bg-gold/10 transition-colors"
            >
              <Settings className="w-4 h-4" />
              设置
            </Link>

            <div className="border-t border-gold/10 mt-1 pt-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-cinnabar hover:bg-cinnabar/10 transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                退出登录
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
