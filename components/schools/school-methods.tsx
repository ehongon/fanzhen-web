"use client";

import { motion } from "framer-motion";
import { Dumbbell, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Method } from "@/lib/schools-data";

interface SchoolMethodsProps {
  methods: Method[];
  color: string;
}

export default function SchoolMethods({ methods, color }: SchoolMethodsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {methods.map((method, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card className="group h-full border-0 bg-white/80 shadow-sm transition-all duration-300 hover:shadow-card">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${color}12` }}
                >
                  <Dumbbell className="h-5 w-5" style={{ color }} />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-charcoal">
                    {method.name}
                  </h4>
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-xs"
                    style={{
                      backgroundColor: `${color}12`,
                      color: color,
                    }}
                  >
                    {method.category}
                  </span>
                </div>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                {method.description}
              </p>
              {method.keyPoints && (
                <div className="space-y-1.5">
                  {method.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 h-3.5 w-3.5 shrink-0"
                        style={{ color }}
                      />
                      <span className="text-xs text-charcoal/70">{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
