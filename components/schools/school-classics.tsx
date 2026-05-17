"use client";

import { motion } from "framer-motion";
import { BookOpen, User, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Classic } from "@/lib/schools-data";

interface SchoolClassicsProps {
  classics: Classic[];
  color: string;
}

export default function SchoolClassics({ classics, color }: SchoolClassicsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {classics.map((classic, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card className="group h-full border-0 bg-white/80 shadow-sm transition-all duration-300 hover:shadow-card">
            <CardContent className="p-5">
              <div className="mb-3 flex items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${color}12` }}
                >
                  <BookOpen className="h-5 w-5" style={{ color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif text-base font-bold text-charcoal">
                    {classic.name}
                  </h4>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    {classic.author && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {classic.author}
                      </span>
                    )}
                    {classic.dynasty && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {classic.dynasty}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {classic.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
