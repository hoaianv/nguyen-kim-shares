"use client";

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
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
      <div className="flex min-w-max items-center gap-2 pb-1">
        {categories.map((cate) => {
          const catPath = toPathname(cate.url || "/");
          const isActive =
            currentPath === catPath || currentPath.startsWith(`${catPath}/`);

          return (
            <Link
              key={cate.id}
              href={cate.url}
              className={`inline-flex h-11 items-center gap-2 rounded-md border px-3 text-sm font-medium transition ${
                isActive
                  ? "border-amber-300 bg-amber-50 text-amber-800"
                  : "border-border/60 bg-background text-foreground hover:border-amber-300 hover:bg-amber-50/70"
              }`}
              aria-current={isActive ? "page" : undefined}
              title={cate.title}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border ${
                  isActive
                    ? "border-amber-300 bg-amber-50"
                    : "border-border/60 bg-muted/20"
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
          );
        })}
      </div>
    </div>
  );
}
