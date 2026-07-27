"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  ChevronDown,
} from "lucide-react";
import { ESlugType } from "@/interfaces/models/ISlug.interface";
import { useTranslations } from "next-intl";

const SORT_OPTIONS = [
  {
    label: "Giá thấp - cao",
    value: "ASC" as const,
    icon: ArrowUpWideNarrow,
  },
  {
    label: "Giá cao - thấp",
    value: "DESC" as const,
    icon: ArrowDownWideNarrow,
  },
];

export default function SortByPrice() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentSort = sp.get(ESlugType.Sort) as "ASC" | "DESC" | null;
  const currentOption = SORT_OPTIONS.find((option) => option.value === currentSort);
  const CurrentIcon = currentOption?.icon ?? ArrowUpWideNarrow;

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const setSort = (value?: "ASC" | "DESC") => {
    const next = new URLSearchParams(sp.toString());
    if (!value) next.delete(ESlugType.Sort);
    else next.set(ESlugType.Sort, value);
    next.delete("page");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex h-10 w-full items-center justify-between gap-2 rounded-md border px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/30 ${
          currentOption
            ? "border-amber-300 bg-amber-50 text-amber-800"
            : "border-border/60 bg-background text-foreground hover:border-amber-300 hover:bg-amber-50/70"
        }`}
        aria-expanded={open}
      >
        <span className="inline-flex min-w-0 items-center gap-2">
          <CurrentIcon
            className={`h-4 w-4 shrink-0 ${
              currentOption ? "" : "text-muted-foreground"
            }`}
          />
          <span className="truncate">
            {currentOption?.label ?? t("COMMON.sort_by")}
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-30 mt-2 w-[220px] rounded-md border border-border/60 bg-background p-2 shadow-lg">
          {SORT_OPTIONS.map((option) => {
            const Icon = option.icon;
            const active = currentSort === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSort(active ? undefined : option.value)}
                className={`flex h-10 w-full items-center gap-2 rounded-md px-3 text-left text-sm font-medium transition ${
                  active
                    ? "bg-amber-50 text-amber-800"
                    : "text-foreground hover:bg-amber-50/70"
                }`}
                aria-pressed={active}
              >
                <Icon className="h-4 w-4" />
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
