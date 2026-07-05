"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_IDS = ["services", "portfolio", "team", "pricing", "contact"] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  // Boshida noto'g'ri "flash" bo'lmasligi uchun null qilib boshlaymiz,
  // haqiqiy qiymatni faqat mount bo'lgandan keyin o'qiymiz.
  const [dark, setDark] = useState<boolean | null>(null);

  // Scroll holatini kuzatish
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Sahifa ochilganda haqiqiy holatni <html> dan o'qib, state bilan sinxronlaymiz.
  // Bu yerda localStorage'dan foydalanib, foydalanuvchi tanlovini eslab qolamiz.
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored ? stored === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldBeDark);
    setDark(shouldBeDark);
  }, []);

  const toggleDark = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  const switchLocale = (loc: string) => {
    const segments = pathname.split("/");
    segments[1] = loc;
    router.push(segments.join("/"));
    setLangOpen(false);
  };

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Toggle tugmasi ikonkasi mount bo'lgunga qadar hech narsa ko'rsatmaydi (hydration mismatch oldini olish uchun)
  const showThemeIcon = dark !== null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-slate-200 bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:border-white/10 dark:bg-navy/80 dark:shadow-black/20"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-purple text-sm font-bold text-white">
            UZ
          </span>
          <span>
            DEV <span className="text-accent">TEAM</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_IDS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-accent dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-accent-light"
            >
              {t(id)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Til almashtirish */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 transition-colors hover:border-accent dark:border-white/10 dark:text-slate-200 dark:hover:border-accent"
            >
              <Globe className="h-4 w-4" />
              {locale.toUpperCase()}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-navy-light"
                >
                  {["uz", "ru", "en"].map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLocale(l)}
                      className={cn(
                        "block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-accent/10 dark:text-slate-200",
                        locale === l && "font-semibold text-accent dark:text-accent-light"
                      )}
                    >
                      {l === "uz" ? "O'zbek" : l === "ru" ? "Русский" : "English"}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark / Light almashtirish tugmasi */}
          <button
            onClick={toggleDark}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:border-accent hover:text-accent dark:border-white/10 dark:text-slate-200 dark:hover:border-accent dark:hover:text-accent-light"
          >
            {showThemeIcon && (dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden rounded-lg bg-gradient-to-r from-accent to-purple px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-accent/25 sm:block"
          >
            {t("cta")}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center text-slate-900 dark:text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobil menyu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white dark:border-white/10 dark:bg-navy lg:hidden"
          >
            <div className="space-y-1 p-4">
              {NAV_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-accent/10 dark:text-slate-200 dark:hover:bg-white/5"
                >
                  {t(id)}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 block w-full rounded-lg bg-gradient-to-r from-accent to-purple py-3 text-center text-sm font-semibold text-white"
              >
                {t("cta")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}