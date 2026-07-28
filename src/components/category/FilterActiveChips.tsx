"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import type {
  IBrand,
  ICustomerNeeds,
  IOptionsDetail,
  ISubCateOption,
} from "@/interfaces/models/ICategoryDetail.interface";
import { ESlugType } from "@/interfaces/models/ISlug.interface";

interface FilterActiveChipsProps {
  searchParams: Record<string, string | string[] | undefined>;
  options: IOptionsDetail[];
  listBrand: IBrand[];
  customerNeeds?: ICustomerNeeds[] | null;
}

export default function FilterActiveChips({
  searchParams,
  options,
  listBrand,
  customerNeeds,
}: FilterActiveChipsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsHook = useSearchParams();

  const getSingleValue = (param?: string | string[]) =>
    Array.isArray(param) ? param[0] : param ?? "";

  const activeFilters = Object.entries(searchParams)
    .map(([paramKey, paramValue]) => ({
      key: paramKey,
      value: getSingleValue(paramValue),
    }))
    .filter(
      (entry) =>
        entry.key &&
        entry.value &&
        entry.key !== "catUrl" &&
        entry.key !== "page" &&
        entry.key !== "perPage"
    );

  if (!activeFilters.length) return null;

  const getFilterLabel = (filterKey: string, filterValue: string) => {
    if (filterKey === ESlugType.Brand) {
      const brand = listBrand.find(
        (brandItem) =>
          String(brandItem.slug ?? brandItem.title).toLowerCase() ===
          filterValue.toLowerCase()
      );
      return brand && `Thương hiệu: ${brand.title}`;
    }

    if (filterKey === ESlugType.Demand) {
      const need = (customerNeeds || []).find(
        (needItem) => String(needItem.url).toLowerCase() === filterValue.toLowerCase()
      );
      return need && `Nhu cầu: ${need.title}`;
    }

    if (filterKey === ESlugType.Sort) {
      return filterValue?.toUpperCase() === "ASC"
        ? "Giá tăng dần"
        : filterValue?.toUpperCase() === "DESC"
        ? "Giá giảm dần"
        : `Sắp xếp: ${filterValue}`;
    }

    const option = options.find((optionItem) => optionItem.slug === filterKey);
    if (option) {
      const subOption = (option.subCateOption || []).find(
        (subItem: ISubCateOption) =>
          String(subItem.url).toLowerCase() === filterValue.toLowerCase()
      );
      if (subOption) return `${option.title}: ${subOption.title}`;
      return `${option.title}: ${filterValue}`;
    }

    const prettyKey = filterKey.replace(/[-_]/g, " ");
    return `${prettyKey}: ${filterValue}`;
  };

  const handleRemoveFilter = (filterKey: string) => {
    const nextParams = new URLSearchParams(searchParamsHook.toString());
    nextParams.delete(filterKey);
    nextParams.delete("page");
    const queryString = nextParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const minPriceStr = searchParamsHook.get(ESlugType.MinPrice);
  const maxPriceStr = searchParamsHook.get(ESlugType.MaxPrice);
  const minPrice = minPriceStr ? Number(minPriceStr) : undefined;
  const maxPrice = maxPriceStr ? Number(maxPriceStr) : undefined;
  const hasBothPrice = Number.isFinite(minPrice) && Number.isFinite(maxPrice);
  const renderFilters = hasBothPrice
    ? activeFilters.filter(
        (f) => f.key !== ESlugType.MinPrice && f.key !== ESlugType.MaxPrice
      )
    : activeFilters;

  const formatVND = (value: number) =>
    new Intl.NumberFormat("en-US").format(Math.max(0, Math.floor(value))) + "đ";

  const handleClearBothPrice = () => {
    const nextParams = new URLSearchParams(searchParamsHook.toString());
    nextParams.delete(ESlugType.MinPrice);
    nextParams.delete(ESlugType.MaxPrice);
    nextParams.delete("page");
    const queryString = nextParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const handleClearAll = () => {
    const nextParams = new URLSearchParams(searchParamsHook.toString());
    for (const paramKey of Array.from(nextParams.keys())) {
      if (paramKey !== "catUrl") nextParams.delete(paramKey);
    }
    const queryString = nextParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-slate-600">
        Đang lọc theo {activeFilters.length} tiêu chí
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent lg:flex-wrap lg:overflow-visible lg:pb-0">
        {hasBothPrice ? (
          <div
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-brand bg-brand-soft px-3 py-1.5 text-sm text-brand-deep"
            role="status"
          >
            <span className="max-w-[14rem] truncate text-sm leading-5">
              {`Giá từ ${formatVND(minPrice as number)} - ${formatVND(
                maxPrice as number
              )}`}
            </span>
            <button
              type="button"
              aria-label="Xóa bộ lọc giá"
              onClick={(e) => {
                e.stopPropagation();
                handleClearBothPrice();
              }}
              className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-brand-strong transition hover:bg-brand hover:text-slate-950"
            >
              <X size={12} />
            </button>
          </div>
        ) : null}

        {renderFilters.map(({ key, value }) => {
          const label = getFilterLabel(key, value);
          return (
            <div
              key={`${key}-${value}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-foreground"
              role="status"
            >
              <span className="max-w-[14rem] truncate text-sm leading-5">
                {label}
              </span>
              <button
                type="button"
                aria-label={`Xóa bộ lọc ${label}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFilter(key);
                }}
                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition hover:bg-brand-soft hover:text-brand-deep"
              >
                <X size={12} />
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={handleClearAll}
          className="ml-1 inline-flex h-9 shrink-0 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-brand hover:bg-brand-soft hover:text-brand-deep"
        >
          Bỏ chọn tất cả
        </button>
      </div>
    </div>
  );
}
