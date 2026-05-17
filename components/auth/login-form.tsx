"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { validateEmail } from "@/lib/auth-utils";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = "邮箱不能为空";
    } else if (!validateEmail(email)) {
      newErrors.email = "邮箱格式不正确";
    }

    if (!password) {
      newErrors.password = "密码不能为空";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        login(data.data.user, data.data.token);
        // 延迟刷新以确保cookie已设置
        setTimeout(() => {
          window.location.href = "/";
        }, 100);
      } else {
        setGeneralError(data.error?.message || "登录失败");
        if (data.error?.details) {
          const fieldErrors: Record<string, string> = {};
          data.error.details.forEach((detail: { field: string; message: string }) => {
            fieldErrors[detail.field] = detail.message;
          });
          setErrors(fieldErrors);
        }
      }
    } catch {
      setGeneralError("网络错误，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">
          邮箱地址
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
            placeholder="请输入邮箱"
            className={`pl-10 bg-rice-paper border-gold/30 focus:border-gold focus:ring-gold/20 ${
              errors.email ? "border-cinnabar" : ""
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-cinnabar mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">
          密码
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: "" }));
              }
            }}
            placeholder="请输入密码"
            className={`pl-10 pr-10 bg-rice-paper border-gold/30 focus:border-gold focus:ring-gold/20 ${
              errors.password ? "border-cinnabar" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-charcoal transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-cinnabar mt-1">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-gold/30 text-cinnabar focus:ring-cinnabar/20"
          />
          <span className="text-sm text-muted-foreground">记住我</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-sm text-cinnabar hover:text-cinnabar-dark transition-colors"
        >
          忘记密码？
        </Link>
      </div>

      {generalError && (
        <div className="p-3 bg-cinnabar/10 border border-cinnabar/20 rounded-md">
          <p className="text-sm text-cinnabar text-center">{generalError}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-cinnabar hover:bg-cinnabar-dark text-white h-11"
      >
        {isLoading ? (
          <span className="animate-breathe">登录中...</span>
        ) : (
          "登录"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        还没有账户？{" "}
        <Link
          href="/register"
          className="text-cinnabar hover:text-cinnabar-dark transition-colors font-medium"
        >
          立即注册
        </Link>
      </p>
    </form>
  );
}
