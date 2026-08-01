"use client";

import { i18nText } from "@/lib/i18nText";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BANNER_SHOWN_KEY, bannerKeys } from "@/constants/values.constant";
import { useStateStore } from "@/stores/stateStore";
import Image from "next/image";
import Link from "next/link";

export default function BannerPopup() {
  const { banner } = useStateStore();
  const popup = banner?.[bannerKeys.bannerPopupHome]?.advertises?.[0];
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!popup) return;

    const hasShownThisSession = sessionStorage.getItem(BANNER_SHOWN_KEY);

    if (!hasShownThisSession) {
      setIsOpen(true);
      sessionStorage.setItem(BANNER_SHOWN_KEY, "true");
    }
  }, [popup]);

  const isVisible = Boolean(isOpen && popup);

  const closePopup = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isVisible) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closePopup();
    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [isVisible]);

  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modal = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, y: 10, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 380,
            damping: 30,
            mass: 0.85,
          },
        },
        exit: {
          opacity: 0,
          y: 10,
          scale: 0.985,
          transition: { duration: 0.18 },
        },
      };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <div
          className="fixed inset-0 z-[50] flex items-center justify-center p-3 sm:p-4 md:p-6"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="absolute inset-0 bg-slate-950/60"
            onClick={closePopup}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.18 }}
          />

          <motion.div
            className="relative z-[60] w-full max-w-[92vw] overflow-hidden rounded-lg border border-border bg-background shadow-[0_24px_60px_-34px_rgba(15,23,42,0.52)] sm:max-w-md md:max-w-lg lg:max-w-xl"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              type="button"
              onClick={closePopup}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition hover:border-[#ffb716] hover:bg-[#fff7da]"
              aria-label={i18nText("AUTO.components.home.bannerpopup.line112_0_dong")}
            >
              <X size={18} />
            </button>

            <Link href={popup.link} onClick={closePopup} className="block">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 sm:aspect-[4/3]">
                <Image
                  priority
                  quality={90}
                  alt={popup.title ?? "Banner"}
                  src={popup.picture}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 720px, 880px"
                  className="object-cover"
                />
              </div>
            </Link>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

