"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/useAuth";
import { useCartActions } from "@/hooks/useCartActions";
import { getValidData } from "@/lib/utils";
import type { IProduct } from "@/interfaces/models/IProduct.interface";

type CartPayloadItem = { product: IProduct; quantity: number };
type CartPayload = CartPayloadItem[];
type CartRes = { items?: { id: number }[] } | null;

export function useBuyAction(setSelectedIds: (ids: number[]) => void) {
  const router = useRouter();
  const { addToCart } = useCartActions();
  const authenticated = useAuthStore((s) => s.authenticated);

  const showLoginToast = () =>
    toast.error("Mua ngay không thành công", {
      description: "Vui lòng đăng nhập để tiếp tục mua ngay.",
      position: "top-center",
      action: {
        label: "Đăng nhập",
        onClick: () => router.push("/login?redirect=/thanh-toan"),
      },
    });

  const showGenericError = () =>
    toast.error("Không thể mua ngay", {
      description: "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút.",
      position: "top-center",
    });

  const toPayload = (
    input: IProduct | CartPayload,
    quantity = 1
  ): CartPayload =>
    Array.isArray(input) ? input : [{ product: input, quantity }];

  const buyNow = (input: IProduct | CartPayload, quantity = 1) => {
    return async () => {
      if (!authenticated) {
        showLoginToast();
        return;
      }

      try {
        const res = await addToCart(toPayload(input, quantity));
        const data = getValidData(res) as CartRes;

        const ids = data?.items?.map((i) => i.id) ?? [];
        if (data && ids.length === 0) {
          showGenericError();
          return;
        }

        setSelectedIds(ids);
        router.replace("/thanh-toan");
      } catch {
        showGenericError();
      }
    };
  };

  return { buyNow };
}
