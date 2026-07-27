import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";
import {
  IResponseOrder,
  IResponseOrderDetail,
} from "@/interfaces/models/IOrder.interface";

export async function getAll(payload: string) {
  const result = await api<IResponseOrder>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.ORDER}/${CONST_APIS_COMMON.GET_ALL}?status=${payload}`,
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

export async function findOne(payload: string) {
  const result = await api<IResponseOrderDetail>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.ORDER}/${payload}`,
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
