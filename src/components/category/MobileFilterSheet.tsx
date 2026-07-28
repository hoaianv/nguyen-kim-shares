"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import FilterBrand from "./FilterBrand";
import FilterCustomerNeeds from "./FilterCustomerNeeds";
import FilterOptions from "./FilterOptions";
import PriceRangeChip from "./PriceRangeChip";
import type {
  IBrand,
  ICustomerNeeds,
  IOptionsDetail,
  IRangePrice,
} from "@/interfaces/models/ICategoryDetail.interface";

type MobileFilterSheetProps = {
  open: boolean;
  title: string;
  activeFilterCount: number;
  listBrand: IBrand[];
  customerNeeds?: ICustomerNeeds[] | null;
  options: IOptionsDetail[];
  rangePrice?: IRangePrice;
  onClose: () => void;
  onResetAll: () => void;
};

export default function MobileFilterSheet({
  open,
  title,
  activeFilterCount,
  listBrand,
  customerNeeds,
  options,
  rangePrice,
  onClose,
  onResetAll,
}: MobileFilterSheetProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Đóng bộ lọc"
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-hidden rounded-t-lg border-t border-border/60 bg-white shadow-[0_-24px_80px_-30px_rgba(15,23,42,0.55)]"
            initial={reduceMotion ? { y: 0 } : { y: 24 }}
            animate={{ y: 0 }}
            exit={reduceMotion ? { y: 0 } : { y: 24 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Bộ lọc danh mục"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-4">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  bộ lọc
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">{title}</h3>
                  {activeFilterCount > 0 ? (
                    <span className="inline-flex h-6 items-center rounded-sm border border-amber-300 bg-amber-50 px-2 text-[11px] font-semibold text-amber-800">
                      {activeFilterCount}
                    </span>
                  ) : null}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-white text-foreground transition hover:border-amber-300 hover:bg-amber-50/70"
                aria-label="Đóng"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[calc(88vh-140px)] overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400">
              <div className="space-y-4">
                {!!listBrand?.length && <FilterBrand listBrand={listBrand} />}
                {!!customerNeeds?.length && (
                  <FilterCustomerNeeds needs={customerNeeds ?? []} />
                )}
                <PriceRangeChip rangePrice={rangePrice} className="w-full" />
                {!!options?.length && <FilterOptions options={options} />}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-border/60 bg-white p-4">
              <button
                type="button"
                onClick={onResetAll}
                disabled={activeFilterCount === 0}
                className="inline-flex h-11 items-center justify-center rounded-md border border-border/60 bg-white text-sm font-medium text-foreground transition hover:border-amber-300 hover:bg-amber-50/70 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Xóa bộ lọc
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 items-center justify-center rounded-md border border-amber-300 bg-amber-50 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
              >
                Xem kết quả
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
