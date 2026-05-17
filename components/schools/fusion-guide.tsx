"use client";

import { motion } from "framer-motion";
import { GitMerge, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fusionAdvices } from "@/lib/schools-data";

export default function FusionGuide() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {fusionAdvices.map((advice, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card className="group h-full border-0 bg-white/80 shadow-sm transition-all duration-300 hover:shadow-card">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                  <GitMerge className="h-5 w-5 text-gold" />
                </div>
                <h4 className="font-serif text-base font-bold text-charcoal">
                  {advice.title}
                </h4>
              </div>

              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                {advice.description}
              </p>

              <div className="mb-3 space-y-1.5">
                {advice.combination.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cinnabar" />
                    <span className="text-xs text-charcoal/70">{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-gold/5 px-3 py-2 text-xs text-gold-dark">
                <span className="font-medium">益处：</span>
                {advice.benefit}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
