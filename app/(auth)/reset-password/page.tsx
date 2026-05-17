"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validatePassword, getPasswordStrength } from "@/lib/auth-utils";
import { Lock, ArrowLeft, CheckCircle } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: "", color: "" });

  useEffect(() => {
    if (!token) {
      setError("无效的重置链接");
    }
  }, [token]);

  useEffect(() => {
    setPasswordStrength(getPasswordStrength(password));
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("无效的重置链接");
      return;
    }

    const validation = validatePassword(password);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    if (password !== confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        setError(data.error?.message || "重置失败，请重试");
      }
    } catch {
      setError("网络错误，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-serif-cn font-bold text-charcoal mb-2">
          密码重置成功
        </h1>
        <p className="text-muted-foreground mb-6">
          您的密码已成功更新，请使用新密码登录
        </p>
        <Link href="/login">
          <Button className="bg-cinnabar hover:bg-cinnabar-dark text-white">
            前往登录
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">
          新密码
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="至少8位，包含字母和数字"
            className="pl-10 bg-rice-paper border-gold/30 focus:border-gold focus:ring-gold/20"
          />
        </div>
        {password && (
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${(passwordStrength.score / 5) * 100}%`,
                    backgroundColor: passwordStrength.color,
                  }}
                />
              </div>
              <span className="text-xs" style={{ color: passwordStrength.color }}>
                {passwordStrength.label}
              </span>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">
          确认密码
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="再次输入新密码"
            className="pl-10 bg-rice-paper border-gold/30 focus:border-gold focus:ring-gold/20"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-cinnabar">{error}</p>
      )}

      <Button
        type="submit"
        disabled={isLoading || !token}
        className="w-full bg-cinnabar hover:bg-cinnabar-dark text-white"
      >
        {isLoading ? (
          <span className="animate-breathe">重置中...</span>
        ) : (
          "重置密码"
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
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif-cn font-bold text-charcoal mb-2">
            重置密码
          </h1>
          <p className="text-muted-foreground">
            设置您的新密码
          </p>
        </div>
        <Suspense fallback={<div className="text-center py-8">加载中...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
