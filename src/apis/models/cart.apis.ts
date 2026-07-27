"use server";
import {
  IPayloadAddCart,
  IPayloadDeleteCart,
  IPayloadQuoteCart,
  IPayloadUpdateCart,
  IResponseCart,
  IResponseQuoteCart,
  IResponseUpdateCart,
} from "@/interfaces/models/ICart.interfaces";
import { CONST_APIS, CONST_APIS_COMMON } from "../../constants/apis.constant";
import { CONST_METHODS } from "../../constants/methods.constant";
import { api } from "../../helpers/api.helper";
import { IResponse } from "@/interfaces/common/IResponse.interface";
import { IPayloadOrder } from "@/interfaces/models/IOrder.interface";

export async function getAll() {
  const result = await api<IResponseCart>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.CART}/${CONST_APIS_COMMON.GET_ALL}`,
    options: {
      method: CONST_METHODS.GET,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });

  return result;
}

export async function create(payload: IPayloadAddCart) {
  const result = await api<IResponseCart>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.CART}/${CONST_APIS_COMMON.ADD}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload),
    },
  });

  return result;
}
export async function update(payload: IPayloadUpdateCart) {
  const result = await api<IResponseUpdateCart>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.CART}/${CONST_APIS_COMMON.UPDATE}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload),
    },
  });

  return result;
}

export async function remove(payload: IPayloadDeleteCart) {
  const result = await api<IResponse<void>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.CART}/${CONST_APIS_COMMON.DELETE}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload),
    },
  });

  return result;
}

export async function quote(payload: IPayloadQuoteCart) {
  const result = await api<IResponseQuoteCart>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.CART}/${CONST_APIS_COMMON.QUOTE}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  return result;
}

export async function checkout(payload: IPayloadOrder) {
 
  const result = await api<IResponseQuoteCart>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.CART}/${CONST_APIS_COMMON.CHECKOUT}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  return result;
}
