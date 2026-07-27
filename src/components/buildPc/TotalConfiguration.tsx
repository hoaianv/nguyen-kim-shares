"use client";

import Button from "@/components/ui/button";
import { technicalHotline } from "@/constants/company.constant";
import { useBuyAction } from "@/hooks/useBuyAction";
import { useCartActions } from "@/hooks/useCartActions";
import { ICartItem } from "@/interfaces/models/ICart.interfaces";
import { cartToast, formatPrice } from "@/lib/utils";
import { useBuildPc } from "@/stores/useBuildPc";
import { useCartStore } from "@/stores/useCartStore";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export default function TotalConfiguration() {
  const { active, buildConfigs } = useBuildPc();
  const { setSelectedIds } = useCartStore();
  const t = useTranslations();

  const { addToCart } = useCartActions();
  const { buyNow } = useBuyAction(setSelectedIds);

  const total = useMemo(() => {
    const configs = buildConfigs[active] || {};
    return Object.values(configs).reduce(
      (sum: number, item: ICartItem) =>
        sum + (item?.quantity ?? 1) * item.price,
      0
    );
  }, [buildConfigs, active]);

  const payload = useMemo(() => {
    const configs = buildConfigs[active] || {};
    return Object.values(configs).map((item: ICartItem) => ({
      product: item,
      quantity: item.quantity ?? 1,
    }));
  }, [buildConfigs, active]);

  return (
    <div className="col-span-1 lg:col-span-3 lg:sticky lg:top-24">
      <div className="hidden lg:block h-[36px] mt-2" />

      <div className="bg-white p-2.5 sm:p-3 rounded-lg border border-zinc-200">
        <div className="my-2 flex items-center justify-center gap-2">
          <span className="font-light">{t("BUILD_PC.estimated_cost")}:</span>
          <span className="text-red-600 font-medium text-xl">
            {formatPrice(total)}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={async () => {
              const res = await addToCart(payload);
              cartToast(res);
            }}
          >
            {t("COMMON.add_to_cart")}
          </Button>

          <Button
            onClick={buyNow(payload)}
            variant="success"
            size="sm"
            fullWidth
          >
            {t("COMMON.buy_now")}
          </Button>
        </div>
      </div>

      <div className="mt-3 bg-white p-2.5 sm:p-3 rounded-lg border border-zinc-200">
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            (window.location.href = `https://zalo.me/${technicalHotline}`)
          }
          fullWidth
        >
          {t("COMMON.get_expert_advice")}
        </Button>
      </div>
    </div>
  );
}

