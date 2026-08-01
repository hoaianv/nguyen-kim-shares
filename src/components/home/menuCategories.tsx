"use client";

import { i18nText } from "@/lib/i18nText";
import { MENU_ITEMS } from "@/constants";
import { useCategoriesStore } from "@/stores/useCategories";
import { ArrowLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

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

  const activeCategory =
    categories?.[activeIndex] ?? categories?.[0] ?? null;

  useEffect(() => {
    if (!categories?.length) return;

    if (activeIndex >= categories.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, categories]);

  useEffect(() => {
    if (!open && !mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, mobileOpen]);

  useEffect(() => {
    if (!open && !mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (mobileOpen) {
        onMobileClose();
        return;
      }

      onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, mobileOpen, onClose, onMobileClose]);

  useEffect(() => {
    if (!mobileOpen) {
      setOpenIds([]);
      return;
    }

    const firstFocusable = drawerRef.current?.querySelector<
      HTMLButtonElement | HTMLAnchorElement
    >("button, a");

    firstFocusable?.focus();
  }, [mobileOpen]);

  const toggleOpen = (categoryId: number) => {
    setOpenIds((currentIds) =>
      currentIds.includes(categoryId)
        ? currentIds.filter((id) => id !== categoryId)
        : [...currentIds, categoryId]
    );
  };

  if (!categories?.length) return null;

  return (
    <>
      {/* Desktop overlay */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label={i18nText("AUTO.components.home.menucategories.line121_0_dong_danh_muc_san_pham")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={onClose}
            className="
              fixed inset-0 z-[60] hidden cursor-default
              bg-black/35 backdrop-blur-[1px] lg:block
            "
          />
        )}
      </AnimatePresence>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={i18nText("AUTO.components.home.menucategories.line143_1_danh_muc_san_pham")}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.995 }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.995 }
            }
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            className="
              absolute left-0 right-0 top-full z-[70]
              hidden w-full pt-3 lg:block
            "
          >
            <div
              className="
                grid h-[clamp(440px,66vh,640px)]
                grid-cols-[320px_minmax(0,1fr)]
                gap-3
              "
            >
              {/* Danh mục cha */}
              <aside
                className="
                  min-h-0 overflow-hidden rounded-sm
                  border border-border bg-background
                  shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)]
                "
              >
                <nav
                  aria-label={i18nText("AUTO.components.home.menucategories.line184_2_danh_muc_san_pham")}
                  className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 py-1.5"
                >
                  {categories.map((item, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <Link
                        key={item.id}
                        href={`/${item.url}`}
                        aria-current={isActive ? "page" : undefined}
                        onMouseEnter={() => setActiveIndex(index)}
                        onFocus={() => setActiveIndex(index)}
                        onClick={onClose}
                        className={`group relative flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/30
                          ${isActive
                            ? "bg-muted/70 text-foreground"
                            : "text-foreground hover:bg-muted/40"
                          }
                        `}
                      >
                        <span
                          className={`
                            absolute bottom-1.5 left-0 top-1.5
                            w-0.5 rounded-r-sm transition-opacity
                            ${isActive
                              ? "bg-primary opacity-100"
                              : "opacity-0"
                            }
                          `}
                        />
                        <div className="flex justify-center items-center">


                          {item.picture ? (
                            <div
                              className=" 
    relative h-7 w-[50px] shrink-0
    overflow-hidden rounded-sm bg-muted/30
  "
                            >
                              <Image
                                src={item.picture}
                                alt={item.title}
                                fill
                                sizes="50px"
                                className="
      object-contain p-0.5
      transition-transform duration-200
      group-hover:scale-105
    "
                              />
                            </div>
                          ) : null}

                          <span className="min-w-0 flex-1 truncate font-semibold">
                            {item.title}
                          </span>

                        </div>

                        <ChevronRight
                          className={`
                            h-4 w-4 shrink-0
                            transition-transform duration-150
                            ${isActive
                              ? "translate-x-0.5 text-foreground"
                              : "text-muted-foreground"
                            }
                          `}
                        />
                      </Link>
                    );
                  })}
                </nav>
              </aside>

              {/* Danh mục con */}
              <section
                className="
                  min-h-0 overflow-hidden rounded-sm
                  border border-border bg-background
                  shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)]
                "
              >
                <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 p-5">
                  {activeCategory?.children?.length ? (
                    <div
                      className="
                        grid items-start gap-x-5 gap-y-6
                        xl:grid-cols-2 2xl:grid-cols-3
                      "
                    >
                      {activeCategory.children.map((group) => (
                        <section key={group.id} className="min-w-0">
                          <div className="mb-2">
                            <Link
                              href={`/${group.url}`}
                              onClick={onClose}
                              className="
                                block truncate text-sm font-semibold
                                text-foreground transition-colors
                                hover:text-primary
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-primary/30
                              "
                            >
                              {group.title}
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {group.children?.length ? (
                              group.children.map((item) => (
                                <Link
                                  key={item.id}
                                  href={`/${item.url}`}
                                  onClick={onClose}
                                  title={item.title}
                                  className="
                                    group/item flex min-h-11 min-w-0
                                    items-center gap-2 rounded-sm
                                    border border-border bg-background
                                    px-2 py-1.5 text-sm text-foreground
                                    transition-colors duration-150
                                    hover:border-primary/40
                                    hover:bg-muted/40
                                    focus-visible:outline-none
                                    focus-visible:ring-2
                                    focus-visible:ring-primary/30
                                  "
                                >
                                  {item.picture ? (
                                    <span
                                      className="
                                        relative h-9 w-9 shrink-0
                                        overflow-hidden rounded-sm
                                        bg-muted/30
                                      "
                                    >
                                      <Image
                                        src={item.picture}
                                        alt={item.title}
                                        fill
                                        sizes="36px"
                                        className="
                                          object-contain p-0.5
                                          transition-transform duration-200
                                          group-hover/item:scale-105
                                        "
                                      />
                                    </span>
                                  ) : null}

                                  <span className="line-clamp-2 min-w-0 leading-4">
                                    {item.title}
                                  </span>
                                </Link>
                              ))
                            ) : (
                              <Link
                                href={`/${group.url}`}
                                onClick={onClose}
                                className="
                                  col-span-2 flex min-h-11 items-center
                                  rounded-sm border border-border
                                  bg-background px-3 py-2
                                  text-sm text-foreground
                                  transition-colors
                                  hover:border-primary/40
                                  hover:bg-muted/40
                                "
                              >
                                {group.picture ? (
                                  <span
                                    className="
                                      relative mr-2 h-9 w-9
                                      shrink-0 overflow-hidden
                                      rounded-sm bg-muted/30
                                    "
                                  >
                                    <Image
                                      src={group.picture}
                                      alt={group.title}
                                      fill
                                      sizes="36px"
                                      className="object-contain p-0.5"
                                    />
                                  </span>
                                ) : null}

                                <span className="line-clamp-2">
                                  {group.title}
                                </span>
                              </Link>
                            )}
                          </div>
                        </section>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="
                        flex h-full min-h-72 flex-col
                        items-center justify-center
                        border border-dashed border-border
                        bg-muted/20 px-6 text-center
                      "
                    >
                      {activeCategory?.picture ? (
                        <div className="relative mb-4 h-20 w-20">
                          <Image
                            src={activeCategory.picture}
                            alt={activeCategory.title}
                            fill
                            sizes="80px"
                            className="object-contain"
                          />
                        </div>
                      ) : null}

                      <h3 className="text-base font-semibold text-foreground">
                        {activeCategory?.title}
                      </h3>

                      <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        {activeCategory?.description ||
                          i18nText("AUTO.components.home.menucategories.line412_3_danh_muc_nay_hien_chua")}
                      </p>

                      <Link
                        href={`/${activeCategory?.url ?? ""}`}
                        onClick={onClose}
                        className="
                          mt-4 inline-flex min-h-10 items-center
                          justify-center gap-2 rounded-sm
                          border border-border bg-background
                          px-4 text-sm font-medium text-foreground
                          transition-colors hover:bg-muted/50
                        "
                      >{i18nText("AUTO.components.home.menucategories.line426_4_xem_danh_muc")}<ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-[80] lg:hidden"
            role="presentation"
          >
            <button
              type="button"
              aria-label={i18nText("AUTO.components.home.menucategories.line451_5_dong_danh_muc")}
              className="absolute inset-0 bg-foreground/60"
              onClick={onMobileClose}
            />

            <motion.div
              ref={drawerRef}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { x: "-100%" }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { x: 0 }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { x: "-100%" }
              }
              transition={{
                duration: 0.22,
                ease: "easeOut",
              }}
              role="dialog"
              aria-modal="true"
              aria-label={i18nText("AUTO.components.home.menucategories.line479_6_danh_muc_san_pham")}
              className="
                relative flex h-full w-[88vw]
                max-w-[380px] flex-col
                border-r border-border bg-background
                text-foreground
                shadow-[0_30px_100px_-35px_rgba(15,23,42,0.5)]
              "
            >
              <div
                className="
                  flex items-center justify-between
                  border-b border-border px-4 py-4
                "
              >
                <div>
                  <div
                    className="
                      text-xs uppercase tracking-[0.24em]
                      text-muted-foreground
                    "
                  >
                    Menu
                  </div>

                  <div className="mt-1 text-base font-semibold text-foreground">
                    {t("HEADER.product_category")}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onMobileClose}
                  aria-label={i18nText("AUTO.components.home.menucategories.line512_7_dong_menu")}
                  className="
                    inline-flex h-10 w-10 items-center
                    justify-center rounded-sm
                    border border-border bg-background
                    text-foreground transition-colors
                    hover:bg-muted/60
                  "
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                <div className="border-b border-border px-4 py-3">
                  <button
                    type="button"
                    onClick={onMobileClose}
                    className="
                      inline-flex items-center gap-2
                      text-sm font-medium text-foreground
                      transition-colors hover:text-primary
                    "
                  >
                    <ArrowLeft className="h-4 w-4" />{i18nText("AUTO.components.home.menucategories.line537_8_quay_lai")}</button>
                </div>

                <div className="divide-y divide-border">
                  {categories.map((item) => {
                    const hasChildren =
                      (item.children?.length ?? 0) > 0;

                    const isOpen = openIds.includes(item.id);

                    return (
                      <div key={item.id} className="px-4">
                        <div
                          className="
                            flex items-center justify-between
                            gap-3 py-3
                          "
                        >
                          <Link
                            href={`/${item.url}`}
                            onClick={onMobileClose}
                            className="
                              flex min-w-0 items-center gap-3
                              text-sm font-medium text-foreground
                              transition-colors hover:text-primary
                            "
                          >
                            {item.picture ? (
                              <span className="relative h-8 w-8 shrink-0">
                                <Image
                                  src={item.picture}
                                  alt={item.title}
                                  fill
                                  sizes="32px"
                                  className="object-contain"
                                />
                              </span>
                            ) : null}

                            <span className="truncate">
                              {item.title}
                            </span>
                          </Link>

                          {hasChildren ? (
                            <button
                              type="button"
                              onClick={() => toggleOpen(item.id)}
                              aria-expanded={isOpen}
                              aria-label={
                                isOpen
                                  ? i18nText("AUTO.components.home.menucategories.line589_9_dong", { value0: item.title })
                                  : i18nText("AUTO.components.home.menucategories.line590_10_mo", { value0: item.title })
                              }
                              className="
                                inline-flex h-9 w-9 shrink-0
                                items-center justify-center
                                rounded-sm border border-border
                                bg-background text-muted-foreground
                                transition-colors hover:bg-muted/60
                              "
                            >
                              <ChevronRight
                                className={`
                                  h-4 w-4 transition-transform
                                  ${isOpen ? "rotate-90" : ""}
                                `}
                              />
                            </button>
                          ) : null}
                        </div>

                        <AnimatePresence initial={false}>
                          {isOpen && hasChildren && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.22,
                                ease: "easeOut",
                              }}
                              className="
                                overflow-hidden border-l
                                border-border pl-4
                              "
                            >
                              <div className="space-y-1 pb-3">
                                {item.children?.map((child) => {
                                  const childHasChildren =
                                    (child.children?.length ?? 0) > 0;

                                  const childIsOpen =
                                    openIds.includes(child.id);

                                  return (
                                    <div
                                      key={child.id}
                                      className="py-1"
                                    >
                                      <div
                                        className="
                                          flex items-center
                                          justify-between gap-3
                                        "
                                      >
                                        <Link
                                          href={`/${child.url}`}
                                          onClick={onMobileClose}
                                          className="
                                            min-w-0 text-sm
                                            text-muted-foreground
                                            transition-colors
                                            hover:text-foreground
                                          "
                                        >
                                          {child.title}
                                        </Link>

                                        {childHasChildren ? (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              toggleOpen(child.id)
                                            }
                                            aria-expanded={childIsOpen}
                                            aria-label={
                                              childIsOpen
                                                ? i18nText("AUTO.components.home.menucategories.line675_11_dong", { value0: child.title })
                                                : i18nText("AUTO.components.home.menucategories.line676_12_mo", { value0: child.title })
                                            }
                                            className="
                                              inline-flex h-8 w-8
                                              shrink-0 items-center
                                              justify-center rounded-sm
                                              border border-border
                                              bg-background
                                              text-muted-foreground
                                              transition-colors
                                              hover:bg-muted/60
                                            "
                                          >
                                            <ChevronRight
                                              className={`
                                                h-3.5 w-3.5
                                                transition-transform
                                                ${childIsOpen
                                                  ? "rotate-90"
                                                  : ""
                                                }
                                              `}
                                            />
                                          </button>
                                        ) : null}
                                      </div>

                                      <AnimatePresence initial={false}>
                                        {childIsOpen &&
                                          childHasChildren ? (
                                          <motion.div
                                            initial={{
                                              height: 0,
                                              opacity: 0,
                                            }}
                                            animate={{
                                              height: "auto",
                                              opacity: 1,
                                            }}
                                            exit={{
                                              height: 0,
                                              opacity: 0,
                                            }}
                                            transition={{
                                              duration: 0.18,
                                            }}
                                            className="overflow-hidden pl-3"
                                          >
                                            <div
                                              className="
                                                mt-2 space-y-2
                                                border-l border-border
                                                pl-3
                                              "
                                            >
                                              {child.children?.map(
                                                (grandChild) => (
                                                  <Link
                                                    key={grandChild.id}
                                                    href={`/${grandChild.url}`}
                                                    onClick={onMobileClose}
                                                    className="
                                                      block text-sm
                                                      text-muted-foreground
                                                      transition-colors
                                                      hover:text-foreground
                                                    "
                                                  >
                                                    {grandChild.title}
                                                  </Link>
                                                )
                                              )}
                                            </div>
                                          </motion.div>
                                        ) : null}
                                      </AnimatePresence>
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-border px-4 py-4">
                  <p
                    className="
                      text-xs uppercase tracking-[0.24em]
                      text-muted-foreground
                    "
                  >{i18nText("AUTO.components.home.menucategories.line771_13_dieu_huong_nhanh")}</p>

                  <div className="mt-3 space-y-2">
                    {MENU_ITEMS.filter((item) => item.link).map(
                      (item) => (
                        <Link
                          key={item.value}
                          href={item.link ?? "#"}
                          onClick={onMobileClose}
                          className="
                            flex items-center justify-between
                            rounded-sm border border-border
                            px-3 py-2 text-sm text-foreground
                            transition-colors hover:bg-muted/60
                          "
                        >
                          <span>{t(item.labelKey)}</span>

                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      )
                    )}
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
