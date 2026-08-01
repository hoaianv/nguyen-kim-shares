"use client";

import { i18nText } from "@/lib/i18nText";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ICategory } from "@/interfaces/models/ICategories.interface";
import Image from "next/image";

interface CategoryParentTabsProps {
  categories: ICategory[];
}

export default function CategoryParentTabs({
  categories,
}: CategoryParentTabsProps) {
  const pathname = usePathname();

  if (!categories || categories.length === 0) return null;

  const trimSlash = (p: string) => {
    if (!p) return "/";
    const out = p.replace(/\/+$/, "");
    return out || "/";
  };

  const toPathname = (value: string) => {
    if (!value) return "/";
    const v = value.trim();
    if (/^https?:\/\//i.test(v)) {
      try {
        return trimSlash(new URL(v).pathname || "/");
      } catch {}
    }
    if (/^\/\//.test(v)) {
      try {
        return trimSlash(new URL(`https:${v}`).pathname || "/");
      } catch {}
    }
    return trimSlash(v.startsWith("/") ? v : `/${v}`);
  };

  const currentPath = trimSlash(pathname || "/");

  return (
    <nav
      aria-label={i18nText("AUTO.components.category.categoryparenttabs.line45_0_danh_muc_noi_bat")}
      className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 rounded-xl border border-black bg-white px-2 py-2"
    >
      <div className="flex min-w-max items-center md:w-full">
        {categories.map((cate, index) => {
          const catPath = toPathname(cate.url || "/");
          const isActive =
            currentPath === catPath || currentPath.startsWith(`${catPath}/`);

          return (
            <div
              key={cate.id}
              className={`flex items-center px-2 sm:px-3 md:flex-1 md:justify-center ${
                index < categories.length - 1 ? "border-r border-slate-300" : ""
              }`}
            >
              <Link
                href={cate.url}
                className={`group inline-flex h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold transition ${
                  isActive
                    ? "border border-brand bg-brand-soft text-brand-deep"
                    : "bg-white text-slate-900 hover:bg-brand-soft hover:text-brand-deep"
                }`}
                aria-current={isActive ? "page" : undefined}
                title={cate.title}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                    isActive
                      ? "border-brand bg-brand-soft"
                      : "border-transparent bg-slate-50 group-hover:bg-brand-soft"
                  }`}
                >
                  {cate.picture ? (
                    <Image
                      src={cate.picture}
                      alt={cate.title}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain pointer-events-none"
                      loading="lazy"
                    />
                  ) : (
                    <span className="h-4 w-4 rounded-sm bg-border" />
                  )}
                </span>

                <span className="whitespace-nowrap">{cate.title}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
