"use client";
import React, { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/useCartStore";
import { checkMarketPrice, formatPrice, getPrice } from "@/lib/utils";
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

  const showMarket = checkMarketPrice(item.price, item.marketPrice);
  const unitPrice = showMarket ? item.marketPrice! : item.price;
  const total = unitPrice * item.quantity;

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:block px-2">
        <div className="grid grid-cols-12 gap-3 py-3 rounded-lg hover:bg-gray-50 -mx-2 md:mx-0">
          <div className="col-span-6 flex items-start gap-3">
            <div className="h-full flex items-center justify-center">
              <CheckboxField
                id={`checkbox-${id}`}
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
              <Link
                href={`/${item.url}`}
                className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-3"
                title={item.name}
              >
                {item.name}
              </Link>
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-center">
            <span className="text-sm text-gray-800">{getPrice(item)}</span>
          </div>

          <div className="col-span-2 flex flex-col items-center justify-center gap-2">
            <div className="inline-flex items-center rounded-lg border border-gray-300">
              <button
                disabled={item.quantity <= 1}
                onClick={() => updateCart(id, item.quantity - 1)}
                className={`h-8 w-8 text-gray-400 ${
                  item.quantity <= 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                aria-label="Giảm số lượng"
              >
                −
              </button>
              <span className="w-10 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateCart(id, item.quantity + 1)}
                className="h-8 w-8 text-gray-400 cursor-pointer"
                aria-label="Tăng số lượng"
              >
                +
              </button>
            </div>

            <div className="text-center">
              <ConfirmPopover
                trigger={
                  <span className="text-xs text-gray-400 mt-2 cursor-pointer">
                    {t("COMMON.delete")}
                  </span>
                }
                title="Xóa sản phẩm"
                description="Bạn có chắc chắn muốn xóa sản phẩm này?"
                onConfirm={() => removeCart([id])}
                position="bottom"
              />
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-900">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-2 py-3">
        <div className="bg-white rounded-lg border border-gray-100 p-3">
          {/* Header with checkbox and delete */}
          <div className="flex items-center justify-between mb-3">
            <CheckboxField
              id={`checkbox-mobile-${id}`}
              checked={selected}
              onChange={() => toggleSelect(id)}
            />
            <ConfirmPopover
              trigger={
                <button className="text-xs text-red-500 hover:text-red-700 px-2 py-1">
                  {t("COMMON.delete")}
                </button>
              }
              title="Xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa sản phẩm này?"
              onConfirm={() => removeCart([id])}
              position="bottom"
            />
          </div>

          {/* Product info */}
          <div className="flex gap-3">
            <div className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 ring-1 ring-gray-200">
              <Image
                src={item.picture}
                alt={item.name}
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex-1 min-w-0">
              <Link
                href={`/${item.url}`}
                className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
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

          {/* Quantity and total */}
          <div className="mt-4 flex items-center justify-between">
            <div className="inline-flex items-center rounded-lg border border-gray-300">
              <button
                disabled={item.quantity <= 1}
                onClick={() => updateCart(id, item.quantity - 1)}
                className={`h-8 w-8 text-gray-400 text-sm ${
                  item.quantity <= 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                aria-label="Giảm số lượng"
              >
                −
              </button>
              <span className="w-10 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateCart(id, item.quantity + 1)}
                className="h-8 w-8 text-gray-400 cursor-pointer text-sm"
                aria-label="Tăng số lượng"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500">Thành tiền</div>
              <div className="text-sm font-semibold text-gray-900">
                {formatPrice(total)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Layout */}
      <div className="hidden sm:block md:hidden px-2">
        <div className="py-3 border-b border-gray-100 last:border-b-0">
          <div className="flex gap-3">
            {/* Checkbox */}
            <div className="flex items-start pt-2">
              <CheckboxField
                id={`checkbox-tablet-${id}`}
                checked={selected}
                onChange={() => toggleSelect(id)}
              />
            </div>

            {/* Image */}
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 ring-1 ring-gray-200">
              <Image
                src={item.picture}
                alt={item.name}
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <Link
                  href={`/${item.url}`}
                  className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2 flex-1 mr-2"
                  title={item.name}
                >
                  {item.name}
                </Link>

                <ConfirmPopover
                  trigger={
                    <button className="text-xs text-red-500 hover:text-red-700 px-2 py-1 ml-2">
                      {t("COMMON.delete")}
                    </button>
                  }
                  title="Xóa sản phẩm"
                  description="Bạn có chắc chắn muốn xóa sản phẩm này?"
                  onConfirm={() => removeCart([id])}
                  position="right"
                />
              </div>

              <div className="mt-2 text-sm text-gray-600">
                Đơn giá:{" "}
                <span className="font-medium text-gray-900">
                  {getPrice(item)}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center rounded-lg border border-gray-300">
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() => updateCart(id, item.quantity - 1)}
                    className={`h-8 w-8 text-gray-400 ${
                      item.quantity <= 1
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    aria-label="Giảm số lượng"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCart(id, item.quantity + 1)}
                    className="h-8 w-8 text-gray-400 cursor-pointer"
                    aria-label="Tăng số lượng"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-500">Thành tiền</div>
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

