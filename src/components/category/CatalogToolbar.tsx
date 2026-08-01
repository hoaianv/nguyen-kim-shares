"use client";

import { i18nText } from "@/lib/i18nText";
import { Filter } from "lucide-react";
import FilterActiveChips from "./FilterActiveChips";
import SortByPrice from "./SortByPrice";
import type {
  IBrand,
  ICustomerNeeds,
  IOptionsDetail,
} from "@/interfaces/models/ICategoryDetail.interface";

type CatalogToolbarProps = {
  activeFilterCount: number;
  searchParams: Record<string, string | string[] | undefined>;
  options: IOptionsDetail[];
  listBrand: IBrand[];
  customerNeeds?: ICustomerNeeds[] | null;
  onOpenFilters: () => void;
};

export default function CatalogToolbar({
  activeFilterCount,
  searchParams,
  options,
  listBrand,
  customerNeeds,
  onOpenFilters,
}: CatalogToolbarProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="mr-2 text-xl font-bold text-slate-900">{i18nText("AUTO.components.category.catalogtoolbar.line32_0_sap_xep_theo")}</h2>
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-sm border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 lg:hidden"
        >
          <Filter className="h-4 w-4" />{i18nText("AUTO.components.category.catalogtoolbar.line39_1_bo_loc")}{activeFilterCount > 0 ? (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-semibold text-slate-950">
              {activeFilterCount}
            </span>
          ) : null}
        </button>
        <div>
          <SortByPrice />
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
