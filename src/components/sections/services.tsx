"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code2, Smartphone, Bot, Palette, Cloud, TrendingUp } from "lucide-react";
import { SectionBackdrop } from "@/components/effects/section-backdrop";

const ICONS = [Code2, Smartphone, Bot, Palette, Cloud, TrendingUp];

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="relative overflow-hidden py-24">
      <SectionBackdrop imageKey="services" alt="Kod yozish" variant="section" />

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
          <p className="mx-auto mt-4 max-w-2xl text-white/65">{t("desc")}</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group glass-card rounded-2xl p-8 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent-light transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{t(`items.${i}.title`)}</h3>
                <p className="text-sm leading-relaxed text-white/60">{t(`items.${i}.desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
