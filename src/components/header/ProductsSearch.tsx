"use client";

import CardSearchProduct from "@/components/header/CardSearchProduct";
import { searchProducts } from "@/apis/models/products.apis";
import { ISearchProduct } from "@/interfaces/models/IProduct.interface";
import { getValidData } from "@/lib/utils";
import { useStateStore } from "@/stores/stateStore";
import debounce from "lodash/debounce";
import { Search, AlertCircle, Loader2 } from "lucide-react";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const ProductsSearch = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) => {
  const { search, setSearch } = useStateStore();
  const [loadingMore, setLoadingMore] = useState(false);
  const [data, setData] = useState<ISearchProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seq = useRef(0);
  const reduceMotion = useReducedMotion();

  const debouncedSearch = useMemo(
    () =>
      debounce(
        async (
          keyword: string,
          page: number,
          token: number,
          isLoadMore: boolean = false
        ) => {
          try {
            setError(null);
            const res = await searchProducts(keyword, page);
            if (token !== seq.current) return;

            const valid = getValidData(res);

            if (isLoadMore) {
              setData((prev) => {
                if (!prev || !valid) return valid ?? prev;
                return {
                  ...valid,
                  items: [...prev.items, ...valid.items],
                };
              });
            } else {
              setData(valid ?? null);
            }

            setShow(true);
          } catch (err) {
            if (token !== seq.current) return;
            setError("Không thể tải kết quả tìm kiếm.");
            setData(null);
            setShow(true);
          } finally {
            if (token === seq.current) {
              setLoading(false);
              setLoadingMore(false);
            }
          }
        },
        350
      ),
    [setShow]
  );

  useEffect(() => {
    if (!search.keyword?.trim()) {
      ++seq.current;
      debouncedSearch.cancel();
      setLoading(false);
      setLoadingMore(false);
      setData(null);
      setError(null);
      return;
    }

    const token = ++seq.current;

    if (search.page === 1) {
      setLoading(true);
      setData(null);
    } else {
      setLoadingMore(true);
    }

    const isLoadMore = search.page > 1;
    debouncedSearch(search.keyword.trim(), search.page, token, isLoadMore);

    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch, search.keyword, search.page, setShow]);

  useEffect(() => {
    if (search.keyword?.trim() && search.page !== 1) {
      setSearch((prev) => ({ ...prev, page: 1 }));
    }
  }, [search.keyword, search.page, setSearch]);

  const handleLoadMore = () => {
    setSearch((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const hasResults = !!data?.items?.length;
  const showIdleHint = show && !search.keyword?.trim() && !loading;
  const resultCountText =
    data?.message || (hasResults ? `Tìm thấy ${data.items.length} sản phẩm` : "");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute left-0 top-full z-50 mt-2 w-full"
          onMouseLeave={() => setShow(false)}
        >
          <div className="overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-[0_18px_48px_-34px_rgba(15,23,42,0.42)]">
            {loading ? (
              <div className="border-b border-border px-4 py-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-[#e6a414]" />
                  <span>Đang tìm kiếm sản phẩm...</span>
                </div>
              </div>
            ) : null}

            {showIdleHint ? (
              <div className="grid gap-3 px-4 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Tìm sản phẩm, danh mục hoặc thương hiệu
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Nhập từ khóa để xem kết quả từ dữ liệu hiện có.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  <Search className="h-3.5 w-3.5" />
                  Tìm nhanh
                </div>
              </div>
            ) : null}

            {error ? (
              <div className="px-4 py-5">
                <div className="flex items-start gap-3 border border-rose-200 bg-rose-50/70 px-3 py-3 text-sm text-rose-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium">{error}</div>
                    <div className="mt-1 text-xs text-rose-600">
                      Thử lại với từ khóa khác hoặc mở lại ô tìm kiếm.
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {!error && hasResults ? (
              <div className="max-h-[min(62vh,32rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    Kết quả
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {resultCountText}
                  </span>
                </div>

                <div className="divide-y divide-border">
                  {data.items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${index}`}
                      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.02, 0.12) }}
                    >
                      <CardSearchProduct product={item} />
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-border px-4 py-3">
                  {loadingMore ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin text-[#e6a414]" />
                      Đang tải thêm...
                    </div>
                  ) : (
                    <button
                      onClick={handleLoadMore}
                      className="inline-flex items-center gap-2 border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted/60"
                    >
                      Xem thêm kết quả
                    </button>
                  )}
                </div>
              </div>
            ) : null}

            {!error && !loading && !hasResults && search.keyword?.trim() ? (
              <div className="px-4 py-8 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center border border-border bg-muted/40 text-muted-foreground">
                  <Search className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Không tìm thấy sản phẩm nào
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Thử tìm với từ khóa khác hoặc kiểm tra lại chính tả.
                </p>
              </div>
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(ProductsSearch);

