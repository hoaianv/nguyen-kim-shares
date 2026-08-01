import { i18nText } from "@/lib/i18nText";
import { useCallback, useEffect, useMemo, useRef } from "react";
import debounce from "lodash/debounce";
import { useCartStore } from "@/stores/useCartStore";
import { useStateStore } from "@/stores/stateStore";
import { quote as quoteApi } from "@/apis/models/cart.apis";
import { getValidData, isQuoteEmpty } from "@/lib/utils";
import { IQuote } from "@/interfaces/models/ICart.interfaces";
import { useRouter } from "next/navigation";

export const useQuoteActions = () => {
  const {
    selectedIds,
    setQuote,
    quote,
    couponCode,
    setCouponActive,
    couponActive,
    setCouponCode,
    cart,
  } = useCartStore();
  const { setLoading } = useStateStore();
  const seq = useRef(0);
  const router = useRouter();

  const itemsSignature = useMemo(
    () =>
      selectedIds
        .map((id) => {
          const it = cart.items.find((i) => i.id === id);
          return it ? `${id}:${it.quantity}` : `${id}:0`;
        })
        .sort()
        .join("|"),
    [selectedIds, cart.items]
  );

  const runQuote = useCallback(async () => {
    if (!selectedIds.length) {
      setQuote(null);
      return;
    }

    setLoading(true);
    const token = ++seq.current;

    try {
      const payload = {
        cartId: selectedIds,
        couponCode: couponCode || undefined,
      };

      const res = await quoteApi(payload);

      if (token !== seq.current) return res;
      const data = getValidData<IQuote>(res);

      if (isQuoteEmpty(data)) {
        setQuote(null);
        setCouponActive(null);
        setCouponCode("");
        router.push("/gio-hang");
        return res;
      }

      if (!data || !data.coupon?.some((c) => c.id === couponActive?.id)) {
        setCouponActive(null);
        setCouponCode("");
      }
      setQuote(data ?? null);
      return res;
    } catch (e) {
      console.error("quote error:", e);
      setQuote(null);
      return {
        status: false,
        errorCode: 500,
        message: i18nText("AUTO.hooks.usequoteactions.line77_0_quote_failed"),
        data: null,
      };
    } finally {
      if (token === seq.current) setLoading(false);
    }
  }, [
    selectedIds,
    cart.items,
    couponCode,
    setQuote,
    setLoading,
    couponActive,
    setCouponActive,
    setCouponCode,
    router,
  ]);

  const autoQuote = useMemo(
    () =>
      debounce(() => {
        void runQuote();
      }, 250),
    [runQuote]
  );

  useEffect(() => {
    autoQuote();
    return () => autoQuote.cancel();
  }, [itemsSignature, couponCode, autoQuote]);

  return { quote, runQuote };
};
