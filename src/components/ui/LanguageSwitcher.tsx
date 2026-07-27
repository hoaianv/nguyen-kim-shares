"use client";

import { useState, useMemo, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LANGUAGES } from "@/constants/values.constant";
import { useGoogleTranslateEngine, type Lang } from "@/components/GoogleTranslate";

function readGoogTransToLang(): Lang | null {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!m) return null;

  try {
    const value = decodeURIComponent(m[1]);
    const parts = value.split("/");
    const to = parts[2] as Lang | undefined;
    return to === "vi" || to === "en" ? to : null;
  } catch {
    return null;
  }
}

export default function LanguageSwitcher({
  currentLocale = "vi",
}: {
  currentLocale?: Lang;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { switchTo, isReady } = useGoogleTranslateEngine("vi");

  const initialLocale: Lang = currentLocale === "en" ? "en" : "vi";
  const [activeLocale, setActiveLocale] = useState<Lang>(initialLocale);

  useEffect(() => {
    const cookieLang = readGoogTransToLang();
    if (cookieLang) setActiveLocale(cookieLang);
  }, []);

  const currentLanguage = useMemo(() => {
    return LANGUAGES.find((lang) => lang.code === activeLocale) ?? LANGUAGES[0];
  }, [activeLocale]);

  const handleLanguageChange = (locale: string) => {
    const next: Lang = locale === "en" ? "en" : "vi";

    setIsOpen(false);

    if (next === activeLocale) return;

    switchTo(next);
    setActiveLocale(next);
  };

  const optionClass = (isActive: boolean) =>
    [
      "flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-muted/60",
      isActive ? "bg-amber-50 text-amber-700" : "text-foreground",
    ].join(" ");

  return (
    <div className="relative">
      <div className="hidden md:block">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="nk-focus-ring inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground/15 hover:bg-muted/60"
          title={!isReady() ? "Đang tải bộ dịch..." : ""}
          type="button"
        >
          <Globe size={16} className="text-muted-foreground" />
          <span className="hidden lg:inline">{currentLanguage.label}</span>
          <span className="lg:hidden">{currentLanguage.shortLabel}</span>

          <svg
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-lg border border-border bg-popover py-2 text-popover-foreground shadow-[0_22px_60px_-30px_rgba(15,23,42,0.55)]"
              >
                {LANGUAGES.map((language) => {
                  const isActive = language.code === activeLocale;
                  return (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() => handleLanguageChange(language.code)}
                      className={optionClass(isActive)}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span className="flex-1 text-left">{language.label}</span>
                      {isActive && (
                        <Check size={16} className="text-amber-600" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="nk-focus-ring inline-flex items-center gap-2 rounded-lg border border-border bg-background p-2 text-foreground transition-colors duration-200 hover:border-foreground/15 hover:bg-muted/60"
          title={!isReady() ? "Đang tải bộ dịch..." : ""}
          type="button"
        >
          <span className="text-lg">{currentLanguage.flag}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-30 bg-slate-950/25"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full z-40 mt-2 w-40 overflow-hidden rounded-lg border border-border bg-popover py-2 text-popover-foreground shadow-[0_22px_60px_-30px_rgba(15,23,42,0.55)]"
              >
                {LANGUAGES.map((language) => {
                  const isActive = language.code === activeLocale;
                  return (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() => handleLanguageChange(language.code)}
                      className={optionClass(isActive)}
                    >
                      <span className="text-base">{language.flag}</span>
                      <span className="flex-1 text-left font-medium">
                        {language.shortLabel}
                      </span>
                      {isActive && (
                        <Check size={14} className="text-amber-600" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

