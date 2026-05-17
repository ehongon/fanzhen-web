"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Bell,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Type,
  Save,
  ChevronDown,
  ChevronUp,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SettingsFormProps {
  onSave?: () => void;
}

interface SettingsSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function SettingsSection({ title, icon, children, defaultOpen = true }: SettingsSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl border border-border/50 shadow-card overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="font-serif-cn font-semibold text-base sm:text-lg text-foreground">
            {title}
          </h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      {isOpen && <div className="px-4 sm:px-5 pb-4 sm:pb-5">{children}</div>}
    </motion.div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-foreground">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors duration-200",
          checked ? "bg-cinnabar" : "bg-muted"
        )}
      >
        <div
          className={cn(
            "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200",
            checked ? "left-6" : "left-1"
          )}
        />
      </button>
    </div>
  );
}

export default function SettingsForm({ onSave }: SettingsFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    nickname: "修行者",
    email: "",
    currentPassword: "",
    newPassword: "",
    stage: "炼精化气",
    constitution: "平和质",
    mainGongfa: "站桩",
    dailyGoal: 60,
    reminderTime: "08:00",
    practiceReminder: true,
    communityReminder: true,
    systemNotification: true,
    publicRecords: false,
    publicPosts: true,
    darkMode: false,
    fontSize: "medium",
  });

  const stages = ["炼精化气", "炼气化神", "炼神还虚", "炼虚合道"];
  const constitutions = ["平和质", "气虚质", "阳虚质", "阴虚质", "痰湿质", "湿热质", "血瘀质", "气郁质", "特禀质"];
  const gongfas = ["站桩", "呼吸法", "冥想", "小周天", "太极拳", "八段锦", "五禽戏"];
  const fontSizes = [
    { value: "small", label: "小" },
    { value: "medium", label: "中" },
    { value: "large", label: "大" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 账号设置 */}
      <SettingsSection
        title="账号设置"
        icon={<User className="w-5 h-5 text-cinnabar" />}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              昵称
            </label>
            <Input
              value={settings.nickname}
              onChange={(e) => setSettings({ ...settings, nickname: e.target.value })}
              placeholder="请输入昵称"
              className="min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              邮箱
            </label>
            <div className="flex gap-2">
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="绑定邮箱"
                className="min-h-[44px]"
              />
              <Button variant="outline" size="sm" className="min-h-[44px] px-4">
                <Mail className="w-4 h-4 mr-1" />
                绑定
              </Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              修改密码
            </label>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={settings.currentPassword}
                  onChange={(e) => setSettings({ ...settings, currentPassword: e.target.value })}
                  placeholder="当前密码"
                  className="min-h-[44px] pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Input
                type="password"
                value={settings.newPassword}
                onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })}
                placeholder="新密码"
                className="min-h-[44px]"
              />
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* 修炼偏好 */}
      <SettingsSection
        title="修炼偏好"
        icon={<Target className="w-5 h-5 text-cinnabar" />}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              当前阶段
            </label>
            <select
              value={settings.stage}
              onChange={(e) => setSettings({ ...settings, stage: e.target.value })}
              className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm"
            >
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              体质类型
            </label>
            <select
              value={settings.constitution}
              onChange={(e) => setSettings({ ...settings, constitution: e.target.value })}
              className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm"
            >
              {constitutions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              主修功法
            </label>
            <select
              value={settings.mainGongfa}
              onChange={(e) => setSettings({ ...settings, mainGongfa: e.target.value })}
              className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm"
            >
              {gongfas.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              每日目标时长（分钟）
            </label>
            <Input
              type="number"
              value={settings.dailyGoal}
              onChange={(e) => setSettings({ ...settings, dailyGoal: parseInt(e.target.value) || 0 })}
              min={10}
              max={300}
              className="min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              提醒时间
            </label>
            <Input
              type="time"
              value={settings.reminderTime}
              onChange={(e) => setSettings({ ...settings, reminderTime: e.target.value })}
              className="min-h-[44px]"
            />
          </div>
        </div>
      </SettingsSection>

      {/* 通知设置 */}
      <SettingsSection
        title="通知设置"
        icon={<Bell className="w-5 h-5 text-cinnabar" />}
      >
        <div className="divide-y divide-border/50">
          <ToggleSwitch
            checked={settings.practiceReminder}
            onChange={(checked) => setSettings({ ...settings, practiceReminder: checked })}
            label="修炼提醒"
          />
          <ToggleSwitch
            checked={settings.communityReminder}
            onChange={(checked) => setSettings({ ...settings, communityReminder: checked })}
            label="社区互动提醒"
          />
          <ToggleSwitch
            checked={settings.systemNotification}
            onChange={(checked) => setSettings({ ...settings, systemNotification: checked })}
            label="系统通知"
          />
        </div>
      </SettingsSection>

      {/* 隐私设置 */}
      <SettingsSection
        title="隐私设置"
        icon={<Lock className="w-5 h-5 text-cinnabar" />}
      >
        <div className="divide-y divide-border/50">
          <ToggleSwitch
            checked={settings.publicRecords}
            onChange={(checked) => setSettings({ ...settings, publicRecords: checked })}
            label="公开修炼记录"
          />
          <ToggleSwitch
            checked={settings.publicPosts}
            onChange={(checked) => setSettings({ ...settings, publicPosts: checked })}
            label="公开心得"
          />
        </div>
      </SettingsSection>

      {/* 主题设置 */}
      <SettingsSection
        title="主题设置"
        icon={settings.darkMode ? <Moon className="w-5 h-5 text-cinnabar" /> : <Sun className="w-5 h-5 text-cinnabar" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              {settings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span className="text-sm text-foreground">
                {settings.darkMode ? "深色模式" : "浅色模式"}
              </span>
            </div>
            <button
              onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
              className={cn(
                "relative w-11 h-6 rounded-full transition-colors duration-200",
                settings.darkMode ? "bg-cinnabar" : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200",
                  settings.darkMode ? "left-6" : "left-1"
                )}
              />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Type className="w-4 h-4 inline mr-1" />
              字体大小
            </label>
            <div className="flex gap-2">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setSettings({ ...settings, fontSize: size.value })}
                  className={cn(
                    "flex-1 py-2 px-3 rounded-lg border text-sm transition-colors min-h-[44px]",
                    settings.fontSize === size.value
                      ? "border-cinnabar bg-cinnabar/10 text-cinnabar"
                      : "border-border hover:bg-muted"
                  )}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* 保存按钮 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="sticky bottom-4 sm:bottom-6 z-10"
      >
        <Button
          onClick={onSave}
          className="w-full bg-cinnabar hover:bg-cinnabar-light text-rice min-h-[48px] text-base shadow-lg"
        >
          <Save className="w-5 h-5 mr-2" />
          保存设置
        </Button>
      </motion.div>
    </div>
  );
}
