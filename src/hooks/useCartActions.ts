import { i18nText } from "@/lib/i18nText";
import { useCallback, useMemo } from "react";
import { IProduct } from "@/interfaces/models/IProduct.interface";
import { getValidData } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuth";
import {
  ICart,
  ICartItem,
  IPayloadAddCart,
  IPayloadUpdateCart,
  IResponseUpdateCart,
} from "@/interfaces/models/ICart.interfaces";
import { create, remove, update } from "@/apis/models/cart.apis";
import { IResponse } from "@/interfaces/common/IResponse.interface";
import { useStateStore } from "@/stores/stateStore";

type AddCartInputItem = { product: IProduct; quantity?: number };

export const useCartActions = () => {
  const { addItems, updateQuantity, removeItems } = useCartStore();
  const { authenticated } = useAuthStore();
  const { setLoading } = useStateStore();

  const addToCart = useCallback(
    async (
      items: AddCartInputItem[]
    ): Promise<IResponse<{ items: ICartItem[] }>> => {
      if (!authenticated) {
        return {
          status: false,
          message: i18nText("AUTO.hooks.usecartactions.line31_0_can_dang_nhap_them_san"),
          data: { items: [] },
          errorCode: 401,
        };
      }

      if (!Array.isArray(items) || items.length === 0) {
        return {
          status: false,
          message: i18nText("AUTO.hooks.usecartactions.line40_1_khong_san_pham_them"),
          data: { items: [] },
          errorCode: 400,
        };
      }

      const normalized = items.map((it) => ({
        product: it.product,
        quantity: Math.max(1, it.quantity ?? 1),
      }));

      const available = normalized.filter((it) => it.product.isInStock);

      if (available.length === 0) {
        return {
          status: false,
          message: i18nText("AUTO.hooks.usecartactions.line56_2_tat_ca_san_pham_deu"),
          data: { items: [] },
          errorCode: 400,
        };
      }

      try {
        const payload: IPayloadAddCart = {
          items: available.map((it) => ({
            productId: it.product.id,
            quantity: it.quantity,
          })),
        };

        const response = await create(payload);
        const data = getValidData<ICart>(response)?.items ?? [];
        addItems(data);

        return {
          status: true,
          message: i18nText("AUTO.hooks.usecartactions.line76_3_da_them_san_pham_vao"),
          data: { items: data },
          errorCode: 200,
        };
      } catch (error: any) {
        console.error("addToCart error:", error);
        return {
          status: false,
          message: i18nText("AUTO.hooks.usecartactions.line84_4_loi_khi_them_vao_gio"),
          data: { items: [] },
          errorCode: 500,
          errors: error,
        };
      }
    },
    [addItems, authenticated]
  );
  const updateCart = useCallback(
    async (cartId: number, quantity: number): Promise<IResponseUpdateCart> => {
      setLoading(true);

      if (!cartId || quantity < 0) {
        return {
          status: false,
          errorCode: 400,
          message: i18nText("AUTO.hooks.usecartactions.line101_5_du_lieu_khong_hop_le"),
          data: {} as ICartItem,
        };
      }

      try {
        if (authenticated) {
          const payload: IPayloadUpdateCart = { cartId, quantity };
          const res = await update(payload);
          const data = getValidData<ICartItem>(res);

          if (!data) {
            return {
              status: false,
              errorCode: res.errorCode ?? 500,
              message: res.message ?? i18nText("AUTO.hooks.usecartactions.extra117_0_cap_nhat_that_bai"),
              data: {} as ICartItem,
            };
          }

          updateQuantity(cartId, data.quantity);

          return {
            status: true,
            errorCode: 200,
            message: res.message ?? i18nText("AUTO.hooks.usecartactions.extra127_1_cap_nhat_so_luong_thanh"),
            data,
          };
        } else {
          updateQuantity(cartId, quantity);

          const snap = useCartStore
            .getState()
            .cart.items.find((i) => i.id === cartId);

          return {
            status: true,
            errorCode: 200,
            message: i18nText("AUTO.hooks.usecartactions.line139_6_da_cap_nhat_gio_hang"),
            data: snap,
          };
        }
      } catch (error: any) {
        console.error("updateCart error:", error);
        return {
          status: false,
          errorCode: 500,
          message: i18nText("AUTO.hooks.usecartactions.line148_7_loi_khi_cap_nhat_gio"),
          data: {} as ICartItem,
          errors: error,
        };
      } finally {
        setLoading(false);
      }
    },
    [authenticated, updateQuantity]
  );

  const removeCart = useCallback(
    async (ids: number[]): Promise<IResponse<{ removedIds: number[] }>> => {
      if (!ids || ids.length === 0) {
        return {
          status: false,
          errorCode: 400,
          message: i18nText("AUTO.hooks.usecartactions.line165_8_khong_san_pham_xoa"),
          data: { removedIds: [] },
        };
      }
      setLoading(true);

      try {
        if (authenticated) {
          const { status, errorCode, message } = await remove({ cartId: ids });

          if (!status && errorCode !== 200) {
            return {
              status: false,
              errorCode: errorCode ?? 500,
              message: message ?? i18nText("AUTO.hooks.usecartactions.extra180_2_xoa_that_bai"),
            };
          }

          removeItems(ids);

          return {
            status: true,
            errorCode: 200,
            message: message ?? i18nText("AUTO.hooks.usecartactions.extra189_3_da_xoa_san_pham_khoi"),
          };
        } else {
          removeItems(ids);
          return {
            status: true,
            errorCode: 200,
            message: i18nText("AUTO.hooks.usecartactions.line195_9_da_xoa_san_pham_khoi"),
            data: { removedIds: ids },
          };
        }
      } catch (error: any) {
        console.error("removeCart error:", error);
        return {
          status: false,
          errorCode: 500,
          message: i18nText("AUTO.hooks.usecartactions.line204_10_loi_khi_xoa_san_pham"),
          data: { removedIds: [] },
          errors: error,
        };
      } finally {
        setLoading(false);
      }
    },
    [authenticated]
  );
  return useMemo(
    () => ({ addToCart, updateCart, removeCart }),
    [addToCart, updateCart, removeCart]
  );
};
