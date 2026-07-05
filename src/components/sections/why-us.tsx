"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Users, Shield, BarChart3, Headphones } from "lucide-react";
import { SectionBackdrop } from "@/components/effects/section-backdrop";

const ICONS = [Users, Shield, BarChart3, Headphones];

export function WhyUs() {
  const t = useTranslations("whyUs");

  return (
    <section className="relative overflow-hidden py-24">
      <SectionBackdrop imageKey="whyUs" alt="IT jamoasi" variant="section" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-purple/30 bg-purple/15 px-4 py-1.5 text-sm font-medium text-purple-light backdrop-blur-md">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">{t("title")}</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-purple text-white shadow-lg shadow-accent/20">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{t(`items.${i}.title`)}</h3>
                <p className="text-sm text-white/60">{t(`items.${i}.desc`)}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-accent-light">{t(`stats.${i}.value`)}</div>
              <div className="mt-1 text-sm text-white/60">{t(`stats.${i}.label`)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
