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
          message: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!",
          data: { items: [] },
          errorCode: 401,
        };
      }

      if (!Array.isArray(items) || items.length === 0) {
        return {
          status: false,
          message: "Không có sản phẩm để thêm.",
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
          message: "Tất cả sản phẩm đều hết hàng.",
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
          message: "Đã thêm sản phẩm vào giỏ hàng.",
          data: { items: data },
          errorCode: 200,
        };
      } catch (error: any) {
        console.error("Lỗi khi addToCart:", error);
        return {
          status: false,
          message: "Lỗi khi thêm vào giỏ hàng.",
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
          message: "Dữ liệu không hợp lệ",
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
              message: res.message ?? "Cập nhật thất bại",
              data: {} as ICartItem,
            };
          }

          updateQuantity(cartId, data.quantity);

          return {
            status: true,
            errorCode: 200,
            message: res.message ?? "Cập nhật số lượng thành công",
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
            message: "Đã cập nhật giỏ hàng (local).",
            data: snap,
          };
        }
      } catch (error: any) {
        console.error("Lỗi khi updateCart:", error);
        return {
          status: false,
          errorCode: 500,
          message: "Lỗi khi cập nhật giỏ hàng.",
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
          message: "Không có sản phẩm để xóa.",
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
              message: message ?? "Xóa thất bại",
            };
          }

          removeItems(ids);

          return {
            status: true,
            errorCode: 200,
            message: message ?? "Đã xóa sản phẩm khỏi giỏ hàng.",
          };
        } else {
          removeItems(ids);
          return {
            status: true,
            errorCode: 200,
            message: "Đã xóa sản phẩm khỏi giỏ hàng (local).",
            data: { removedIds: ids },
          };
        }
      } catch (error: any) {
        console.error("removeCart error:", error);
        return {
          status: false,
          errorCode: 500,
          message: "Lỗi khi xóa sản phẩm.",
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
