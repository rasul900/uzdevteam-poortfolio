"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { SectionBackdrop } from "@/components/effects/section-backdrop";

export function Pricing() {
  const t = useTranslations("pricing");

  return (
    <section id="pricing" className="relative overflow-hidden py-24">
      <SectionBackdrop imageKey="pricing" alt="Zamonaviy ofis" variant="section" />

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

        <div className="grid gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => {
            const popular = i === 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-2xl p-8 ${
                  popular
                    ? "border border-accent/50 bg-gradient-to-b from-accent/20 to-transparent shadow-xl shadow-accent/15 backdrop-blur-md"
                    : "glass-card"
                }`}
              >
                {popular && (
                  <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl bg-accent px-4 py-1.5 text-xs font-semibold text-white">
                    <Zap className="h-3.5 w-3.5" />
                    {t("popular")}
                  </div>
                )}
                <h3 className="text-xl font-bold">{t(`plans.${i}.name`)}</h3>
                <p className="mt-1 text-sm text-white/60">{t(`plans.${i}.desc`)}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-accent-light">{t(`plans.${i}.price`)}</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {Array.from({ length: i === 0 ? 5 : 6 }, (_, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/80">
                      <Check className="h-4 w-4 shrink-0 text-accent-light" />
                      {t(`plans.${i}.features.${j}`)}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                    popular
                      ? "bg-accent text-white shadow-lg shadow-accent/25 hover:shadow-xl"
                      : "border border-white/15 text-white/80 hover:border-accent/50 hover:text-accent-light"
                  }`}
                >
                  {t("cta")}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
