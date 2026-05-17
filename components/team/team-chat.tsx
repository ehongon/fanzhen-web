"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Smile, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeamChatMessage, getTeamMessages, saveTeamMessage } from "@/lib/team-data";
import { cn } from "@/lib/utils";

interface TeamChatProps {
  teamId: string;
  currentUserId?: string;
  className?: string;
}

function ChatBubble({ message, isCurrentUser }: { message: TeamChatMessage; isCurrentUser: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex gap-3",
        isCurrentUser && "flex-row-reverse"
      )}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center text-xs text-rice shrink-0">
        {message.userName.charAt(0)}
      </div>
      
      <div className={cn(
        "max-w-[70%]",
        isCurrentUser && "items-end"
      )}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-rice/50">{message.userName}</span>
          <span className="text-xs text-rice/30">
            {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <div className={cn(
          "px-4 py-2.5 rounded-2xl text-sm",
          isCurrentUser
            ? "bg-gold/20 text-rice rounded-tr-sm border border-gold/20"
            : "bg-rice/10 text-rice rounded-tl-sm border border-rice/10"
        )}>
          {message.content}
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamChat({ teamId, currentUserId, className }: TeamChatProps) {
  const [messages, setMessages] = useState<TeamChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadedMessages = getTeamMessages(teamId);
    if (loadedMessages.length === 0) {
      const mockMessages: TeamChatMessage[] = [
        {
          id: "msg_001",
          teamId,
          userId: "user_001",
          userName: "道友甲",
          content: "大家早上好！今天准备练习多久？",
          createdAt: new Date(Date.now() - 3600000),
        },
        {
          id: "msg_002",
          teamId,
          userId: "user_002",
          userName: "道友乙",
          content: "我计划练习30分钟八段锦，然后冥想15分钟。",
          createdAt: new Date(Date.now() - 3000000),
        },
        {
          id: "msg_003",
          teamId,
          userId: "user_003",
          userName: "道友丙",
          content: "不错！我也来加入，一起打卡。",
          createdAt: new Date(Date.now() - 2400000),
        },
      ];
      mockMessages.forEach((msg) => {
        const { id, createdAt, ...msgData } = msg;
        saveTeamMessage(msgData);
      });
      setMessages(getTeamMessages(teamId));
    } else {
      setMessages(loadedMessages);
    }
  }, [teamId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || !currentUserId) return;

    const newMessage = saveTeamMessage({
      teamId,
      userId: currentUserId,
      userName: `用户${currentUserId.slice(-4)}`,
      content: inputValue.trim(),
    });

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn("flex flex-col h-[500px] rounded-xl border border-gold/20 bg-ink/40", className)}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
              isCurrentUser={message.userId === currentUserId}
            />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gold/10">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="text-rice/50 hover:text-rice hover:bg-rice/10 shrink-0"
          >
            <Smile className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-rice/50 hover:text-rice hover:bg-rice/10 shrink-0"
          >
            <ImageIcon className="w-5 h-5" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息..."
            className="flex-1 bg-ink/50 border-gold/20 text-rice placeholder:text-rice/40"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-gold/20 hover:bg-gold/30 text-gold border border-gold/30 shrink-0 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
