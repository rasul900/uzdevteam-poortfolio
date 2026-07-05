"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Linkedin, Github as GithubIcon, Mail } from "lucide-react";
import { SectionBackdrop } from "@/components/effects/section-backdrop";

const AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
];

export function Team() {
  const t = useTranslations("team");

  return (
    <section id="team" className="relative overflow-hidden py-24">
      <SectionBackdrop imageKey="team" alt="Dasturchilar jamoasi" variant="section" />

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
          <p className="mx-auto mt-4 max-w-2xl text-white/65">{t("desc")}</p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-card overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={AVATARS[i]}
                  alt={t(`members.${i}.name`)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex justify-center gap-3 pb-4 opacity-0 transition-opacity group-hover:opacity-100">
                  {[Linkedin, GithubIcon, Mail].map((Icon, j) => (
                    <a key={j} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-accent">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="p-5 text-center">
                <h3 className="font-semibold">{t(`members.${i}.name`)}</h3>
                <p className="mt-1 text-sm text-accent-light">{t(`members.${i}.role`)}</p>
                <p className="mt-1 text-xs text-white/55">{t(`members.${i}.bio`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
