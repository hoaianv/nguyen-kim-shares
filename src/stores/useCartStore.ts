import { ICart, ICartItem, IQuote } from "@/interfaces/models/ICart.interfaces";
import { ICoupon } from "@/interfaces/models/IProduct.interface";
import { create } from "zustand";

interface CartState {
  cart: ICart;
  clearCart: () => void;

  selectedIds: number[];
  toggleSelect: (id: number) => void;
  selectAll: () => void;
  clearSelected: () => void;
  setInitCart: (cart: ICart) => void;
  addItems: (items: ICartItem[]) => void;

  setSelectedIds: (ids: number[]) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItems: (ids: number[]) => void;
  setCouponCode: (code: string) => void;
  couponCode: string;
  quote: IQuote | null;
  setQuote: (q: IQuote | null) => void;
  couponActive: ICoupon | null;
  setCouponActive: (c: ICoupon | null) => void;
}

export const useCartStore = create<CartState>((set, get) => {
  const EMPTY_CART: ICart = {
    items: [],
    totalQuantity: 0,
    totalItem: 0,
    totalPrice: 0,
  };

  const calcTotals = (items: ICartItem[]) => {
    const totalQuantity = items.reduce(
      (sum, it) => sum + (Number(it.quantity) || 0),
      0
    );
    const totalPrice = items.reduce(
      (sum, it) => sum + (Number(it.quantity) || 0) * (Number(it.price) || 0),
      0
    );
    const totalItem = items.length;
    return { totalQuantity, totalPrice, totalItem };
  };

  const computeCart = (items: ICartItem[]): ICart => {
    const cleaned = items.filter((i) => (Number(i.quantity) || 0) > 0);
    const { totalQuantity, totalPrice, totalItem } = calcTotals(cleaned);
    return { items: cleaned, totalQuantity, totalItem, totalPrice };
  };

  return {
    cart: EMPTY_CART,

    setInitCart: (cart: ICart) =>
      set(() => ({
        cart: computeCart(cart.items || []),
      })),
    clearCart: () =>
      set(() => ({
        cart: EMPTY_CART,
        selectedIds: [],
        couponCode: "",
        quote: null,
        couponActive: null,
      })),

    addItems: (newItems: ICartItem[]) =>
      set((state) => {
        const updated = [...state.cart.items];
        newItems.forEach((item) => {
          const idx = updated.findIndex((i) => i.id === item.id);
          if (idx !== -1) {
            updated[idx] = {
              ...updated[idx],
              quantity:
                (Number(updated[idx].quantity) || 0) +
                (Number(item.quantity) || 0),
            };
          } else {
            updated.push({ ...item });
          }
        });
        return { cart: computeCart(updated) };
      }),

    updateQuantity: (id: number, quantity: number) =>
      set((state) => {
        const updated = state.cart.items.map((item) =>
          item.id === id ? { ...item, quantity: Number(quantity) || 0 } : item
        );
        return { cart: computeCart(updated) };
      }),

    removeItems: (ids: number[]) =>
      set((state) => {
        const updated = state.cart.items.filter(
          (item) => !ids.includes(item.id)
        );
        return { cart: computeCart(updated) };
      }),

    selectedIds: [],
    toggleSelect: (id: number) =>
      set((state) => {
        const selected = state.selectedIds.includes(id)
          ? state.selectedIds.filter((x) => x !== id)
          : [...state.selectedIds, id];
        return { selectedIds: selected };
      }),
    selectAll: () =>
      set((state) => ({ selectedIds: state.cart.items.map((i) => i.id) })),
    clearSelected: () => set({ selectedIds: [] }),
    setSelectedIds: (ids: number[]) => set({ selectedIds: ids }),

    couponCode: "",
    setCouponCode: (code) => set({ couponCode: code }),

    quote: null,
    setQuote: (q) => set({ quote: q }),

    couponActive: null,
    setCouponActive: (c) => set({ couponActive: c }),
  };
});
