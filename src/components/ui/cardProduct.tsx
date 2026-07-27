"use client";

import { useCartActions } from "@/hooks/useCartActions";
import { IProduct } from "@/interfaces/models/IProduct.interface";
import {
  calcDiscountPercentage,
  cartToast,
  getMarketPrice,
  getPrice,
} from "@/lib/utils";
import { ShoppingCart, Heart, Shuffle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useEffect, useRef, useState } from "react";
import ImageWithFallback from "../ImageWithFallback";
import { useStateStore } from "@/stores/stateStore";
import ProductCardPopup from "./ProductCardPopup";
import Portal from "./Portal";

const stripHtml = (value?: string | null) =>
  value ? value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";

const CardProduct = ({ item }: { item: IProduct }) => {
  const { addToCart } = useCartActions();
  const t = useTranslations();
  const { config } = useStateStore();
  const [supportsHover, setSupportsHover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileSpecsOpen, setMobileSpecsOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateSupportsHover = () => setSupportsHover(mediaQuery.matches);

    updateSupportsHover();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateSupportsHover);
      return () => mediaQuery.removeEventListener("change", updateSupportsHover);
    }

    mediaQuery.addListener(updateSupportsHover);
    return () => mediaQuery.removeListener(updateSupportsHover);
  }, []);

  useEffect(() => {
    if (supportsHover) {
      setMobileSpecsOpen(false);
    }
  }, [supportsHover]);

  const updatePopupPosition = () => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const popupWidth = 380;
    const screenWidth = window.innerWidth;

    let x = rect.right + 10;
    let y = rect.top;

    if (x + popupWidth > screenWidth) {
      x = rect.left - popupWidth - 10;
    }

    if (y < 0) y = 8;

    setPopupPosition({ x, y });
  };

  useEffect(() => {
    if (!supportsHover || !isHovered) return;

    updatePopupPosition();

    const handleScroll = () => {
      if (isHovered) updatePopupPosition();
    };
    const handleResize = () => {
      if (isHovered) updatePopupPosition();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isHovered, supportsHover]);

  const specs = Array.isArray(item.technology) ? item.technology.slice(0, 3) : [];
  const hasDiscount =
    item.marketPrice !== undefined &&
    item.marketPrice > item.price &&
    calcDiscountPercentage(item.price, item.marketPrice) > 0;
  const showDesktopPopup = supportsHover && isHovered && specs.length > 0;
  const showMobileSpecs = !supportsHover && specs.length > 0;

  return (
    <>
      <div
        ref={cardRef}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-background transition duration-200 hover:-translate-y-0.5 hover:border-amber-300"
        onMouseEnter={() => supportsHover && setIsHovered(true)}
        onMouseLeave={() => supportsHover && setIsHovered(false)}
      >
        <Link href={`/${item.url}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted/20 p-4">
            <ImageWithFallback
              loading="lazy"
              width={280}
              height={187}
              src={item.picture ?? ""}
              alt={item.name ?? ""}
              className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
            />

            <div className="absolute left-2 top-2 flex flex-wrap gap-1">
              {item.isFavorite ? (
                <span className="inline-flex h-6 items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-700">
                  <Heart className="h-3 w-3" />
                  Yêu thích
                </span>
              ) : null}
              {item.isCompare ? (
                <span className="inline-flex h-6 items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                  <Shuffle className="h-3 w-3" />
                  So sánh
                </span>
              ) : null}
            </div>

            {hasDiscount ? (
              <span className="absolute right-2 top-2 inline-flex h-6 items-center rounded-full border border-rose-200 bg-rose-50 px-2 text-[10px] font-semibold text-rose-700">
                -{calcDiscountPercentage(item.price, item.marketPrice!)}%
              </span>
            ) : null}
          </div>
        </Link>

        <div className="flex flex-1 flex-col gap-3 p-3">
          <Link href={`/${item.url}`} className="block">
            <h3 className="line-clamp-2 min-h-[39px] text-sm font-medium leading-snug text-foreground transition group-hover:text-slate-700">
              {item.name}
            </h3>
          </Link>



          <div className="mt-auto space-y-2 border-t border-border pt-3">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <div className="text-base font-semibold tracking-tight text-rose-600 md:text-[1.05rem]">
                  {getPrice(item)}
                </div>
                {getMarketPrice(item) ? (
                  <s className="text-xs text-muted-foreground">
                    {getMarketPrice(item)}
                  </s>
                ) : null}
              </div>

              <div
                className={`inline-flex h-6 items-center rounded-full border px-2 text-[11px] font-medium ${item.isInStock
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-border bg-muted/30 text-muted-foreground"
                  }`}
              >
                {item.isInStock ? t("COMMON.in_stock") : t("COMMON.contact")}
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                if (item.isInStock) {
                  const res = await addToCart([{ product: item, quantity: 1 }]);
                  cartToast(res, router);
                } else {
                  window.location.href = `tel:${config.hotline ?? "#"}`;
                }
              }}
              className={`inline-flex h-11 min-w-0 w-full items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium transition ${item.isInStock
                ? "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
                : "cursor-not-allowed border-border bg-muted/50 text-muted-foreground"
                }`}
            >
              <ShoppingCart size={16} />
              <span className="whitespace-nowrap">
                {item.isInStock ? t("COMMON.add_to_cart") : t("COMMON.contact")}
              </span>
            </button>
          </div>

          {showMobileSpecs ? (
            <div className="mt-2 border-t border-border pt-3">
              <button
                type="button"
                onClick={() => setMobileSpecsOpen((prev) => !prev)}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition hover:border-amber-300 hover:bg-amber-50"
                aria-expanded={mobileSpecsOpen}
                aria-controls={`mobile-specs-${item.id}`}
              >
                <span>Thông số</span>
                <span className="text-xs text-muted-foreground">
                  {mobileSpecsOpen ? "Ẩn" : "Xem"}
                </span>
              </button>

              {mobileSpecsOpen ? (
                <div
                  id={`mobile-specs-${item.id}`}
                  className="mt-2 rounded-lg border border-border bg-muted/20 p-3"
                >
                  <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span>Thông số nhanh</span>
                    <span>{specs.length} mục</span>
                  </div>

                  <div className="space-y-2">
                    {specs.map((spec) => (
                      <div
                        key={spec.id}
                        className="grid grid-cols-[92px_minmax(0,1fr)] gap-2 text-xs leading-5"
                      >
                        <span className="font-medium text-foreground">
                          {spec.title}
                        </span>
                        <span
                          className="text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: spec.description }}
                        />
                      </div>
                    ))}
                  </div>

                  {item.warranty ? (
                    <div className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Bảo hành:
                      </span>{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: item.warranty }}
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {showDesktopPopup && (
        <Portal>
          <div
            className="pointer-events-none fixed z-[9999]"
            style={{
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
            }}
          >
            <div className="pointer-events-auto animate-in fade-in slide-in-from-left-2 duration-200">
              <ProductCardPopup
                data={item}
                specs={item.technology ?? []}
                warranty={item.warranty ?? "Đang cập nhật"}
              />
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

CardProduct.displayName = "CardProduct";
export default memo(CardProduct);

