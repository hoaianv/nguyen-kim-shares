"use client";

import { getCurrentLocale, i18nText } from "@/lib/i18nText";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CircleDollarSign, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ESlugType } from "@/interfaces/models/ISlug.interface";

type PriceRange = { minPrice: number; maxPrice: number };

interface PriceRangeChipProps {
  rangePrice?: PriceRange;
  className?: string;
  autoApplyOnRelease?: boolean;
}

export default function PriceRangeChip({
  rangePrice = { minPrice: 1, maxPrice: 184_970_000 },
  className,
  autoApplyOnRelease = false,
}: PriceRangeChipProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParamsHook = useSearchParams();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const urlMinValue = Number(
    searchParamsHook.get(ESlugType.MinPrice) ?? rangePrice.minPrice
  );
  const urlMaxValue = Number(
    searchParamsHook.get(ESlugType.MaxPrice) ?? rangePrice.maxPrice
  );

  const [currentMinPrice, setCurrentMinPrice] = useState<number>(urlMinValue);
  const [currentMaxPrice, setCurrentMaxPrice] = useState<number>(urlMaxValue);

  useEffect(() => {
    if (!isOpenDropdown) {
      setCurrentMinPrice(urlMinValue);
      setCurrentMaxPrice(urlMaxValue);
    }
  }, [urlMinValue, urlMaxValue, isOpenDropdown]);

  useEffect(() => {
    if (currentMinPrice > currentMaxPrice) {
      setCurrentMinPrice(currentMaxPrice);
    }
  }, [currentMinPrice, currentMaxPrice]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdown(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpenDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const isPriceActive = useMemo(() => {
    const urlMin = searchParamsHook.get(ESlugType.MinPrice);
    const urlMax = searchParamsHook.get(ESlugType.MaxPrice);
    return Boolean(urlMin || urlMax);
  }, [searchParamsHook]);

  const applyPriceRange = () => {
    const nextParams = new URLSearchParams(searchParamsHook.toString());
    nextParams.set(ESlugType.MinPrice, String(currentMinPrice));
    nextParams.set(ESlugType.MaxPrice, String(currentMaxPrice));
    const queryString = nextParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
    setIsOpenDropdown(false);
  };

  const clearPriceRange = () => {
    const nextParams = new URLSearchParams(searchParamsHook.toString());
    nextParams.delete(ESlugType.MinPrice);
    nextParams.delete(ESlugType.MaxPrice);
    const queryString = nextParams.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
    setCurrentMinPrice(rangePrice.minPrice);
    setCurrentMaxPrice(rangePrice.maxPrice);
  };

  const formatVND = (value: number) =>
    new Intl.NumberFormat(getCurrentLocale() === "en" ? "en-US" : "vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(Math.max(0, Math.floor(value)));

  return (
    <section ref={containerRef} className={`space-y-3 ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">{i18nText("AUTO.components.category.pricerangechip.line107_0_muc_gia")}</h2>
        {isPriceActive ? (
          <button
            type="button"
            onClick={clearPriceRange}
            className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >{i18nText("AUTO.components.category.pricerangechip.line115_1_bo_chon")}</button>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => setIsOpenDropdown((prev) => !prev)}
        className={`flex h-12 w-full items-center justify-between rounded-md border px-3 text-sm font-medium transition ${
          isPriceActive
            ? "border-amber-300 bg-amber-50 text-amber-800"
            : "border-border/60 bg-white text-foreground hover:border-amber-300 hover:bg-amber-50/70"
        }`}
        title={i18nText("AUTO.components.category.pricerangechip.line128_2_xem_theo_gia")}
      >
        <span className="inline-flex items-center gap-2">
          <CircleDollarSign size={16} />
          {isPriceActive
            ? `${formatVND(currentMinPrice)} - ${formatVND(currentMaxPrice)}`
            : i18nText("AUTO.components.category.pricerangechip.line134_3_chon_khoang_gia")}
        </span>
        <ChevronDown size={14} />
      </button>

      <AnimatePresence initial={false}>
        {isOpenDropdown ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden rounded-md border border-border/60 bg-white p-3"
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <label className="space-y-1">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{i18nText("AUTO.components.category.pricerangechip.line152_4_toi_thieu")}</span>
                  <input
                    type="number"
                    min={rangePrice.minPrice}
                    max={currentMaxPrice}
                    value={currentMinPrice}
                    onChange={(event) =>
                      setCurrentMinPrice(Number(event.target.value || 0))
                    }
                    className="h-11 w-full rounded-md border border-border/60 bg-white px-3 text-sm outline-none transition focus:border-amber-300"
                    placeholder={formatVND(rangePrice.minPrice)}
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{i18nText("AUTO.components.category.pricerangechip.line168_5_toi_da")}</span>
                  <input
                    type="number"
                    min={currentMinPrice}
                    max={rangePrice.maxPrice}
                    value={currentMaxPrice}
                    onChange={(event) =>
                      setCurrentMaxPrice(Number(event.target.value || 0))
                    }
                    className="h-11 w-full rounded-md border border-border/60 bg-white px-3 text-sm outline-none transition focus:border-amber-300"
                    placeholder={formatVND(rangePrice.maxPrice)}
                  />
                </label>
              </div>

              <div className="relative h-7">
                <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-border/60" />
                <div
                  className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-amber-500"
                  style={{
                    left: `${
                      ((Math.min(currentMinPrice, currentMaxPrice) -
                        rangePrice.minPrice) /
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
                  onChange={(event) =>
                    setCurrentMinPrice(Number(event.target.value))
                  }
                  aria-label={i18nText("AUTO.components.category.pricerangechip.line212_6_gia_toi_thieu")}
                  onMouseUp={() => autoApplyOnRelease && applyPriceRange()}
                  onTouchEnd={() => autoApplyOnRelease && applyPriceRange()}
                  className="absolute inset-0 w-full appearance-none bg-transparent"
                />
                <input
                  type="range"
                  min={currentMinPrice}
                  max={rangePrice.maxPrice}
                  step={100000}
                  value={Math.max(currentMinPrice, currentMaxPrice)}
                  onChange={(event) =>
                    setCurrentMaxPrice(Number(event.target.value))
                  }
                  aria-label={i18nText("AUTO.components.category.pricerangechip.line226_7_gia_toi_da")}
                  onMouseUp={() => autoApplyOnRelease && applyPriceRange()}
                  onTouchEnd={() => autoApplyOnRelease && applyPriceRange()}
                  className="absolute inset-0 w-full appearance-none bg-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpenDropdown(false)}
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-border/60 bg-white text-sm font-medium text-foreground transition hover:border-amber-300 hover:bg-amber-50/70"
                >{i18nText("AUTO.components.category.pricerangechip.line239_8_dong")}</button>
                <button
                  type="button"
                  onClick={applyPriceRange}
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-slate-950 bg-slate-950 text-sm font-medium text-white transition hover:bg-slate-800"
                >{i18nText("AUTO.components.category.pricerangechip.line246_9_xem_ket_qua")}</button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
