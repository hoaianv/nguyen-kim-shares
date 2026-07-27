"use client";

import { bannerKeys } from "@/constants/values.constant";
import {
  hotline,
  nameSiteUpcase,
  technicalHotline,
} from "@/constants/company.constant";
import type { IMenu } from "@/interfaces/models/IMenu.interface";
import { useCategoriesStore } from "@/stores/useCategories";
import { useStateStore } from "@/stores/stateStore";
import {
  ArrowRight,
  BadgePercent,
  ChevronRight,
  Headphones,
  Menu,
  MonitorCog,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useEffect, useMemo, useRef, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const quickServices = [
  {
    title: "Giao hàng nhanh",
    description: "Nội thành và đơn dự án",
    icon: Truck,
  },
  {
    title: "Hỗ trợ kỹ thuật",
    description: technicalHotline,
    icon: Headphones,
  },
  {
    title: "Bảo hành rõ ràng",
    description: "Theo chính sách hãng",
    icon: ShieldCheck,
  },
  {
    title: "Build PC",
    description: "Tư vấn cấu hình",
    icon: MonitorCog,
  },
];

const fallbackSlides = [
  {
    title: "Laptop, PC và thiết bị văn phòng chính hãng",
    description: "Giá tốt cho khách lẻ, đại lý và doanh nghiệp.",
    picture: "/images/categories/laptop.webp",
    href: "/san-pham",
  },
  {
    title: "Giải pháp trọn bộ cho văn phòng hiện đại",
    description: "Máy tính, máy in, mạng và phần mềm triển khai cùng một nơi.",
    picture: "/images/categories/office-equipment.webp",
    href: "/giai-phap-cho-doanh-nghiep",
  },
];

type HeroSlide = {
  id: string | number;
  title: string;
  description: string;
  picture: string;
  href: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
};

type MegaMenuColumnData = {
  id: string | number;
  title: string;
  href: string;
  items: IMenu[];
};

function buildMegaMenuColumns(category: IMenu): MegaMenuColumnData[] {
  const groups = category.children ?? [];
  const nestedGroups = groups.filter((item) => (item.children?.length ?? 0) > 0);
  const leafGroups = groups.filter((item) => !(item.children?.length ?? 0));

  if (nestedGroups.length > 0) {
    const columns: MegaMenuColumnData[] = nestedGroups.map((group) => ({
      id: group.id,
      title: group.title,
      href: `/${group.url}`,
      items: group.children ?? [],
    }));

    if (leafGroups.length > 0) {
      columns.push({
        id: `${category.id}-leaf`,
        title: "Danh mục khác",
        href: `/${category.url}`,
        items: leafGroups,
      });
    }

    return columns;
  }

  return [
    {
      id: `${category.id}-direct`,
      title: "Danh mục con",
      href: `/${category.url}`,
      items: groups,
    },
  ];
}

function CategorySidebarItem({
  item,
  active,
  onActivate,
}: {
  item: IMenu;
  active: boolean;
  onActivate: (item: IMenu | null) => void;
}) {
  const hasChildren = (item.children?.length ?? 0) > 0;

  return (
    <Link
      href={`/${item.url}`}
      aria-haspopup={hasChildren ? "menu" : undefined}
      aria-expanded={hasChildren ? active : undefined}
      onMouseEnter={() => onActivate(hasChildren ? item : null)}
      onFocus={() => onActivate(hasChildren ? item : null)}
      className={`group flex min-h-[43px] items-center gap-3 px-3 text-sm font-medium transition focus-visible:outline-none ${active
        ? "bg-[#fff7da] text-[#e6a414]"
        : "text-slate-800 hover:bg-[#fff7da] hover:text-[#e6a414]"
        } ${hasChildren ? "pr-9" : ""}`}
    >
      {item.picture ? (
        <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded bg-slate-50">
          <Image
            src={item.picture}
            alt={item.title}
            fill
            sizes="28px"
            className="object-contain p-1"
          />
        </span>
      ) : (
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#ffb716]" />
      )}

      <span className="min-w-0 flex-1 truncate">{item.title}</span>

      {hasChildren ? (
        <ChevronRight
          className={`h-4 w-4 shrink-0 transition ${active
            ? "translate-x-0.5 text-[#e6a414]"
            : "text-slate-300 group-hover:translate-x-0.5 group-hover:text-[#e6a414]"
            }`}
        />
      ) : (
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 opacity-0 transition group-hover:translate-x-0.5 group-hover:text-[#e6a414]" />
      )}
    </Link>
  );
}

function MegaMenuColumn({ column }: { column: MegaMenuColumnData }) {
  const directLinks = column.items.filter((item) => !(item.children?.length ?? 0));

  return (
    <section className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.25)]">
      <Link
        href={column.href}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition hover:text-[#e6a414]"
      >
        <span className="truncate">{column.title}</span>
        <ChevronRight className="h-4 w-4 shrink-0" />
      </Link>

      <div className="mt-3 space-y-2">
        {directLinks.length > 0 ? (
          directLinks.map((item) => (
            <Link
              key={item.id}
              href={`/${item.url}`}
              className="block rounded-lg px-2 py-1.5 text-sm text-slate-700 transition hover:bg-[#fff7da] hover:text-[#e6a414]"
            >
              {item.title}
            </Link>
          ))
        ) : (
          <p className="text-xs text-slate-400">Chưa có danh mục con</p>
        )}
      </div>
    </section>
  );
}

function MegaMenuPanel({
  category,
  sidebarHeight,
}: {
  category: IMenu;
  sidebarHeight: number;
}) {
  const columns = buildMegaMenuColumns(category);

  return (
    <div
      className="absolute left-full top-0 z-40 ml-3 rounded-md border border-slate-200 bg-white shadow-[0_24px_80px_-36px_rgba(15,23,42,0.45)]"
      style={{
        width: "min(1080px, calc(100vw - 280px))",
      }}
    >


      <div
        className="max-h-[calc(100vh-180px)] overflow-y-auto p-5"
        style={{
          minHeight: sidebarHeight,
        }}
      >
        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {columns.map((column) => (
            <MegaMenuColumn key={column.id} column={column} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Banner() {
  const { banner } = useStateStore();
  const { categories } = useCategoriesStore();
  const reduceMotion = useReducedMotion();
  const sidebarBoxRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [sidebarHeight, setSidebarHeight] = useState<number | null>(null);
  const mainAds = banner[bannerKeys.bannerMainHome]?.advertises || [];
  const sideAds = banner[bannerKeys.bannerMainRight]?.advertises || [];
  const visibleCategories = useMemo(() => categories?.slice(0, 11) ?? [], [categories]);

  const activeCategory =
    visibleCategories.find((item) => item.id === activeCategoryId) ?? null;

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleCloseMegaMenu = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setActiveCategoryId(null);
    }, 140);
  };

  const handleActivateCategory = (item: IMenu | null) => {
    clearCloseTimer();

    if (!item || (item.children?.length ?? 0) === 0) {
      setActiveCategoryId(null);
      return;
    }

    setActiveCategoryId(item.id);
  };

  useEffect(() => {
    if (!activeCategoryId) return;

    const exists = visibleCategories.some((item) => item.id === activeCategoryId);
    if (!exists) {
      setActiveCategoryId(null);
    }
  }, [activeCategoryId, visibleCategories]);

  useEffect(() => {
    const el = sidebarBoxRef.current;
    if (!el) return;

    const updateHeight = () => {
      setSidebarHeight(el.offsetHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);

    return () => observer.disconnect();
  }, [visibleCategories.length]);

  useEffect(() => () => clearCloseTimer(), []);

  const slides: HeroSlide[] =
    mainAds.length > 0
      ? mainAds.map((item) => ({
        title: item.title,
        description: item.description || nameSiteUpcase,
        picture: item.picture,
        href: item.link || "/san-pham",
        target:
          item.target === "_blank" ||
            item.target === "_self" ||
            item.target === "_parent" ||
            item.target === "_top"
            ? item.target
            : undefined,
        id: item.id,
      }))
      : fallbackSlides.map((item, index) => ({ ...item, id: index }));

  return (
    <motion.section
      className="mx-auto mt-3 w-full max-w-[1520px] px-3 sm:px-4 lg:px-6"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: "easeOut" }}
    >
      <div className="grid gap-3 lg:grid-cols-[245px_minmax(0,1fr)_290px]">
        <aside
          ref={sidebarBoxRef}
          className="hidden relative overflow-visible rounded-md border border-[#d91f26]/20 bg-white shadow-sm lg:block"
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleCloseMegaMenu}
          onFocusCapture={clearCloseTimer}
          onBlurCapture={(event) => {
            const nextTarget = event.relatedTarget as Node | null;
            if (nextTarget && sidebarBoxRef.current?.contains(nextTarget)) {
              return;
            }

            scheduleCloseMegaMenu();
          }}
        >
          <div className="relative z-20 rounded-t-md bg-[#ffb716] px-4 text-sm font-semibold uppercase text-slate-950">
            <div className="flex h-11 items-center gap-2">
              <Menu className="h-4 w-4" />
              Danh mục sản phẩm
            </div>
          </div>

          <nav className="relative z-20 divide-y divide-slate-100">
            {visibleCategories.map((item) => (
              <CategorySidebarItem
                key={item.id}
                item={item}
                active={activeCategoryId === item.id}
                onActivate={handleActivateCategory}
              />
            ))}
          </nav>
          {activeCategory?.children?.length ? (
            <MegaMenuPanel
              category={activeCategory}
              sidebarHeight={sidebarHeight ?? 420}
            />
          ) : null}
        </aside>

        <div className="min-w-0 overflow-hidden rounded-md bg-white shadow-sm">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            loop={slides.length > 1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            className="nk-home-hero-swiper h-full"
          >
            {slides.map((item, index) => (
              <SwiperSlide key={item.id}>
                <Link
                  href={item.href}
                  target={item.target}
                  className="group relative block aspect-[16/8.25] min-h-[260px] overflow-hidden bg-slate-950 sm:min-h-[340px] lg:min-h-[435px]"
                >
                  <Image
                    priority={index === 0}
                    src={item.picture}
                    alt={item.title}
                    fill
                    quality={92}
                    sizes="(max-width: 1024px) 100vw, 940px"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/20 to-transparent" />
                  <div className="absolute inset-y-0 left-0 flex max-w-[560px] flex-col justify-center px-5 py-6 text-white sm:px-8">
                    <p className="inline-flex w-fit items-center gap-2 rounded bg-[#ffb716] px-3 py-1 text-xs font-bold uppercase text-slate-950">
                      <BadgePercent className="h-3.5 w-3.5" />
                      Ưu đãi nổi bật
                    </p>
                    <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                      {item.title}
                    </h1>
                    <p className="mt-3 max-w-md text-sm leading-6 text-white/86 sm:text-base">
                      {item.description}
                    </p>
                    <span className="mt-5 inline-flex h-11 w-fit items-center gap-2 rounded bg-[#ffb716] px-5 text-sm font-semibold text-slate-950 transition group-hover:bg-[#e6a414]">
                      Xem ngay
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {sideAds.slice(0, 2).map((item) => (
            <Link
              key={item.id}
              href={item.link || "#"}
              target={item.target}
              className="group relative block min-h-[160px] overflow-hidden rounded-md bg-white shadow-sm"
            >
              <Image
                src={item.picture}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 50vw, 290px"
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/68 via-slate-950/8 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}

          {sideAds.length === 0 ? (
            <>
              <Link
                href="/xay-dung-cau-hinh"
                className="group relative block min-h-[160px] overflow-hidden rounded-md bg-[#111827] p-4 text-white shadow-sm"
              >
                <p className="text-xs font-bold uppercase text-[#ffb716]">
                  Build PC
                </p>
                <p className="mt-2 text-xl font-bold leading-tight">
                  Dựng cấu hình theo ngân sách
                </p>
                <ArrowRight className="absolute bottom-4 right-4 h-5 w-5 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={`tel:${hotline}`}
                className="group relative block min-h-[160px] overflow-hidden rounded-md bg-[#ffb716] p-4 text-slate-950 shadow-sm"
              >
                <p className="text-xs font-bold uppercase text-slate-800/70">
                  Hotline
                </p>
                <p className="mt-2 text-2xl font-bold">{hotline}</p>
                <p className="mt-1 text-sm text-slate-800/80">Tư vấn mua hàng</p>
              </Link>
            </>
          ) : null}
        </div>
      </div>

      <div className="mt-3 grid overflow-hidden rounded-md bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        {quickServices.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#fff7da] text-[#e6a414]">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900">{item.title}</p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
