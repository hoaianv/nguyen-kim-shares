import { HEADER_ITEMS, HeaderItemI18n } from "@/constants";
import { IBaseProduct, MenuItem } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";
import { ICartItem, IQuote } from "@/interfaces/models/ICart.interfaces";
import { toast } from "sonner";

const vnFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Định dạng giá theo VND.
 * @param amount Giá đầu vào có thể là number, string, null hoặc undefined
 * @returns Giá đã định dạng hoặc "Liên hệ"
 */
export function formatPrice(
  amount: number | string | null | undefined
): string {
  if (amount == null) return "Liên hệ";
  const num =
    typeof amount === "string"
      ? Number(amount.replace(/[^\d.-]/g, ""))
      : amount;

  if (isNaN(num) || num <= 0) return "Liên hệ";
  return vnFormatter.format(num);
}

/**
 * Tính phần trăm giảm giá.
 * @param price Giá bán thực tế
 * @param marketPrice Giá thị trường
 * @returns Số phần trăm giảm (làm tròn), hoặc 0 nếu không giảm
 */
export function calcDiscountPercentage(
  price: number,
  marketPrice: number
): number {
  if (marketPrice <= 0 || price >= marketPrice) {
    return 0;
  }
  return Math.round(((marketPrice - price) / marketPrice) * 100);
}

export function checkMarketPrice(price: number, marketPrice?: number): boolean {
  return marketPrice !== undefined && marketPrice <= price;
}

export function getValidData<T>(res?: IResponse<T>): T | null {
  return res?.status && res?.errorCode === 200 && res?.data ? res.data : null;
}

export function getPrice(product: IBaseProduct, valueCoupon?: number): string {
  if (!product.isInStock) return "Liên hệ";

  const basePrice: number = checkMarketPrice(product.price, product.marketPrice)
    ? product.marketPrice ?? 0
    : product.price ?? 0;

  // nếu valueCoupon undefined thì coi như = 0
  const finalPrice = Math.max(0, basePrice - (valueCoupon ?? 0));

  return formatPrice(finalPrice);
}

export function getMarketPrice(product: IBaseProduct): string | null {
  return product.isInStock &&
    product.marketPrice &&
    !checkMarketPrice(product.price, product.marketPrice)
    ? formatPrice(product.marketPrice)
    : null;
}

export function getHeaderItemsWithState(
  authenticated: boolean
): HeaderItemI18n[] {
  return HEADER_ITEMS.map((item) =>
    item.value === "auth" ? { ...item, hasPopup: authenticated } : item
  );
}

export function cartToast(
  res: IResponse<{ items: ICartItem[] }>,
  router?: { push: (url: string) => void }
): boolean {
  const { status, errorCode, message, data } = res;

  if (status && errorCode === 200) {
    const items = data?.items ?? [];
    const names = items
      .map((i) => i?.name)
      .filter(Boolean)
      .join(", ");

    toast.success(message ?? "Thành công", {
      description: names ? `Đã thêm ${names} vào giỏ` : "Đã thêm vào giỏ",
      position: "top-center",
    });

    return true;
  }

  if (!status && errorCode === 401) {
    toast.warning("Thêm vào giỏ thất bại", {
      description: message,
      position: "top-center",
      action: {
        label: "Đăng nhập",
        onClick: () => {
          router?.push("/login");
        },
      },
    });

    setTimeout(() => {
      router?.push("/login");
    }, 3000);

    return false;
  }

  toast.warning("Thêm vào giỏ thất bại", {
    description: "Có lỗi gì đó vừa xảy ra vui lòng thử lại.",
    position: "top-center",
  });
  return false;
}

export const isQuoteEmpty = (quote: IQuote | null | undefined): boolean => {
  if (!quote) return true;

  return (
    quote.totalItem === 0 && quote.totalPrice === 0 && quote.totalQuantity === 0
  );
};
