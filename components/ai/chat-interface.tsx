"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { BreathingIndicator } from "./breathing-indicator";
import { Send, Flower2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "ai",
    content:
      "您好，我是凡真AI修行导师。请问您在修炼过程中遇到了什么问题？",
    timestamp: new Date(),
  },
];

const QUICK_QUESTIONS = [
  "我最近站桩时感觉脚底发热，这是正常的吗？",
  "如何判断自己是否进入了炼气化神阶段？",
  "修炼时总是走神，有什么方法可以提升专注力？",
  "打坐时后背发紧，是不是姿势不对？",
];

const DEMO_RESPONSES: Record<string, string> = {
  "我最近站桩时感觉脚底发热，这是正常的吗？":
    "脚底发热是炼精化气阶段的典型现象，说明气机开始下沉。这是「气沉丹田」的初步表现，属于正常反应。\n\n建议：\n1. 继续保持站桩，但不要刻意追求这种感觉\n2. 注意力可以轻轻放在脚底涌泉穴\n3. 如果热感过强，可以适当缩短站桩时间\n4. 配合涌泉归元法，效果更佳",
  "如何判断自己是否进入了炼气化神阶段？":
    "进入炼气化神阶段有以下几个典型标志：\n\n1. **气感变化**：体内气流从温热转为清凉，运行更加自然流畅\n2. **意识状态**：杂念自然减少，能较长时间保持清明觉知\n3. **身体反应**：丹田区域有充实感，呼吸变得深长细匀\n4. **睡眠变化**：所需睡眠时间减少，但精力充沛\n5. **情绪稳定**：对外界干扰的抵抗力增强，内心趋于平和\n\n需要注意的是，境界的提升是水到渠成的过程，不可急于求成。",
};

function getDemoResponse(question: string): string {
  return (
    DEMO_RESPONSES[question] ||
    "这是一个很好的修炼问题。根据凡真修炼体系的理论，建议您：\n\n1. 保持规律的修炼习惯，每日定时定量\n2. 注意身体信号，循序渐进，不可强求\n3. 可以结合《凡真导引法》进行辅助练习\n4. 如症状持续或加重，建议进行阶段评估\n\n您还有其他具体的修炼感受想要分享吗？"
  );
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: getDemoResponse(content.trim()),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={index} className="font-semibold text-foreground mt-2">
            {line.replace(/\*\*/g, "")}
          </p>
        );
      }
      if (/^\d+\./.test(line)) {
        return (
          <p key={index} className="text-foreground pl-2">
            {line}
          </p>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-foreground">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border shadow-card">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            {message.role === "ai" && (
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-cinnabar/10 flex items-center justify-center">
                <Flower2 className="w-5 h-5 text-cinnabar" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.role === "user"
                  ? "bg-cinnabar text-white rounded-tr-sm"
                  : "bg-rice dark:bg-ink-light rounded-tl-sm"
              )}
            >
              <div
                className={cn(
                  "text-sm leading-relaxed space-y-1",
                  message.role === "user"
                    ? "text-white"
                    : "text-foreground"
                )}
              >
                {formatContent(message.content)}
              </div>
              <div
                className={cn(
                  "text-xs mt-2",
                  message.role === "user"
                    ? "text-white/70"
                    : "text-muted-foreground"
                )}
              >
                {message.timestamp.toLocaleTimeString("zh-CN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-cinnabar/10 flex items-center justify-center">
              <Flower2 className="w-5 h-5 text-cinnabar" />
            </div>
            <div className="bg-rice dark:bg-ink-light rounded-2xl rounded-tl-sm px-4 py-3">
              <BreathingIndicator />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4 space-y-3">
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((question) => (
              <button
                key={question}
                onClick={() => handleSend(question)}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors text-left"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="请输入您的问题..."
            className="min-h-[44px] max-h-[120px] resize-none flex-1"
            rows={1}
          />
          <Button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isLoading}
            className="self-end h-10 w-10 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
