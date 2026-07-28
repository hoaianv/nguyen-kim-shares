"use client";

import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ESlugType } from "@/interfaces/models/ISlug.interface";

const SORT_OPTIONS = [
  { label: "Giá tăng dần", value: "ASC" as const, icon: ArrowUpWideNarrow },
  { label: "Giá giảm dần", value: "DESC" as const, icon: ArrowDownWideNarrow },
];

export default function SortByPrice() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get(ESlugType.Sort) as "ASC" | "DESC" | null;

  const setSort = (value: "ASC" | "DESC") => {
    const next = new URLSearchParams(searchParams.toString());
    if (currentSort === value) next.delete(ESlugType.Sort);
    else next.set(ESlugType.Sort, value);
    next.delete("page");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {SORT_OPTIONS.map((option) => {
        const Icon = option.icon;
        const active = currentSort === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setSort(option.value)}
            aria-pressed={active}
            className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
              active
                ? "border-brand bg-brand-soft text-brand-deep"
                : "border-slate-200 bg-white text-slate-700 hover:border-brand hover:bg-brand-soft"
            }`}
          >
            <Icon className="h-4 w-4" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
