"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Bug, Rocket, Headphones } from "lucide-react";
import { SectionBackdrop } from "@/components/effects/section-backdrop";

const ICONS = [Search, PenTool, Code2, Bug, Rocket, Headphones];

export function Process() {
  const t = useTranslations("process");

  return (
    <section className="relative overflow-hidden py-24">
      <SectionBackdrop imageKey="process" alt="Jamoa muhokamasi" variant="subtle" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent-light backdrop-blur-md">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">{t("title")}</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-accent via-purple to-transparent md:left-1/2 md:block" />

          <div className="space-y-12">
            {Array.from({ length: 6 }, (_, i) => {
              const Icon = ICONS[i];
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-center gap-8 md:gap-16 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="hidden flex-1 md:block" />
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-navy bg-gradient-to-br from-accent to-purple text-white shadow-lg shadow-accent/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="glass-card flex-1 rounded-2xl p-6">
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent-light">0{i + 1}</div>
                    <h3 className="mb-2 text-lg font-semibold">{t(`steps.${i}.title`)}</h3>
                    <p className="text-sm text-white/60">{t(`steps.${i}.desc`)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
