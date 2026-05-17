"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateEmail } from "@/lib/auth-utils";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !validateEmail(email)) {
      setError("请输入有效的邮箱地址");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setIsSent(true);
      } else {
        setError(data.error?.message || "发送失败，请重试");
      }
    } catch {
      setError("网络错误，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-serif-cn font-bold text-charcoal mb-2">
            重置链接已发送
          </h1>
          <p className="text-muted-foreground mb-6">
            如果该邮箱已注册，您将收到密码重置链接
          </p>
          <Link
            href="/login"
            className="inline-flex items-center text-cinnabar hover:text-cinnabar-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回登录
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif-cn font-bold text-charcoal mb-2">
            找回密码
          </h1>
          <p className="text-muted-foreground">
            输入您的邮箱，我们将发送重置链接
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              邮箱地址
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入邮箱"
                className="pl-10 bg-rice-paper border-gold/30 focus:border-gold focus:ring-gold/20"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-cinnabar">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cinnabar hover:bg-cinnabar-dark text-white"
          >
            {isLoading ? (
              <span className="animate-breathe">发送中...</span>
            ) : (
              "发送重置链接"
            )}
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-cinnabar transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              返回登录
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
