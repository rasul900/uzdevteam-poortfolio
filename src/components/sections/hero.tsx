"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionBackdrop } from "@/components/effects/section-backdrop";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <SectionBackdrop imageKey="hero" alt="Dasturchilar jamoasi" variant="hero" priority />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent-light backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4" />
            {t("badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("title1")}{" "}
            <span className="bg-gradient-to-r from-accent-light to-purple-light bg-clip-text text-transparent">
              {t("title2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/70"
          >
            {t("desc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-purple px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:shadow-xl hover:shadow-accent/40"
            >
              {t("cta1")}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-accent/50 hover:bg-white/15"
            >
              {t("cta2")}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {([
            ["200+", t("stats.projects")],
            ["50+", t("stats.clients")],
            ["5+", t("stats.years")],
            ["15+", t("stats.team")],
          ] as const).map(([value, label]) => (
            <div key={label} className="glass-card rounded-2xl p-5 text-center">
              <div className="text-3xl font-bold text-accent-light">{value}</div>
              <div className="mt-1 text-sm text-white/60">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
