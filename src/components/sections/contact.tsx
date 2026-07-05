"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { SectionBackdrop } from "@/components/effects/section-backdrop";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("send failed");

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <SectionBackdrop imageKey="contact" alt="Zamonaviy ofis" variant="section" />

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

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card space-y-5 rounded-2xl p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">{t("form.name")}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">{t("form.email")}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">{t("form.phone")}</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                disabled={status === "loading"}
                placeholder="+998 90 189 0288"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-50"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">{t("form.message")}</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                disabled={status === "loading"}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-50"
              />
            </div>

            {status === "success" && (
              <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                <CheckCircle className="h-5 w-5" />
                {t("form.success")}
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-sm font-medium text-red-400">
                <AlertCircle className="h-5 w-5" />
                {t("form.error")}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-purple px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("form.sending")}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {t("form.submit")}
                </>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-6">
              {[
                { icon: MapPin, text: t("info.address") },
                { icon: Mail, text: t("info.email") },
                { icon: Phone, text: t("info.phone") },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="glass-card flex items-start gap-4 rounded-xl p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent-light">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="pt-3 text-sm text-white/80">{text}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0234567890123!2d69.2787!3d41.3111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjAiTiA2OcKwMTYnNDMuMyJF!5e0!3m2!1sen!2s!4v1234567890"
                className="h-full min-h-[300px] w-full border-0 opacity-90"
                loading="lazy"
                title="UZ DEV TEAM office location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
