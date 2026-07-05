"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { SectionBackdrop } from "@/components/effects/section-backdrop";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [idx, setIdx] = useState(0);
  const total = 3;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <section className="relative overflow-hidden py-24">
      <SectionBackdrop imageKey="testimonials" alt="Dasturlash muhiti" variant="subtle" />

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

        <div className="mx-auto max-w-3xl">
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl p-8 md:p-12"
              >
                <Quote className="mb-6 h-10 w-10 text-accent/30" />
                <p className="mb-6 text-lg leading-relaxed md:text-xl">{t(`items.${idx}.text`)}</p>
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.raw(`items.${idx}.rating`) as number }, (_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div>
                  <div className="font-semibold">{t(`items.${idx}.author`)}</div>
                  <div className="text-sm text-white/60">{t(`items.${idx}.role`)}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="glass-card flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:border-accent/40 hover:text-accent-light"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: total }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-accent" : "w-2 bg-white/30"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="glass-card flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:border-accent/40 hover:text-accent-light"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
