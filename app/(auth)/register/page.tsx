"use client";

import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif-cn font-bold text-charcoal mb-2">
            开始修炼
          </h1>
          <p className="text-muted-foreground">
            创建账户，开启您的修真之路
          </p>
        </div>
        <Suspense fallback={<div className="text-center py-8">加载中...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
