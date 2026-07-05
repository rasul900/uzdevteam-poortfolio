"use client";

import { useTranslations } from "next-intl";
import { Code2, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const c = useTranslations("contact");

  return (
    <footer className="relative border-t border-white/10 bg-navy/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2 text-xl font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-purple text-sm font-bold text-white">
                UZ
              </span>
              DEV <span className="text-accent">TEAM</span>
            </div>
            <p className="text-sm text-muted">{t("desc")}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">{t("links")}</h4>
            <ul className="space-y-2 text-sm">
              {["services", "portfolio", "team", "pricing"].map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-muted transition-colors hover:text-accent">{id.charAt(0).toUpperCase() + id.slice(1)}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">{t("services")}</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>Web Development</li>
              <li>Mobile Apps</li>
              <li>Telegram Bots</li>
              <li>UI/UX Design</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">{t("contact")}</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" />{c("info.address")}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" />{c("info.email")}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" />{c("info.phone")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 dark:border-border-dark sm:flex-row">
          <p className="text-sm text-muted">&copy; {new Date().getFullYear()} UZ DEV TEAM. {t("rights")}</p>
          <div className="flex gap-6 text-sm text-muted">
            <a href="#" className="hover:text-accent">{t("privacy")}</a>
            <a href="#" className="hover:text-accent">{t("terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
