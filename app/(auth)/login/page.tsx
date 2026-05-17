"use client";

import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif-cn font-bold text-charcoal mb-2">
            欢迎回来
          </h1>
          <p className="text-muted-foreground">
            登录以继续您的修炼之旅
          </p>
        </div>
        <Suspense fallback={<div className="text-center py-8">加载中...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
