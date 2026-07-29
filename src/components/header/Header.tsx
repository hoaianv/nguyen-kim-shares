"use client";

import ProductsSearch from "@/components/header/ProductsSearch";
import InputSearch from "@/components/ui/inputSearch";
import Popover from "@/components/ui/Popover";
import { name } from "@/constants/company.constant";
import { bannerKeys } from "@/constants/values.constant";
import { useSearchActions } from "@/hooks/useSearchActions";
import { getHeaderItemsWithState } from "@/lib/utils";
import { useStateStore } from "@/stores/stateStore";
import { useAuthStore } from "@/stores/useAuth";
import {
  CreditCard,
  FileText,
  Gift,
  Menu,
  PhoneCall,
  Search,
  Settings2,
  ShoppingCart,
  X,
} from "lucide-react";
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

const utilityLinks = [
  { label: "Khuyến mãi", href: "/tin-khuyen-mai", icon: Gift },
  { label: "Trả góp", href: "/chinh-sach", icon: CreditCard },
  { label: "Chính sách chung", href: "/chinh-sach", icon: FileText },
  { label: "Xây dựng cấu hình", href: "/xay-dung-cau-hinh", icon: Settings2 },
  { label: "Thông tin hỗ trợ", href: "/lien-he-gop-y", icon: PhoneCall },
];

const hotKeywords = ["PC Gaming", "Laptop", "CPU", "VGA", "RAM", "Mainboard"];

const Header = () => {
  const t = useTranslations();
  const { debouncedChange, handleKeyDown } = useSearchActions();
  const { authenticated } = useAuthStore();
  const { banner } = useStateStore();
  const headerLogo = banner?.[bannerKeys.bannerHeaderLogo]?.advertises?.[0];

  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const desktopMenuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopMenuPanelRef = useRef<HTMLDivElement>(null);

  const itemsHeader = getHeaderItemsWithState(authenticated);
  const headerActions = itemsHeader.filter((item) =>
    ["auth", "cart"].includes(item.value),
  );

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
    if (!desktopSearchOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [desktopSearchOpen]);

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
      setDesktopSearchOpen(false);
      setMobileSearchOpen(false);
      return;
    }

    handleKeyDown(e);
  };

  const openDesktopMenu = () => {
    setDesktopMenuOpen(true);
    setMobileDrawerOpen(false);
    setMobileSearchOpen(false);
    setDesktopSearchOpen(false);
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
      >
        {item.renderPopup()}
      </Popover>
    );
  };

  return (
    <header
      className={`sticky top-0 bg-white text-slate-950 shadow-sm ${desktopMenuOpen ? "z-[90]" : "z-50"
        }`}
    >
      <div className="bg-brand text-slate-950">
        <div className="mx-auto flex h-9 max-w-[1370px] items-center justify-start gap-5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 px-3 text-sm font-medium sm:px-4 lg:justify-center lg:gap-8">
          {utilityLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex shrink-0 items-center gap-1.5 text-slate-950/90 transition hover:text-slate-700"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-[1370px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:px-4 lg:grid-cols-[180px_176px_minmax(0,1fr)_auto] lg:gap-5 lg:py-3.5">
          <button
            type="button"
            onClick={() => {
              setMobileDrawerOpen((prev) => !prev);
              closeDesktopMenu();
              setDesktopSearchOpen(false);
              setMobileSearchOpen(false);
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-900 lg:hidden"
            aria-label="Mở menu"
          >
            {mobileDrawerOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <Link href="/" className="block w-[144px] shrink-0 lg:w-[180px]">
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
                ? "border-brand bg-brand-soft text-brand shadow-sm"
                : "border-slate-200 bg-white text-slate-800 hover:border-brand hover:text-brand"
              }`}
            aria-expanded={desktopMenuOpen}
            aria-controls="desktop-category-panel"
            aria-label={
              desktopMenuOpen
                ? "Đóng danh mục sản phẩm"
                : "Mở danh mục sản phẩm"
            }
            title={
              desktopMenuOpen
                ? "Đóng danh mục sản phẩm"
                : "Mở danh mục sản phẩm"
            }
          >
            {desktopMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
            <span className="whitespace-nowrap">
              {desktopMenuOpen ? "Đóng danh mục" : "Danh mục sản phẩm"}
            </span>
          </button>

          <div className="relative col-span-3 order-3 min-w-0 lg:col-span-1 lg:order-none">
            <div className="relative">
              <InputSearch
                placeholder={t("HEADER.search_placeholder")}
                onClick={() => {
                  setDesktopSearchOpen(true);
                  setMobileSearchOpen(false);
                  setDesktopMenuOpen(false);
                }}
                onFocus={() => {
                  setDesktopSearchOpen(true);
                  setMobileSearchOpen(false);
                  setDesktopMenuOpen(false);
                }}
                onChange={debouncedChange}
                onKeyDown={handleSearchKeyDown}
                className="h-11 rounded-sm border-slate-200 bg-white pl-4 pr-[102px] text-base"
              >
                <ProductsSearch
                  show={desktopSearchOpen}
                  setShow={setDesktopSearchOpen}
                />
              </InputSearch>

              <button
                type="button"
                onClick={() => setDesktopSearchOpen(true)}
                className="absolute right-0 top-0 inline-flex h-11 w-[94px] items-center justify-center rounded-sm bg-brand text-sm font-semibold text-slate-950 transition hover:opacity-95"
                aria-label="Tìm kiếm"
              >
                <Search className="mr-1.5 h-[18px] w-[18px]" />
                <span className="hidden sm:inline">Tìm kiếm</span>
              </button>
            </div>

            <nav className="absolute left-0 top-full mt-2 hidden items-center gap-4 text-sm text-slate-600 lg:flex">
              {hotKeywords.map((keyword) => (
                <Link
                  key={keyword}
                  href={`/san-pham?keyword=${encodeURIComponent(keyword)}`}
                  className="transition hover:text-brand"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 text-slate-900 lg:hidden"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-100 bg-white lg:hidden">
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
              aria-label="Đóng tìm kiếm"
              className="absolute inset-0 bg-white/94"
              onClick={() => setMobileSearchOpen(false)}
            />

            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-x-0 top-0 mx-auto flex h-full max-w-[1370px] flex-col bg-white px-4 py-4"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-950">
                  Tìm kiếm sản phẩm
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileSearchOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-900"
                  aria-label="Đóng tìm kiếm"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative mt-4">
                <InputSearch
                  placeholder={t("HEADER.search_placeholder")}
                  onFocus={() => setMobileSearchOpen(true)}
                  onClick={() => setMobileSearchOpen(true)}
                  onChange={debouncedChange}
                  onKeyDown={handleSearchKeyDown}
                  className="h-11 rounded-sm border-slate-200 bg-white pl-4 pr-4 text-sm"
                >
                  <ProductsSearch
                    show={mobileSearchOpen}
                    setShow={setMobileSearchOpen}
                  />
                </InputSearch>
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
