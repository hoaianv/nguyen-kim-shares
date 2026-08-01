"use client";

import { getCurrentLocale, i18nText } from "@/lib/i18nText";
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
  new Intl.NumberFormat(getCurrentLocale() === "en" ? "en-US" : "vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.floor(value)));

export default function CategoryFilterBar({
  listBrand,
  customerNeeds,
  options,
  rangePrice: inputRangePrice = { minPrice: 1, maxPrice: 200_000_000 },
  activeFilterCount,
  onResetAll,
}: CategoryFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const rangePrice = {
    minPrice: inputRangePrice.minPrice,
    maxPrice: 200_000_000,
  };
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [currentMinPrice, setCurrentMinPrice] = useState(
    Number(sp.get(ESlugType.MinPrice) ?? rangePrice.minPrice)
  );
  const [currentMaxPrice, setCurrentMaxPrice] = useState(
    Math.min(Number(sp.get(ESlugType.MaxPrice) ?? rangePrice.maxPrice), rangePrice.maxPrice)
  );
  const [minPriceInput, setMinPriceInput] = useState(() =>
    formatVND(Number(sp.get(ESlugType.MinPrice) ?? rangePrice.minPrice))
  );
  const [maxPriceInput, setMaxPriceInput] = useState(() =>
    formatVND(
      Math.min(Number(sp.get(ESlugType.MaxPrice) ?? rangePrice.maxPrice), rangePrice.maxPrice)
    )
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedMinPrice = sp.get(ESlugType.MinPrice);
  const selectedMaxPrice = sp.get(ESlugType.MaxPrice);
  const isPriceActive = Boolean(selectedMinPrice || selectedMaxPrice);

  useEffect(() => {
    if (openKey !== "price") {
      const minPrice = Number(selectedMinPrice ?? rangePrice.minPrice);
      const maxPrice = Math.min(
        Number(selectedMaxPrice ?? rangePrice.maxPrice),
        rangePrice.maxPrice
      );
      setCurrentMinPrice(minPrice);
      setCurrentMaxPrice(maxPrice);
      setMinPriceInput(formatVND(minPrice));
      setMaxPriceInput(formatVND(maxPrice));
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
        title: i18nText("AUTO.components.category.categoryfilterbar.line107_0_nhu_cau"),
        options: customerNeeds
          .filter((need) => Boolean(need.url))
          .map((need) => ({ label: need.title, value: need.url })),
      });
    }

    if (listBrand?.length) {
      groups.push({
        key: ESlugType.Brand,
        title: i18nText("AUTO.components.category.categoryfilterbar.line117_1_thuong_hieu"),
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

  const applyPriceRange = (
    minPrice = currentMinPrice,
    maxPrice = currentMaxPrice,
    close = true
  ) => {
    const next = new URLSearchParams(sp.toString());
    next.set(ESlugType.MinPrice, String(minPrice));
    next.set(ESlugType.MaxPrice, String(maxPrice));
    next.delete("page");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    if (close) setOpenKey(null);
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

  const parsePriceInput = (value: string) => Number(value.replace(/\D/g, ""));

  const commitPriceInput = (type: "min" | "max") => {
    const value = parsePriceInput(type === "min" ? minPriceInput : maxPriceInput);

    if (!value) {
      if (type === "min") setMinPriceInput(formatVND(currentMinPrice));
      else setMaxPriceInput(formatVND(currentMaxPrice));
      return;
    }

    if (type === "min") {
      const nextMinPrice = Math.min(
        clampPrice(value, rangePrice.minPrice),
        currentMaxPrice
      );
      setCurrentMinPrice(nextMinPrice);
      setMinPriceInput(formatVND(nextMinPrice));
      return;
    }

    const nextMaxPrice = Math.max(
      clampPrice(value, rangePrice.maxPrice),
      currentMinPrice
    );
    setCurrentMaxPrice(nextMaxPrice);
    setMaxPriceInput(formatVND(nextMaxPrice));
  };

  return (
    <div
      ref={containerRef}
      className="hidden space-y-3 lg:block"
    >
      <h2 className="text-xl font-bold text-slate-900">{i18nText("AUTO.components.category.categoryfilterbar.line215_2_chon_theo_tieu_chi")}</h2>
      <div className="flex flex-wrap items-center gap-2">
        <div className="mr-1 inline-flex h-10 items-center gap-2 text-sm font-semibold text-foreground">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />{i18nText("AUTO.components.category.categoryfilterbar.line219_3_bo_loc")}</div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenKey((prev) => (prev === "price" ? null : "price"))}
            className={`inline-flex h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium transition ${
              isPriceActive
                ? "border-brand bg-brand-soft text-brand-deep"
                : "border-border/60 bg-white text-foreground hover:border-brand hover:bg-brand-soft"
            }`}
            aria-expanded={openKey === "price"}
          >
            <CircleDollarSign className="h-4 w-4" />
            {isPriceActive
              ? `${formatVND(Number(selectedMinPrice ?? rangePrice.minPrice))} - ${formatVND(
                  Number(selectedMaxPrice ?? rangePrice.maxPrice)
                )}`
              : i18nText("AUTO.components.category.categoryfilterbar.line238_4_muc_gia")}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openKey === "price" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openKey === "price" ? (
            <div className="absolute left-0 top-full z-30 mt-2 w-[320px] rounded-md border border-border/60 bg-white p-3 shadow-lg">
              <div className="grid grid-cols-2 gap-2">
                <label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={minPriceInput}
                    onFocus={(event) => event.currentTarget.select()}
                    onChange={(event) => setMinPriceInput(event.target.value)}
                    onBlur={() => commitPriceInput("min")}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") event.currentTarget.blur();
                    }}
                    aria-label={i18nText("AUTO.components.category.categoryfilterbar.line260_5_gia_toi_thieu")}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-500 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </label>
                <label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={maxPriceInput}
                    onFocus={(event) => event.currentTarget.select()}
                    onChange={(event) => setMaxPriceInput(event.target.value)}
                    onBlur={() => commitPriceInput("max")}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") event.currentTarget.blur();
                    }}
                    aria-label={i18nText("AUTO.components.category.categoryfilterbar.line275_6_gia_toi_da")}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-500 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </label>
              </div>

              <div className="nk-range relative mt-5 h-5">
                <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200" />
                <div
                  className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand"
                  style={{
                    left: `${
                      ((Math.min(currentMinPrice, currentMaxPrice) - rangePrice.minPrice) /
                        (rangePrice.maxPrice - rangePrice.minPrice)) *
                      100
                    }%`,
                    width: `${
                      ((Math.max(currentMinPrice, currentMaxPrice) -
                        Math.min(currentMinPrice, currentMaxPrice)) /
                        (rangePrice.maxPrice - rangePrice.minPrice)) *
                      100
                    }%`,
                  }}
                />
                <input
                  type="range"
                  min={rangePrice.minPrice}
                  max={currentMaxPrice}
                  step={100000}
                  value={Math.min(currentMinPrice, currentMaxPrice)}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    setCurrentMinPrice(value);
                    setMinPriceInput(formatVND(value));
                  }}
                  aria-label={i18nText("AUTO.components.category.categoryfilterbar.line310_7_gia_toi_thieu")}
                  className="absolute inset-0 w-full appearance-none bg-transparent"
                />
                <input
                  type="range"
                  min={currentMinPrice}
                  max={rangePrice.maxPrice}
                  step={100000}
                  value={Math.max(currentMinPrice, currentMaxPrice)}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    setCurrentMaxPrice(value);
                    setMaxPriceInput(formatVND(value));
                  }}
                  aria-label={i18nText("AUTO.components.category.categoryfilterbar.line324_8_gia_toi_da")}
                  className="absolute inset-0 w-full appearance-none bg-transparent"
                />
              </div>

              {isPriceActive ? (
                <button
                  type="button"
                  onClick={clearPriceRange}
                  className="mt-3 text-xs font-medium text-brand-strong hover:text-brand-deep"
                >{i18nText("AUTO.components.category.categoryfilterbar.line335_9_bo_chon_khoang_gia")}</button>
              ) : null}

              <button
                type="button"
                onClick={() => applyPriceRange()}
                className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-md border border-brand bg-brand px-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >{i18nText("AUTO.components.category.categoryfilterbar.line344_10_ap_dung_gia")}</button>
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
                    : "border-border/60 bg-white text-foreground hover:border-amber-300 hover:bg-amber-50/70"
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
                <div className="absolute left-0 top-full z-30 mt-2 w-[320px] rounded-md border border-border/60 bg-white p-3 shadow-lg xl:w-[380px]">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{group.title}</p>
                    {selectedValue ? (
                      <button
                        type="button"
                        onClick={() => setQueryParam(group.key)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />{i18nText("AUTO.components.category.categoryfilterbar.line391_11_bo_chon")}</button>
                    ) : null}
                  </div>

                  <div className="grid max-h-[320px] grid-cols-2 gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 pr-1">
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
                              : "border-border/60 bg-white text-foreground hover:border-amber-300 hover:bg-amber-50/70"
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
            className="ml-auto inline-flex h-10 items-center rounded-md border border-border/60 bg-white px-3 text-sm font-medium text-muted-foreground transition hover:border-amber-300 hover:bg-amber-50/70 hover:text-foreground"
          >{i18nText("AUTO.components.category.categoryfilterbar.line431_12_xoa_tat_ca")}</button>
        ) : null}
      </div>
    </div>
  );
}
