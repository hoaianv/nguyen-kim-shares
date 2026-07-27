import { IBaseProduct } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";
import { ICoupon } from "@/interfaces/models/IProduct.interface";

export interface ICartItem extends IBaseProduct {
  productId?: number;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
  totalQuantity: number;
  totalItem: number;
  totalPrice: number;
}

export interface ICartItemPayload {
  productId: number;
  quantity: number;
}
export interface IPayloadUpdateCart {
  cartId: number;
  quantity: number;
}

export interface IPayloadAddCart {
  items: ICartItemPayload[];
}

export interface IPayloadDeleteCart {
  cartId: number[];
}

export interface IPayloadQuoteCart {
  cartId: number[];
  couponCode?: string;
}

export interface IQuote {
  totalQuantity: number;
  totalItem: number;
  finalPrice: number;
  totalPrice: number;
  orderId?: number;
  coupon?: ICoupon[] | [];
}
export type IResponseQuoteCart = IResponse<IQuote>;

export type IResponseCart = IResponse<ICart>;
export type IResponseUpdateCart = IResponse<ICartItem>;
