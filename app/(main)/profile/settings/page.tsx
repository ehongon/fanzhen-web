"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import SettingsForm from "@/components/profile/settings-form";

export default function SettingsPage() {
  const router = useRouter();

  const handleSave = () => {
    // TODO: 调用API保存设置
    alert("设置已保存");
  };

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-8">
      {/* 页面头部 */}
      <div className="bg-ink-gradient text-rice py-6 sm:py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-serif-cn text-2xl sm:text-3xl font-bold text-gold">
                设置
              </h1>
              <p className="text-rice/70 text-sm sm:text-base mt-1">
                管理您的账号和修炼偏好
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 设置表单 */}
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <SettingsForm onSave={handleSave} />
      </div>
    </div>
  );
}
