"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { validateEmail, validatePassword, getPasswordStrength } from "@/lib/auth-utils";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: "", color: "" });

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordStrength(getPasswordStrength(value));
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name || name.trim().length < 2) {
      newErrors.name = "昵称至少需要2个字符";
    }

    if (!email) {
      newErrors.email = "邮箱不能为空";
    } else if (!validateEmail(email)) {
      newErrors.email = "邮箱格式不正确";
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.message;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "两次输入的密码不一致";
    }

    if (!agreeTerms) {
      newErrors.terms = "请同意服务条款";
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        login(data.data.user, data.data.token);
        // 注册成功后引导到自我检测页面
        setTimeout(() => {
          window.location.href = "/assessment";
        }, 100);
      } else {
        setGeneralError(data.error?.message || "注册失败");
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">
          昵称
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="请输入昵称"
            className={`pl-10 bg-rice-paper border-gold/30 focus:border-gold focus:ring-gold/20 ${
              errors.name ? "border-cinnabar" : ""
            }`}
          />
        </div>
        {errors.name && (
          <p className="text-xs text-cinnabar mt-1">{errors.name}</p>
        )}
      </div>

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
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
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
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="至少8位，包含字母和数字"
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
        {errors.password && (
          <p className="text-xs text-cinnabar mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-1.5">
          确认密码
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }}
            placeholder="再次输入密码"
            className={`pl-10 bg-rice-paper border-gold/30 focus:border-gold focus:ring-gold/20 ${
              errors.confirmPassword ? "border-cinnabar" : ""
            }`}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-cinnabar mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => {
              setAgreeTerms(e.target.checked);
              if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }));
            }}
            className="w-4 h-4 mt-0.5 rounded border-gold/30 text-cinnabar focus:ring-cinnabar/20"
          />
          <span className="text-sm text-muted-foreground">
            我已阅读并同意{" "}
            <Link href="#" className="text-cinnabar hover:text-cinnabar-dark transition-colors">
              服务条款
            </Link>{" "}
            和{" "}
            <Link href="#" className="text-cinnabar hover:text-cinnabar-dark transition-colors">
              隐私政策
            </Link>
          </span>
        </label>
        {errors.terms && (
          <p className="text-xs text-cinnabar mt-1">{errors.terms}</p>
        )}
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
          <span className="animate-breathe">注册中...</span>
        ) : (
          "注册"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        已有账户？{" "}
        <Link
          href="/login"
          className="text-cinnabar hover:text-cinnabar-dark transition-colors font-medium"
        >
          立即登录
        </Link>
      </p>
    </form>
  );
}
