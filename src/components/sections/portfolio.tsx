"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionBackdrop } from "@/components/effects/section-backdrop";

const PROJECTS = [
  { title: "TechMart E-commerce", cat: "web", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", tech: ["Next.js", "Stripe", "PostgreSQL"] },
  { title: "FitTrack Mobile App", cat: "mobile", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80", tech: ["React Native", "Firebase"] },
  { title: "GreenShop Bot", cat: "bot", img: "https://images.unsplash.com/photo-1531746790095-e5995e5ca58e?w=600&q=80", tech: ["Node.js", "Telegram API"] },
  { title: "BuildPro Corporate", cat: "web", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80", tech: ["Next.js", "Tailwind"] },
  { title: "EduLearn Platform", cat: "web", img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80", tech: ["React", "Node.js", "MongoDB"] },
  { title: "HealthCare App", cat: "mobile", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80", tech: ["Flutter", "Firebase"] },
  { title: "LogiTrack Bot", cat: "bot", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80", tech: ["Python", "Telegram API"] },
  { title: "Flavor Brand Identity", cat: "design", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80", tech: ["Figma", "Illustrator"] },
] as const;

const FILTERS = ["all", "web", "mobile", "bot", "design"] as const;

export function Portfolio() {
  const t = useTranslations("portfolio");
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  return (
    <section id="portfolio" className="relative overflow-hidden py-24">
      <SectionBackdrop imageKey="portfolio" alt="Dasturchi ish stoli" variant="section" />

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

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-5 py-2 text-sm font-medium backdrop-blur-md transition-all ${
                filter === f
                  ? "bg-accent text-white shadow-md shadow-accent/25"
                  : "glass-card text-white/70 hover:text-accent-light"
              }`}
            >
              {t(`filters.${f}`)}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group glass-card overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                      <ExternalLink className="h-4 w-4" />
                      {t("viewProject")}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 font-semibold">{p.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((tag) => (
                      <span key={tag} className="rounded-md bg-accent/20 px-2 py-0.5 text-xs text-accent-light">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
