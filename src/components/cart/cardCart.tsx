"use client";

import { i18nText } from "@/lib/i18nText";
import React, { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice, getMarketPrice, getPrice } from "@/lib/utils";
import CheckboxField from "@/components/ui/checkboxField";
import ConfirmPopover from "@/components/ui/ConfirmPopover";
import { useCartActions } from "@/hooks/useCartActions";
import { useTranslations } from "next-intl";

type Props = { id: number };

const CardCart = memo(function CardCart({ id }: Props) {
  const t = useTranslations();

  const item = useCartStore(
    useCallback((s) => s.cart.items.find((i) => i.id === id)!, [id])
  );
  const selected = useCartStore(
    useCallback((s) => s.selectedIds.includes(id), [id])
  );
  const toggleSelect = useCartStore((s) => s.toggleSelect);

  const { updateCart, removeCart } = useCartActions();

  const [quantityDraft, setQuantityDraft] = useState(String(item.quantity));

  useEffect(() => {
    setQuantityDraft(String(item.quantity));
  }, [item.quantity]);

  const commitQuantity = (value: string) => {
    const nextQuantity = Math.max(1, Number(value) || 1);
    setQuantityDraft(String(nextQuantity));
    void updateCart(id, nextQuantity);
  };

  const marketPrice = getMarketPrice(item);
  const unitPrice =
    item.marketPrice !== undefined && item.marketPrice <= item.price
      ? item.marketPrice
      : item.price;
  const total = unitPrice * item.quantity;

  return (
    <>
      <div className="hidden md:block px-2">
        <div className="grid grid-cols-[120px_minmax(0,2fr)_minmax(140px,1fr)_120px_140px_56px] gap-3 rounded-lg py-4 hover:bg-[var(--theme-section-soft)]">
          <div className="flex items-center gap-3">
            <CheckboxField
              id={`checkbox-${id}`}
              checked={selected}
              onChange={() => toggleSelect(id)}
            />

            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 ring-1 ring-gray-200">
              <Image
                src={item.picture}
                alt={item.name}
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="min-w-0 pr-2">
            <Link
              href={`/${item.url}`}
              className="line-clamp-3 text-sm font-medium text-gray-900 hover:text-blue-600"
              title={item.name}
            >
              {item.name}
            </Link>

            {item.name2 ? (
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                {item.name2}
              </p>
            ) : null}

            {(item.brand || item.productCode) ? (
              <p className="mt-1 text-xs text-gray-400">
                {[item.brand, item.productCode].filter(Boolean).join(" • ")}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="theme-price text-sm font-semibold">
              {getPrice(item)}
            </span>
            {marketPrice ? (
              <s className="text-xs text-gray-400">
                {marketPrice}
              </s>
            ) : null}
          </div>

          <div className="flex items-center justify-center">
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={quantityDraft}
              onChange={(event) => setQuantityDraft(event.target.value)}
              onBlur={() => commitQuantity(quantityDraft)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.currentTarget.blur();
                }
                if (event.key === "Escape") {
                  setQuantityDraft(String(item.quantity));
                  event.currentTarget.blur();
                }
              }}
              className="h-10 w-14 rounded border theme-border text-center text-sm outline-none transition focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-ring/20"
              aria-label={i18nText("AUTO.components.cart.cardcart.line121_0_so_luong")}
            />
          </div>

          <div className="flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-900">
              {formatPrice(total)}
            </span>
          </div>

          <div className="flex items-center justify-center">
            <ConfirmPopover
              trigger={
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                  aria-label={i18nText("AUTO.components.cart.cardcart.line137_1_xoa_san_pham")}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              }
              title={i18nText("AUTO.components.cart.cardcart.line142_2_xoa_san_pham")}
              description={i18nText("AUTO.components.cart.cardcart.extra144_0_chac_chan_muon_xoa_san")}
              onConfirm={() => removeCart([id])}
              position="bottom"
            />
          </div>
        </div>
      </div>

      <div className="md:hidden px-2 py-3">
        <div className="rounded-lg border theme-border bg-[var(--theme-section-bg)] p-3">
          <div className="mb-3 flex items-center justify-between">
            <CheckboxField
              id={`checkbox-mobile-${id}`}
              checked={selected}
              onChange={() => toggleSelect(id)}
            />
            <ConfirmPopover
              trigger={
                <button className="px-2 py-1 text-xs text-red-500 hover:text-red-700">
                  {t("COMMON.delete")}
                </button>
              }
              title={i18nText("AUTO.components.cart.cardcart.line165_3_xoa_san_pham")}
              description={i18nText("AUTO.components.cart.cardcart.extra167_1_chac_chan_muon_xoa_san")}
              onConfirm={() => removeCart([id])}
              position="bottom"
            />
          </div>

          <div className="flex gap-3">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 ring-1 ring-gray-200 sm:h-20 sm:w-20">
              <Image
                src={item.picture}
                alt={item.name}
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <Link
                href={`/${item.url}`}
                className="line-clamp-2 text-sm font-medium text-gray-900 hover:text-blue-600"
                title={item.name}
              >
                {item.name}
              </Link>

              <div className="mt-2 text-xs text-gray-600">
                <span className="font-medium text-gray-900">
                  {getPrice(item)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="inline-flex items-center rounded-lg border theme-border">
              <button
                disabled={item.quantity <= 1}
                onClick={() => updateCart(id, item.quantity - 1)}
                className={`h-8 w-8 text-sm text-gray-400 ${
                  item.quantity <= 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                aria-label={i18nText("AUTO.components.cart.cardcart.line208_4_giam_so_luong")}
              >
                −
              </button>
              <span className="w-10 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateCart(id, item.quantity + 1)}
                className="h-8 w-8 cursor-pointer text-sm text-gray-400"
                aria-label={i18nText("AUTO.components.cart.cardcart.line216_5_tang_so_luong")}
              >
                +
              </button>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500">{i18nText("AUTO.components.cart.cardcart.line223_6_thanh_tien")}</div>
              <div className="text-sm font-semibold text-gray-900">
                {formatPrice(total)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden px-2 sm:block md:hidden">
        <div className="border-b theme-border py-3 last:border-b-0">
          <div className="flex gap-3">
            <div className="flex items-start pt-2">
              <CheckboxField
                id={`checkbox-tablet-${id}`}
                checked={selected}
                onChange={() => toggleSelect(id)}
              />
            </div>

            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 ring-1 ring-gray-200">
              <Image
                src={item.picture}
                alt={item.name}
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between">
                <Link
                  href={`/${item.url}`}
                  className="mr-2 flex-1 line-clamp-2 text-sm font-medium text-gray-900 hover:text-blue-600"
                  title={item.name}
                >
                  {item.name}
                </Link>

                <ConfirmPopover
                  trigger={
                    <button className="ml-2 px-2 py-1 text-xs text-red-500 hover:text-red-700">
                      {t("COMMON.delete")}
                    </button>
                  }
                  title={i18nText("AUTO.components.cart.cardcart.line269_7_xoa_san_pham")}
                  description={i18nText("AUTO.components.cart.cardcart.extra271_2_chac_chan_muon_xoa_san")}
                  onConfirm={() => removeCart([id])}
                  position="right"
                />
              </div>

              <div className="mt-2 text-sm text-gray-600">{i18nText("AUTO.components.cart.cardcart.line277_8_don_gia")}<span className="font-medium text-gray-900">{getPrice(item)}</span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center rounded-lg border theme-border">
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() => updateCart(id, item.quantity - 1)}
                    className={`h-8 w-8 text-gray-400 ${
                      item.quantity <= 1
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    aria-label={i18nText("AUTO.components.cart.cardcart.line290_9_giam_so_luong")}
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCart(id, item.quantity + 1)}
                    className="h-8 w-8 cursor-pointer text-gray-400"
                    aria-label={i18nText("AUTO.components.cart.cardcart.line300_10_tang_so_luong")}
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-500">{i18nText("AUTO.components.cart.cardcart.line307_11_thanh_tien")}</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {formatPrice(total)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export { CardCart };
