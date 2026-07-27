"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, CircleDollarSign, SlidersHorizontal, X } from "lucide-react";
import { ESlugType } from "@/interfaces/models/ISlug.interface";
import type {
  IBrand,
  ICustomerNeeds,
  IOptionsDetail,
  IRangePrice,
  ISubCateOption,
} from "@/interfaces/models/ICategoryDetail.interface";

type CategoryFilterBarProps = {
  listBrand: IBrand[];
  customerNeeds?: ICustomerNeeds[] | null;
  options: IOptionsDetail[];
  rangePrice?: IRangePrice;
  activeFilterCount: number;
  onResetAll: () => void;
};

type FacetGroup = {
  key: string;
  title: string;
  options: Array<{ label: string; value: string }>;
};

const formatVND = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(Math.max(0, Math.floor(value))) + "đ";

export default function CategoryFilterBar({
  listBrand,
  customerNeeds,
  options,
  rangePrice = { minPrice: 1, maxPrice: 184_970_000 },
  activeFilterCount,
  onResetAll,
}: CategoryFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [currentMinPrice, setCurrentMinPrice] = useState(
    Number(sp.get(ESlugType.MinPrice) ?? rangePrice.minPrice)
  );
  const [currentMaxPrice, setCurrentMaxPrice] = useState(
    Number(sp.get(ESlugType.MaxPrice) ?? rangePrice.maxPrice)
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedMinPrice = sp.get(ESlugType.MinPrice);
  const selectedMaxPrice = sp.get(ESlugType.MaxPrice);
  const isPriceActive = Boolean(selectedMinPrice || selectedMaxPrice);

  useEffect(() => {
    if (openKey !== "price") {
      setCurrentMinPrice(Number(selectedMinPrice ?? rangePrice.minPrice));
      setCurrentMaxPrice(Number(selectedMaxPrice ?? rangePrice.maxPrice));
    }
  }, [openKey, rangePrice.maxPrice, rangePrice.minPrice, selectedMaxPrice, selectedMinPrice]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpenKey(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenKey(null);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const facetGroups = useMemo<FacetGroup[]>(() => {
    const groups: FacetGroup[] = [];

    if (customerNeeds?.length) {
      groups.push({
        key: ESlugType.Demand,
        title: "Nhu cầu",
        options: customerNeeds
          .filter((need) => Boolean(need.url))
          .map((need) => ({ label: need.title, value: need.url })),
      });
    }

    if (listBrand?.length) {
      groups.push({
        key: ESlugType.Brand,
        title: "Thương hiệu",
        options: listBrand
          .map((brand) => ({
            label: brand.title,
            value: brand.slug || (brand as any).url || "",
          }))
          .filter((brand) => Boolean(brand.value)),
      });
    }

    for (const group of options ?? []) {
      if (!group?.slug || !group.subCateOption?.length) continue;
      groups.push({
        key: group.slug,
        title: group.title,
        options: group.subCateOption.map((sub: ISubCateOption) => ({
          label: sub.title,
          value: sub.url,
        })),
      });
    }

    return groups;
  }, [customerNeeds, listBrand, options]);

  const setQueryParam = (key: string, value?: string) => {
    const next = new URLSearchParams(sp.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    next.delete("page");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    setOpenKey(null);
  };

  const applyPriceRange = () => {
    const next = new URLSearchParams(sp.toString());
    next.set(ESlugType.MinPrice, String(currentMinPrice));
    next.set(ESlugType.MaxPrice, String(currentMaxPrice));
    next.delete("page");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    setOpenKey(null);
  };

  const clearPriceRange = () => {
    const next = new URLSearchParams(sp.toString());
    next.delete(ESlugType.MinPrice);
    next.delete(ESlugType.MaxPrice);
    next.delete("page");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    setCurrentMinPrice(rangePrice.minPrice);
    setCurrentMaxPrice(rangePrice.maxPrice);
    setOpenKey(null);
  };

  const clampPrice = (value: number, fallback: number) =>
    Number.isFinite(value) ? Math.min(Math.max(value, rangePrice.minPrice), rangePrice.maxPrice) : fallback;

  return (
    <div
      ref={containerRef}
      className="hidden border-y border-border/60 bg-background py-3 lg:block"
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className="mr-1 inline-flex h-10 items-center gap-2 text-sm font-semibold text-foreground">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          Bộ lọc
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenKey((prev) => (prev === "price" ? null : "price"))}
            className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium transition ${
              isPriceActive
                ? "border-amber-300 bg-amber-50 text-amber-800"
                : "border-border/60 bg-background text-foreground hover:border-amber-300 hover:bg-amber-50/70"
            }`}
            aria-expanded={openKey === "price"}
          >
            <CircleDollarSign className="h-4 w-4" />
            {isPriceActive
              ? `${formatVND(Number(selectedMinPrice ?? rangePrice.minPrice))} - ${formatVND(
                  Number(selectedMaxPrice ?? rangePrice.maxPrice)
                )}`
              : "Mức giá"}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openKey === "price" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openKey === "price" ? (
            <div className="absolute left-0 top-full z-30 mt-2 w-[340px] rounded-md border border-border/60 bg-background p-4 shadow-lg">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">Khoảng giá</p>
                  <p className="text-xs text-muted-foreground">Giữ nguyên cách lọc theo URL hiện tại.</p>
                </div>
                {isPriceActive ? (
                  <button
                    type="button"
                    onClick={clearPriceRange}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    Bỏ chọn
                  </button>
                ) : null}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <label className="space-y-1">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Tối thiểu
                  </span>
                  <input
                    type="number"
                    min={rangePrice.minPrice}
                    max={currentMaxPrice}
                    value={currentMinPrice}
                    onChange={(event) =>
                      setCurrentMinPrice(
                        clampPrice(Number(event.target.value), rangePrice.minPrice)
                      )
                    }
                    className="h-10 w-full rounded-md border border-border/60 bg-background px-3 text-sm outline-none transition focus:border-amber-300"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Tối đa
                  </span>
                  <input
                    type="number"
                    min={currentMinPrice}
                    max={rangePrice.maxPrice}
                    value={currentMaxPrice}
                    onChange={(event) =>
                      setCurrentMaxPrice(
                        clampPrice(Number(event.target.value), rangePrice.maxPrice)
                      )
                    }
                    className="h-10 w-full rounded-md border border-border/60 bg-background px-3 text-sm outline-none transition focus:border-amber-300"
                  />
                </label>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpenKey(null)}
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-border/60 bg-background text-sm font-medium text-foreground transition hover:border-amber-300 hover:bg-amber-50/70"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={applyPriceRange}
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-slate-950 bg-slate-950 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Xem kết quả
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {facetGroups.map((group) => {
          const selectedValue = sp.get(group.key) ?? "";
          const selectedLabel = group.options.find(
            (item) => item.value.toLowerCase() === selectedValue.toLowerCase()
          )?.label;
          const isOpen = openKey === group.key;

          return (
            <div key={group.key} className="relative">
              <button
                type="button"
                onClick={() => setOpenKey((prev) => (prev === group.key ? null : group.key))}
                className={`inline-flex h-10 max-w-[220px] items-center gap-2 rounded-md border px-3 text-sm font-medium transition ${
                  selectedValue
                    ? "border-amber-300 bg-amber-50 text-amber-800"
                    : "border-border/60 bg-background text-foreground hover:border-amber-300 hover:bg-amber-50/70"
                }`}
                aria-expanded={isOpen}
                title={selectedLabel ? `${group.title}: ${selectedLabel}` : group.title}
              >
                <span className="truncate">
                  {selectedLabel ? `${group.title}: ${selectedLabel}` : group.title}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen ? (
                <div className="absolute left-0 top-full z-30 mt-2 w-[320px] rounded-md border border-border/60 bg-background p-3 shadow-lg xl:w-[380px]">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{group.title}</p>
                    {selectedValue ? (
                      <button
                        type="button"
                        onClick={() => setQueryParam(group.key)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                        Bỏ chọn
                      </button>
                    ) : null}
                  </div>

                  <div className="grid max-h-[320px] grid-cols-2 gap-2 overflow-y-auto pr-1">
                    {group.options.map((item) => {
                      const isSelected = selectedValue === item.value;
                      return (
                        <button
                          key={`${group.key}-${item.value}`}
                          type="button"
                          onClick={() =>
                            setQueryParam(group.key, isSelected ? undefined : item.value)
                          }
                          className={`min-h-10 rounded-md border px-3 py-2 text-left text-sm transition ${
                            isSelected
                              ? "border-amber-300 bg-amber-50 text-amber-800"
                              : "border-border/60 bg-muted/10 text-foreground hover:border-amber-300 hover:bg-amber-50/70"
                          }`}
                          aria-pressed={isSelected}
                          title={item.label}
                        >
                          <span className="line-clamp-2 leading-5">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}

        {activeFilterCount > 0 ? (
          <button
            type="button"
            onClick={onResetAll}
            className="ml-auto inline-flex h-10 items-center rounded-md border border-border/60 bg-background px-3 text-sm font-medium text-muted-foreground transition hover:border-amber-300 hover:bg-amber-50/70 hover:text-foreground"
          >
            Xóa tất cả
          </button>
        ) : null}
      </div>
    </div>
  );
}
