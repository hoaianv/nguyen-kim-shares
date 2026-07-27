"use client";

import { MENU_ITEMS } from "@/constants";
import { Category } from "@/components/home/category";
import { useCategoriesStore } from "@/stores/useCategories";
import { ArrowLeft, ChevronRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

type MenuCategoriesProps = {
  open?: boolean;
  mobileOpen?: boolean;
  id?: string;
  panelRef?: RefObject<HTMLDivElement>;
  onClose?: () => void;
  onMobileClose?: () => void;
};

export default function MenuCategories({
  open = false,
  mobileOpen = false,
  id,
  panelRef,
  onClose = () => { },
  onMobileClose = () => { },
}: MenuCategoriesProps) {
  const { categories } = useCategoriesStore();
  const t = useTranslations();
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIds, setOpenIds] = useState<number[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);

  const activeCategory = useMemo(
    () => categories?.[activeIndex] ?? categories?.[0] ?? null,
    [activeIndex, categories]
  );

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const firstFocusable = drawerRef.current?.querySelector<
      HTMLButtonElement | HTMLAnchorElement
    >("button, a");
    firstFocusable?.focus();
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onMobileClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, onMobileClose]);

  useEffect(() => {
    if (categories?.length && activeIndex >= categories.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, categories]);

  useEffect(() => {
    if (!mobileOpen) {
      setOpenIds([]);
    }
  }, [mobileOpen]);

  if (!categories?.length) return null;

  const toggleOpen = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            ref={panelRef}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-50 hidden w-full pt-2 lg:block"
          >
            <div className="rounded-lg border border-border bg-background shadow-[0_24px_80px_-44px_rgba(15,23,42,0.45)]">
              <div className="grid grid-cols-[280px_minmax(0,1fr)_300px] gap-0">
                <div className="border-r border-border bg-muted/20">
                  <div className="border-b border-border px-4 py-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      <Menu className="h-4 w-4" />
                      {t("HEADER.product_category")}
                    </div>
                  </div>
                  <div className="max-h-[calc(100vh-240px)] overflow-y-auto">
                    {categories.map((item, index) => {
                      const isActive = index === activeIndex;

                      return (
                        <Link href={`/${item.url}`}
                          key={item.id}
                          onMouseEnter={() => setActiveIndex(index)}
                          onFocus={() => setActiveIndex(index)}
                          onClick={() => setActiveIndex(index)}
                          className={`flex w-full items-center justify-between border-b border-border px-4 py-3 text-left transition-colors ${isActive ? "bg-background" : "hover:bg-background/70"
                            }`}
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium text-foreground">
                              {item.title}
                            </div>

                          </div>
                          <ChevronRight
                            className={`h-4 w-4 flex-shrink-0 transition-transform ${isActive ? "translate-x-0.5 text-foreground" : "text-muted-foreground"
                              }`}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="min-w-0 bg-background p-5">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        {t("COMMON.view_all")}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-foreground">
                        {activeCategory?.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/${activeCategory?.url ?? ""}`}
                        className="inline-flex items-center gap-2 border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted/60"
                      >
                        Xem tất cả
                      </Link>
                      <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 w-10 items-center justify-center border border-border bg-background text-foreground transition hover:bg-muted/60"
                        aria-label="Đóng danh mục"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-5 xl:grid-cols-[1fr_220px]">
                    <div className="min-w-0">
                      {activeCategory?.children?.length ? (
                        <Category data={activeCategory.children} />
                      ) : (
                        <div className="border border-dashed border-border bg-muted/20 p-5 text-sm text-muted-foreground">
                          Danh mục này chưa có phân cấp con.
                        </div>
                      )}
                    </div>

                    <div className="border border-border bg-muted/20 p-4">
                      <div className="relative aspect-[4/5] overflow-hidden border border-border bg-background">
                        {activeCategory?.picture ? (
                          <Image
                            src={activeCategory.picture}
                            alt={activeCategory.title}
                            fill
                            className="object-cover"
                            sizes="220px"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/25 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-3 text-background">
                          <p className="text-xs uppercase tracking-[0.22em] text-[#ffedb8]">
                            Highlight
                          </p>
                          <p className="mt-1 text-sm font-medium">
                            {activeCategory?.description || activeCategory?.title}
                          </p>
                        </div>
                      </div>

                      {activeCategory?.banner ? (
                        <div className="mt-3">
                          <Link
                            href={`/${activeCategory.url}`}
                            className="block border border-border bg-background p-2"
                          >
                            <div className="relative aspect-[16/10] overflow-hidden border border-border">
                              <Image
                                src={activeCategory.banner}
                                alt={activeCategory.title}
                                fill
                                className="object-cover"
                                sizes="220px"
                              />
                            </div>
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="border-l border-border bg-muted/20 p-4">
                  <div className="border border-border bg-background p-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      Quick links
                    </p>
                    <div className="mt-3 space-y-2">
                      {MENU_ITEMS.filter((item) => item.link).map((item) => (
                        <Link
                          key={item.value}
                          href={item.link ?? "#"}
                          className="flex items-center justify-between border border-border px-3 py-2 text-sm text-foreground transition hover:bg-muted/60"
                        >
                          <span>{t(item.labelKey)}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-[60] lg:hidden"
            role="presentation"
          >
            <button
              type="button"
              aria-label="Đóng danh mục"
              className="absolute inset-0 bg-foreground/60"
              onClick={onMobileClose}
            />

            <motion.div
              ref={drawerRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-label="Danh mục sản phẩm"
              className="relative flex h-full w-[88vw] max-w-[380px] flex-col border-r border-border bg-background text-foreground shadow-[0_30px_100px_-35px_rgba(15,23,42,0.5)]"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Menu
                  </div>
                  <div className="mt-1 text-base font-semibold text-foreground">
                    {t("HEADER.product_category")}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onMobileClose}
                  className="inline-flex h-10 w-10 items-center justify-center border border-border bg-background text-foreground transition hover:bg-muted/60"
                  aria-label="Đóng menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="border-b border-border px-4 py-3">
                  <button
                    type="button"
                    onClick={onMobileClose}
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-[#e6a414]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Quay lại
                  </button>
                </div>

                <div className="divide-y divide-border">
                  {categories.map((item) => {
                    const hasChildren = (item.children?.length ?? 0) > 0;
                    const isOpen = openIds.includes(item.id);

                    return (
                      <div key={item.id} className="px-4">
                        <div className="flex items-center justify-between gap-3 py-3">
                          <Link
                            href={`/${item.url}`}
                            className="min-w-0 text-sm font-medium text-foreground transition hover:text-[#e6a414]"
                            onClick={onMobileClose}
                          >
                            {item.title}
                          </Link>

                          {hasChildren ? (
                            <button
                              type="button"
                              onClick={() => toggleOpen(item.id)}
                              className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-muted-foreground transition hover:bg-muted/60"
                              aria-expanded={isOpen}
                              aria-label={`Mở ${item.title}`}
                            >
                              <ChevronRight
                                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""
                                  }`}
                              />
                            </button>
                          ) : null}
                        </div>

                        <AnimatePresence initial={false}>
                          {isOpen && hasChildren ? (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              className="overflow-hidden border-l border-border pl-4"
                            >
                              <div className="space-y-1 pb-3">
                                {item.children?.map((child) => {
                                  const childHasChildren =
                                    (child.children?.length ?? 0) > 0;
                                  const childIsOpen = openIds.includes(child.id);

                                  return (
                                    <div key={child.id} className="py-1">
                                      <div className="flex items-center justify-between gap-3">
                                        <Link
                                          href={`/${child.url}`}
                                          className="min-w-0 text-sm text-muted-foreground transition hover:text-foreground"
                                          onClick={onMobileClose}
                                        >
                                          {child.title}
                                        </Link>
                                        {childHasChildren ? (
                                          <button
                                            type="button"
                                            onClick={() => toggleOpen(child.id)}
                                            className="inline-flex h-8 w-8 items-center justify-center border border-border bg-background text-muted-foreground transition hover:bg-muted/60"
                                            aria-expanded={childIsOpen}
                                            aria-label={`Mở ${child.title}`}
                                          >
                                            <ChevronRight
                                              className={`h-3.5 w-3.5 transition-transform ${childIsOpen ? "rotate-90" : ""
                                                }`}
                                            />
                                          </button>
                                        ) : null}
                                      </div>

                                      <AnimatePresence initial={false}>
                                        {childIsOpen && childHasChildren ? (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.18 }}
                                            className="overflow-hidden pl-3"
                                          >
                                            <div className="mt-2 space-y-2 border-l border-border pl-3">
                                              {child.children?.map((grandChild) => (
                                                <Link
                                                  key={grandChild.id}
                                                  href={`/${grandChild.url}`}
                                                  className="block text-sm text-muted-foreground transition hover:text-foreground"
                                                  onClick={onMobileClose}
                                                >
                                                  {grandChild.title}
                                                </Link>
                                              ))}
                                            </div>
                                          </motion.div>
                                        ) : null}
                                      </AnimatePresence>
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-border px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Điều hướng nhanh
                  </p>
                  <div className="mt-3 space-y-2">
                    {MENU_ITEMS.filter((item) => item.link).map((item) => (
                      <Link
                        key={item.value}
                        href={item.link ?? "#"}
                        onClick={onMobileClose}
                        className="flex items-center justify-between border border-border px-3 py-2 text-sm text-foreground transition hover:bg-muted/60"
                      >
                        <span>{t(item.labelKey)}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

MenuCategories.displayName = "MenuCategories";
