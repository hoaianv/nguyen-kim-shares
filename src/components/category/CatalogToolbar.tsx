"use client";

import { Filter } from "lucide-react";
import FilterActiveChips from "./FilterActiveChips";
import SortByPrice from "./SortByPrice";
import type {
  IBrand,
  ICustomerNeeds,
  IOptionsDetail,
} from "@/interfaces/models/ICategoryDetail.interface";

type CatalogToolbarProps = {
  categoryTitle: string;
  totalProducts: number;
  activeFilterCount: number;
  searchParams: Record<string, string | string[] | undefined>;
  options: IOptionsDetail[];
  listBrand: IBrand[];
  customerNeeds?: ICustomerNeeds[] | null;
  onOpenFilters: () => void;
  onResetAll: () => void;
};

export default function CatalogToolbar({
  categoryTitle,
  totalProducts,
  activeFilterCount,
  searchParams,
  options,
  listBrand,
  customerNeeds,
  onOpenFilters,
  onResetAll,
}: CatalogToolbarProps) {
  return (
    <div className="space-y-3">
      <div className="sticky top-20 z-20 rounded-md border border-border/60 bg-background/95 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/85 lg:static lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Đang xem
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h2 className="truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {categoryTitle}
              </h2>
              <span className="inline-flex h-7 items-center rounded-md border border-border/60 bg-background px-2.5 text-xs font-medium text-foreground">
                {totalProducts} sản phẩm
              </span>
              {activeFilterCount > 0 ? (
                <span className="inline-flex h-7 items-center rounded-md border border-amber-300 bg-amber-50 px-2.5 text-xs font-medium text-amber-800">
                  {activeFilterCount} bộ lọc
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenFilters}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-border/60 bg-background px-3 text-sm font-medium text-foreground transition hover:border-amber-300 hover:bg-amber-50/70 sm:flex-none lg:hidden"
            >
              <Filter className="h-4 w-4" />
              Lọc
              {activeFilterCount > 0 ? (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-sm bg-amber-500 px-1 text-[11px] font-semibold text-white">
                  {activeFilterCount}
                </span>
              ) : null}
            </button>

            <div className="min-w-[190px] flex-1 sm:flex-none">
              <SortByPrice />
            </div>

            {activeFilterCount > 0 ? (
              <button
                type="button"
                onClick={onResetAll}
                className="hidden h-10 items-center rounded-md border border-border/60 bg-background px-3 text-sm font-medium text-muted-foreground transition hover:border-amber-300 hover:bg-amber-50/70 hover:text-foreground lg:inline-flex"
              >
                Reset
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <FilterActiveChips
        searchParams={searchParams}
        options={options}
        listBrand={listBrand}
        customerNeeds={customerNeeds}
      />
    </div>
  );
}
