"use client";
import { ArrowUpRight, Info, Star, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { ICompareProduct } from "@/interfaces/models/IProduct.interface";
import { formatPrice } from "@/lib/utils";
import ButtonFavorite from "@/components/product/ButtonFavorite";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ImageWithFallback from "../ImageWithFallback";

export default function CompareProducts({ data }: { data: ICompareProduct[] }) {
  const t = useTranslations();

  const ROW_LIMIT = 5;
  const [expanded, setExpanded] = useState(false);

  const gridTemplateColumns = useMemo(() => {
    const cols = [
      "minmax(200px, 1fr)", // cột tên thông số (đủ rộng để sticky)
      ...data.map(() => "minmax(220px, 1fr)"), // mỗi sản phẩm là 1 cột
    ];
    return cols.join(" ");
  }, [data]);

  const specNames = useMemo(() => {
    const set = new Set<string>();
    data.forEach((p) => p.specs?.forEach((s) => set.add(s.name)));
    return Array.from(set);
  }, [data]);

  const visibleSpecNames = useMemo(
    () => (expanded ? specNames : specNames.slice(0, ROW_LIMIT)),
    [specNames, expanded]
  );
  const hiddenCount = Math.max(0, specNames.length - ROW_LIMIT);

  const specMapByProduct = useMemo(() => {
    return data.map((p) => {
      const m = new Map<string, string>();
      p.specs?.forEach((s) => m.set(s.name, s.description ?? ""));
      return m;
    });
  }, [data]);

  return (
    <div className="">
      <div className="flex items-start justify-between flex-wrap gap-2 sm:gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-[#111827]">
            {t("PRODUCT.compare_products")}
          </h1>
        </div>
      </div>

      <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {data.map((p, idx) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
            className="relative rounded-lg bg-white shadow-sm overflow-hidden"
          >
            <div className="flex items-stretch gap-2 sm:gap-3 p-2 sm:p-3">
              <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={p.picture}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-lg bg-blue-50 text-blue-700">
                    {p.brand}
                  </span>
                  <ButtonFavorite
                    id={p.id}
                    favorite={p.isFavorite}
                    name={p.name}
                  />
                </div>
                <h3 className="mt-1 text-[13px] sm:text-sm font-medium line-clamp-2 text-gray-900">
                  {p.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {formatPrice(p.price)}
                  </span>
                  {p.marketPrice && p.marketPrice > p.price ? (
                    <span className="text-[11px] sm:text-xs line-through text-gray-500">
                      {formatPrice(p.marketPrice)}
                    </span>
                  ) : null}
                </div>
                <div className="mt-1 flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                        i < (p.rating || 0) ? "fill-current" : ""
                      }`}
                    />
                  ))}
                  <span className="text-[11px] sm:text-xs text-gray-600 ml-1">
                    {p.isInStock
                      ? t("COMMON.in_stock")
                      : t("COMMON.out_of_stock")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 sm:px-3 pb-2 sm:pb-3 gap-2">
              <Link
                href={`/${p.url}`}
                className="inline-flex items-center gap-1 text-[13px] sm:text-sm font-medium text-blue-600 hover:underline"
              >
                {t("PRODUCT.view_details")} <ArrowUpRight className="w-4 h-4" />
              </Link>
              <span className="text-[11px] sm:text-xs text-gray-500">
                {t("PRODUCT.product_code")}: {p.productCode || "-"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 sm:mt-6 overflow-x-auto rounded-lg bg-white shadow-sm">
        {/* Header row */}
        <div
          className="grid sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70 min-w-[720px] sm:min-w-[860px] lg:min-w-0"
          style={{ gridTemplateColumns: gridTemplateColumns }}
        >
          <div className="px-2 py-2 sm:px-3 sm:py-3 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-gray-600 sticky left-0 bg-inherit">
            Thông số
          </div>
          {data.map((p) => (
            <div key={`head-${p.id}`} className="px-2 py-2 sm:px-3 sm:py-3">
              <div className="text-[11px] sm:text-xs text-gray-500">
                Sản phẩm
              </div>
              <div
                className="text-[13px] sm:text-sm font-semibold text-gray-900 line-clamp-1"
                title={p.name}
              >
                {p.name}
              </div>
            </div>
          ))}
        </div>

        {/* Toggle bar (hiện khi có nhiều hơn ROW_LIMIT rows) */}
        {hiddenCount > 0 && (
          <div className="flex justify-end px-2 sm:px-3 py-2 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1.5 text-[12px] sm:text-sm font-medium px-2.5 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Thu gọn
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Xem thêm {hiddenCount} dòng
                </>
              )}
            </button>
          </div>
        )}

        {/* Body rows (giới hạn theo visibleSpecNames) */}
        <AnimatePresence initial={false}>
          {visibleSpecNames.map((specName) => (
            <motion.div
              key={specName}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid border-b border-gray-100 min-w-[720px] sm:min-w-[860px] lg:min-w-0"
              style={{ gridTemplateColumns: gridTemplateColumns }}
            >
              {/* Cột trái: tên thông số (sticky) */}
              <div className="px-2 py-2 sm:px-3 sm:py-3 text-[13px] sm:text-sm font-medium text-gray-800 sticky left-0 bg-white z-[1]">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 shrink-0 rounded-full bg-amber-500 mt-1" />
                  <span className="truncate">{specName}</span>
                  <Info className="w-3.5 h-3.5 text-gray-400 hidden sm:inline" />
                </div>
              </div>

              {data.map((p, cIdx) => {
                const raw = specMapByProduct[cIdx].get(specName) ?? "";
                const isHtml = /(<\w+\b|&[a-z#]+;)/i.test(raw);
                return (
                  <div
                    key={`${p.id}-${specName}`}
                    className="px-2 py-2 sm:px-3 sm:py-3 text-[13px] sm:text-sm text-gray-700"
                  >
                    {isHtml ? (
                      <div
                        className="prose prose-sm sm:prose max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-gray-900 prose-table:table-fixed prose-table:w-full prose-th:text-xs prose-td:text-xs sm:prose-th:text-sm sm:prose-td:text-sm"
                        dangerouslySetInnerHTML={{ __html: raw }}
                      />
                    ) : (
                      <span className="break-words">{raw || "-"}</span>
                    )}
                  </div>
                );
              })}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

