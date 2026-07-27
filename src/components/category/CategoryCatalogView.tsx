"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NoProductsFound from "./NoProductsFound";
import PaginationDynamic from "@/components/ui/PaginationDynamic";
import CardProduct from "@/components/ui/cardProduct";
import { ESlugType } from "@/interfaces/models/ISlug.interface";
import type {
  IBrand,
  ICustomerNeeds,
  IOptionsDetail,
  IRangePrice,
} from "@/interfaces/models/ICategoryDetail.interface";
import type { IProduct } from "@/interfaces/models/IProduct.interface";
import type { IPagination } from "@/interfaces/common";
import CatalogToolbar from "./CatalogToolbar";
import MobileFilterSheet from "./MobileFilterSheet";
import CategoryFilterBar from "./CategoryFilterBar";

type CategoryCatalogViewProps = {
  categoryTitle: string;
  categorySlug: string;
  listBrand: IBrand[];
  customerNeeds?: ICustomerNeeds[] | null;
  options: IOptionsDetail[];
  rangePrice?: IRangePrice;
  searchParams: Record<string, string | string[] | undefined>;
  productList: IProduct[];
  pagination?: IPagination;
};

const FILTER_KEYS = [
  ESlugType.Brand,
  ESlugType.Demand,
  ESlugType.MinPrice,
  ESlugType.MaxPrice,
  ESlugType.Sort,
  "page",
  "perPage",
];

export default function CategoryCatalogView({
  categoryTitle,
  categorySlug,
  listBrand,
  customerNeeds,
  options,
  rangePrice,
  searchParams,
  productList,
  pagination,
}: CategoryCatalogViewProps) {
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeFilterCount = useMemo(
    () =>
      Object.entries(searchParams).filter(([key, value]) => {
        if (FILTER_KEYS.includes(key)) return Boolean(value);
        return Boolean(value) && key !== "catUrl";
      }).length,
    [searchParams]
  );

  const handleResetAll = () => {
    const next = new URLSearchParams(sp.toString());
    for (const key of FILTER_KEYS) next.delete(key);
    for (const group of options) {
      if (group?.slug) next.delete(group.slug);
    }
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    setDrawerOpen(false);
  };

  return (
    <>
      <section className="min-w-0 space-y-4">
        <CatalogToolbar
          categoryTitle={categoryTitle}
          totalProducts={pagination?.total ?? productList.length}
          activeFilterCount={activeFilterCount}
          searchParams={searchParams}
          options={options}
          listBrand={listBrand}
          customerNeeds={customerNeeds}
          onOpenFilters={() => setDrawerOpen(true)}
          onResetAll={handleResetAll}
        />

        <CategoryFilterBar
          listBrand={listBrand}
          customerNeeds={customerNeeds}
          options={options}
          rangePrice={rangePrice}
          activeFilterCount={activeFilterCount}
          onResetAll={handleResetAll}
        />

        <div className="space-y-4">
          {productList?.length === 0 ? (
            <NoProductsFound resetHref={`/${categorySlug}`} />
          ) : (
            <motion.div
              className="grid grid-cols-2 gap-3 max-[370px]:grid-cols-1 md:grid-cols-2 min-[900px]:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              {productList?.map((productItem) => (
                <CardProduct key={productItem.id} item={productItem} />
              ))}
            </motion.div>
          )}

          <div className="flex justify-center pt-2 sm:pt-4">
            {pagination ? <PaginationDynamic data={pagination} /> : null}
          </div>
        </div>
      </section>

      <MobileFilterSheet
        open={drawerOpen}
        title={categoryTitle}
        activeFilterCount={activeFilterCount}
        listBrand={listBrand}
        customerNeeds={customerNeeds}
        options={options}
        rangePrice={rangePrice}
        onClose={() => setDrawerOpen(false)}
        onResetAll={handleResetAll}
      />
    </>
  );
}
