"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Flame, Users, Brain, MessageCircle } from "lucide-react";

const footerLinks = {
  修炼: [
    { label: "修炼体系", href: "/system" },
    { label: "功法数据库", href: "/gongfa" },
    { label: "阶段指南", href: "/system/stage-1" },
  ],
  资源: [
    { label: "典籍文献", href: "/dianji" },
    { label: "AI辅导", href: "/ai" },
    { label: "修炼日志", href: "/profile" },
  ],
  社区: [
    { label: "讨论区", href: "/community" },
    { label: "经验分享", href: "/community/articles" },
    { label: "修炼问答", href: "/community/qa" },
  ],
  关于: [
    { label: "关于凡真", href: "/about" },
    { label: "联系我们", href: "/contact" },
    { label: "隐私政策", href: "/privacy" },
  ],
};

const icons = [BookOpen, Flame, Users, Brain, MessageCircle];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-flex items-center space-x-1 mb-4">
                <span className="text-2xl font-serif-cn font-bold text-gold">
                  凡
                </span>
                <span className="text-2xl font-serif-cn font-bold text-rice">
                  真
                </span>
              </Link>
              <p className="text-sm text-rice/50 leading-relaxed">
                凡人之躯，真人之道。
                <br />
                探索生命科学的智慧，
                <br />
                开启你的修炼之旅。
              </p>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links], catIndex) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-gold mb-4 tracking-wider">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-rice/50 hover:text-gold transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gold/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-xs text-rice/40"
            >
              &copy; {new Date().getFullYear()} 凡真. 保留所有权利.
            </motion.p>
            <div className="flex items-center space-x-6">
              {icons.map((Icon, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2, color: "#d4a574" }}
                  className="text-rice/30 hover:text-gold transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
