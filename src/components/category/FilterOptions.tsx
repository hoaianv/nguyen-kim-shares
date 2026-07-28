"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Filter } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type {
  IOptionsDetail,
  ISubCateOption,
} from "@/interfaces/models/ICategoryDetail.interface";

interface FilterOptionsProps {
  options: IOptionsDetail[];
  rangePrice?: { minPrice: number; maxPrice: number };
}

export default function FilterOptions({ options }: FilterOptionsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsHook = useSearchParams();
  const [openOptionId, setOpenOptionId] = useState<number | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenOptionId(null);
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const getSelectedValue = (slugKey: string) => searchParamsHook.get(slugKey) ?? "";

  const setQueryParam = (key: string, value?: string) => {
    const nextParams = new URLSearchParams(searchParamsHook.toString());
    if (!value) nextParams.delete(key);
    else nextParams.set(key, value);
    const queryString = nextParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const clearAllFilters = () => {
    const nextParams = new URLSearchParams(searchParamsHook.toString());
    for (const group of options) {
      if (group?.slug) nextParams.delete(group.slug);
    }
    nextParams.delete("page");
    const qs = nextParams.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    setOpenOptionId(null);
  };

  if (!options?.length) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Thuộc tính
        </h2>
        <button
          type="button"
          onClick={clearAllFilters}
          className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
        >
          Reset
        </button>
      </div>

      <div className="space-y-3">
        {options.map((group) => {
          const selectedValue = getSelectedValue(group.slug);
          const selectedLabel = group.subCateOption.find(
            (sub) => sub.url === selectedValue
          )?.title;
          const isOpen = openOptionId === group.id;

          return (
            <div
              key={group.id}
              className="space-y-2 rounded-md border border-border/60 bg-white p-3"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenOptionId((prev) => (prev === group.id ? null : group.id))
                }
                className={`flex h-11 w-full items-center justify-between rounded-md border px-3 text-left transition ${
                  selectedValue
                    ? "border-amber-300 bg-amber-50 text-amber-800"
                    : "border-border/60 bg-white text-foreground hover:border-amber-300 hover:bg-amber-50/70"
                }`}
              >
                <span className="inline-flex min-w-0 items-center gap-2">
                  <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate text-sm font-medium">{group.title}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  {selectedLabel ? (
                    <span className="hidden max-w-[150px] truncate text-xs text-muted-foreground sm:inline">
                      {selectedLabel}
                    </span>
                  ) : null}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setQueryParam(group.slug);
                          setOpenOptionId(null);
                        }}
                        className="inline-flex h-10 items-center rounded-md border border-border/60 bg-white px-3 text-sm font-medium text-foreground transition hover:border-amber-300 hover:bg-amber-50/70"
                      >
                        Bỏ chọn
                      </button>

                      <div className="grid max-h-[320px] grid-cols-2 gap-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400 md:grid-cols-3 xl:grid-cols-2">
                        {group.subCateOption.map((sub: ISubCateOption) => {
                          const isSelected = selectedValue === sub.url;
                          return (
                            <button
                              key={sub.url}
                              type="button"
                              onClick={() => {
                                setQueryParam(group.slug, sub.url);
                                setOpenOptionId(null);
                              }}
                              title={sub.title}
                              className={`min-h-11 rounded-md border px-3 text-left text-sm transition ${
                                isSelected
                                  ? "border-amber-300 bg-amber-50 text-amber-800"
                                  : "border-border/60 bg-white text-foreground hover:border-amber-300 hover:bg-amber-50/70"
                              }`}
                            >
                              <span className="line-clamp-2 leading-5">{sub.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
