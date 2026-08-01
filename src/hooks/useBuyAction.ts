"use client";

import { i18nText } from "@/lib/i18nText";
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
    toast.error(i18nText("AUTO.hooks.usebuyaction.line20_0_mua_ngay_khong_thanh_cong"), {
      description: i18nText("AUTO.hooks.usebuyaction.line21_1_vui_long_dang_nhap_tiep"),
      position: "top-center",
      action: {
        label: i18nText("AUTO.hooks.usebuyaction.line24_2_dang_nhap"),
        onClick: () => router.push("/dang-nhap?redirect=/thanh-toan"),
      },
    });

  const showGenericError = () =>
    toast.error(i18nText("AUTO.hooks.usebuyaction.line30_3_khong_mua_ngay"), {
      description: i18nText("AUTO.hooks.usebuyaction.line31_4_da_xay_ra_loi_vui"),
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
