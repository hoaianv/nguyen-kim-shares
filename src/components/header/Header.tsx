"use client";

import { i18nText } from "@/lib/i18nText";
import InputSearch from "@/components/ui/inputSearch";
import Popover from "@/components/ui/Popover";
import { ContactPopup } from "@/components/header/PopupHeader";
import { name } from "@/constants/company.constant";
import { HEADER_ITEMS, MENU_ITEMS } from "@/constants";
import { bannerKeys } from "@/constants/values.constant";
import { useSearchActions } from "@/hooks/useSearchActions";
import { useStateStore } from "@/stores/stateStore";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { memo, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const MenuCategories = dynamic(
  () => import("@/components/home/menuCategories"),
  {
    ssr: false,
  },
);

const utilityLinkValues = [
  "promotion_news",
  "pc_builder",
  "business_solutions",
  "news",
  "contact",
  "careers",
];

const hotKeywords = ["PC Gaming", "Laptop", "CPU", "VGA", "RAM", "Mainboard"];

const Header = () => {
  const t = useTranslations();
  const { debouncedChange, handleKeyDown, handleSearch } = useSearchActions();
  const { banner } = useStateStore();
  const headerLogo = banner?.[bannerKeys.bannerHeaderLogo]?.advertises?.[0];

  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);
  const desktopMenuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopMenuPanelRef = useRef<HTMLDivElement>(null);

  const itemsHeader = HEADER_ITEMS;
  const headerActions = itemsHeader.filter((item) =>
    ["auth", "cart"].includes(item.value),
  );
  const utilityLinks = utilityLinkValues
    .map((value) => MENU_ITEMS.find((item) => item.value === value))
    .filter((item): item is (typeof MENU_ITEMS)[number] => Boolean(item));

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!mobileDrawerOpen && !mobileSearchOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileDrawerOpen, mobileSearchOpen]);

  useEffect(() => {
    if (!desktopMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;

      if (
        (target && desktopMenuButtonRef.current?.contains(target)) ||
        (target && desktopMenuPanelRef.current?.contains(target))
      ) {
        return;
      }

      setDesktopMenuOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [desktopMenuOpen]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setMobileSearchOpen(false);
      return;
    }

    handleKeyDown(e);
    if (e.key === "Enter") {
      setMobileSearchOpen(false);
    }
  };

  const openDesktopMenu = () => {
    setDesktopMenuOpen(true);
    setMobileDrawerOpen(false);
    setMobileSearchOpen(false);
  };

  const closeDesktopMenu = () => {
    setDesktopMenuOpen(false);
  };

  const renderAction = (item: (typeof itemsHeader)[number]) => {
    const trigger = item.renderItem?.();
    if (!trigger) return null;

    if (!item.hasPopup || !item.renderPopup) {
      return <div key={item.value}>{trigger}</div>;
    }

    if (!isDesktop && item.value !== "cart") {
      return <div key={item.value}>{trigger}</div>;
    }

    return (
      <Popover
        key={item.value}
        trigger={trigger}
        title=""
        openOn="hover"
        position="bottom"
        className={
          item.value === "cart"
            ? "border-slate-200 shadow-[0_18px_42px_-28px_rgba(15,23,42,0.28)]"
            : "border-0 shadow-[0_16px_36px_-20px_rgba(15,23,42,0.32)]"
        }
      >
        {item.renderPopup()}
      </Popover>
    );
  };

  return (
    <header
      className={`sticky top-0 bg-[var(--theme-nav-bg)] text-[var(--theme-nav-text)] shadow-sm ${desktopMenuOpen ? "z-[90]" : "z-50"
        }`}
    >
      <div className="theme-topbar bg-primary text-primary-foreground">
        <div className="mx-auto flex h-9 max-w-[1370px] items-center justify-start gap-5 overflow-x-auto px-3 text-sm font-medium sm:px-4 lg:justify-center lg:gap-8 lg:overflow-visible">
          {utilityLinks.map((item) => {
            const Icon = item.icon;
            const triggerClassName =
              "inline-flex shrink-0 items-center gap-1.5 transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

            if (item.value === "contact") {
              return (
                <Popover
                  key={item.value}
                  trigger={
                    <button type="button" className={triggerClassName}>
                      <Icon className="h-4 w-4" />
                      {t(item.labelKey)}
                    </button>
                  }
                  openOn={isDesktop ? "hover" : "click"}
                  position="bottom"
                  className="fixed left-1/2 top-12 -translate-x-1/2 border-0 bg-transparent p-0 shadow-none lg:absolute lg:top-full lg:mt-2"
                >
                  <ContactPopup />
                </Popover>
              );
            }

            return (
              <Link
                key={item.value}
                href={item.link ?? "#"}
                className={triggerClassName}
              >
                <Icon className="h-4 w-4" />
                {t(item.labelKey)}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-b theme-border bg-[var(--theme-nav-bg)]">
        <div className="mx-auto grid max-w-[1370px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:px-4 lg:grid-cols-[180px_176px_minmax(0,1fr)_auto] lg:gap-5 lg:py-3.5">
          <button
            type="button"
            onClick={() => {
              setMobileDrawerOpen((prev) => !prev);
              closeDesktopMenu();
              setMobileSearchOpen(false);
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border theme-border bg-[var(--theme-section-bg)] text-[var(--theme-text)] lg:hidden"
            aria-label={i18nText("AUTO.components.header.header.line216_0_mo_menu")}
          >
            {mobileDrawerOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <Link href="/" className="relative block w-[144px] shrink-0 lg:w-[180px]">
            <span className="theme-corner-decor -left-7 top-7 h-12 w-12" />
            {headerLogo?.picture ? (
              <Image
                src={headerLogo.picture}
                alt={name}
                width={190}
                height={80}
                priority
                className="h-16 w-full object-contain lg:h-20"
              />
            ) : null}
          </Link>

          <button
            ref={desktopMenuButtonRef}
            type="button"
            onClick={() =>
              desktopMenuOpen ? closeDesktopMenu() : openDesktopMenu()
            }
            className={`relative z-[100] hidden h-8 items-center justify-center gap-2 rounded-sm border px-3 text-sm font-semibold transition lg:inline-flex ${desktopMenuOpen
                ? "border-[var(--brand-primary)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)] shadow-sm"
                : "theme-border bg-[var(--theme-section-bg)] text-[var(--theme-text)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary-strong)]"
              }`}
            aria-expanded={desktopMenuOpen}
            aria-controls="desktop-category-panel"
            aria-label={
              desktopMenuOpen
                ? i18nText("AUTO.components.header.header.line252_1_dong_danh_muc_san_pham")
                : i18nText("AUTO.components.header.header.line253_2_mo_danh_muc_san_pham")
            }
            title={
              desktopMenuOpen
                ? i18nText("AUTO.components.header.header.line257_3_dong_danh_muc_san_pham")
                : i18nText("AUTO.components.header.header.line258_4_mo_danh_muc_san_pham")
            }
          >
            {desktopMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
            <span className="whitespace-nowrap">
              {desktopMenuOpen ? i18nText("AUTO.components.header.header.line267_5_dong_danh_muc") : i18nText("AUTO.components.header.header.line267_6_danh_muc_san_pham")}
            </span>
          </button>

          <div className="relative col-span-3 order-3 min-w-0 lg:col-span-1 lg:order-none">
            <div className="relative">
              <InputSearch
                placeholder={i18nText("AUTO.components.header.header.line274_7_tim_gi")}
                onClick={() => {
                  setMobileSearchOpen(false);
                  setDesktopMenuOpen(false);
                }}
                onFocus={() => {
                  setMobileSearchOpen(false);
                  setDesktopMenuOpen(false);
                }}
                onChange={(value) => {
                  setSearchValue(value);
                  debouncedChange(value);
                }}
                onKeyDown={handleSearchKeyDown}
                showSearchIcon={false}
                className="h-11 rounded-sm border border-[var(--theme-border)] bg-[var(--theme-section-bg)] pl-4 pr-[102px] text-base placeholder:text-[var(--theme-muted-text)] hover:border-[var(--brand-primary)] focus:border-[var(--brand-primary)]"
              />

              <button
                type="button"
                onClick={() => handleSearch(searchValue)}
                className="theme-cta absolute right-0 top-0 inline-flex h-11 w-[94px] items-center justify-center rounded-sm text-sm font-semibold transition"
                aria-label={i18nText("AUTO.components.header.header.line296_8_tim_kiem")}
              >
                <Search className="mr-1.5 h-[18px] w-[18px]" />
                <span className="hidden sm:inline">{i18nText("AUTO.components.header.header.line299_9_tim_kiem")}</span>
              </button>
            </div>

            <nav className="absolute left-0 top-full mt-2 hidden items-center gap-4 text-sm text-slate-600 lg:flex">
              {hotKeywords.map((keyword) => (
                <Link
                  key={keyword}
                  href={`/san-pham?keyword=${encodeURIComponent(keyword)}`}
                  className="transition hover:text-[var(--brand-primary-strong)]"
                >
                  {keyword}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-start justify-end gap-2">
            <div className="hidden items-center gap-1 lg:flex">
              {headerActions.map(renderAction)}
            </div>
            <Link
              href="/gio-hang"
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border theme-border text-[var(--theme-text)] lg:hidden"
              aria-label={i18nText("AUTO.components.header.header.line323_10_gio_hang")}
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b theme-border bg-[var(--theme-nav-bg)] lg:hidden">
        <div className="mx-auto flex max-w-[1370px] items-center gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 px-3 pb-3 text-sm text-slate-700 sm:px-4">
          {hotKeywords.map((keyword) => (
            <Link
              key={keyword}
              href={`/san-pham?keyword=${encodeURIComponent(keyword)}`}
              className="shrink-0"
            >
              {keyword}
            </Link>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1370px] px-3 sm:px-4">
        <MenuCategories
          open={desktopMenuOpen}
          mobileOpen={mobileDrawerOpen}
          id="desktop-category-panel"
          panelRef={desktopMenuPanelRef}
          onClose={closeDesktopMenu}
          onMobileClose={() => setMobileDrawerOpen(false)}
        />
      </div>

      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-[70] lg:hidden"
            role="presentation"
          >
            <button
              type="button"
              aria-label={i18nText("AUTO.components.header.header.line368_11_dong_tim_kiem")}
            className="absolute inset-0 bg-[var(--theme-section-bg)]/95"
              onClick={() => setMobileSearchOpen(false)}
            />

            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-x-0 top-0 mx-auto flex h-full max-w-[1370px] flex-col bg-[var(--theme-section-bg)] px-4 py-4"
            >
              <div className="flex items-center justify-between gap-3 border-b theme-border pb-3">
                <h2 className="text-base font-bold text-[var(--theme-text)]">{i18nText("AUTO.components.header.header.line382_12_tim_kiem_san_pham")}</h2>
                <button
                  type="button"
                  onClick={() => setMobileSearchOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border theme-border bg-[var(--theme-section-bg)] text-[var(--theme-text)]"
                  aria-label={i18nText("AUTO.components.header.header.line388_13_dong_tim_kiem")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative mt-4">
                <InputSearch
                  placeholder={t("HEADER.search_placeholder")}
                  onFocus={() => setMobileSearchOpen(true)}
                  onClick={() => setMobileSearchOpen(true)}
                  onChange={(value) => {
                    setSearchValue(value);
                    debouncedChange(value);
                  }}
                  onKeyDown={handleSearchKeyDown}
                  className="h-11 rounded-sm border-[var(--theme-border)] bg-[var(--theme-section-bg)] pl-4 pr-4 text-sm"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

Header.displayName = "Header";

export default memo(Header);
