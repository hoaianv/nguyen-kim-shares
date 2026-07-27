import { IResponse } from "@/interfaces/common/IResponse.interface";
import { ICartItem } from "@/interfaces/models/ICart.interfaces";

export type ShippingMethod = "delivery" | "pickup";
export type OrderStatus =
  | "pending"
  | "payment"
  | "paid"
  | "delivered"
  | "finished"
  | "fail"
  | "customer-cancels"
  | string;

export interface IInfoUserOrder {
  id?: number;
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
  isDefault?: boolean;
}

export interface IPayloadOrder extends IInfoUserOrder {
  shippingMethod: ShippingMethod;
  note: string;
  couponCode: string;
  cartId: number[];
}

export interface IOrder {
  id: number;
  orderCode: string;

  nameDelivery: string;
  addressDelivery: string;
  phoneDelivery: string;
  emailDelivery: string;

  nameCompany: string;
  addressCompany: string;
  phoneCompany: string;
  emailCompany: string;

  totalPrice: number;
  finalPrice: number;

  couponCode: string | null;
  couponValue: number | null;

  shippingMethod: ShippingMethod;
  note: string;

  dateOrder: string;

  items: ICartItem[];
  status: OrderStatus;
}

export interface IOrderDetail extends IOrder {
  items: ICartItem[];
}

export type IResponseOrder = IResponse<IOrder[]>;
export type IResponseOrderDetail = IResponse<IOrderDetail>;
