"use server";

import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { api } from "@/helpers/api.helper";
import { CONST_METHODS } from "@/constants/methods.constant";
import { IAdvertiseResponse } from "@/interfaces/models/IAdvertise.interface";

export async function getAll() {
  const result = await api<IAdvertiseResponse>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.ADVERTISE}/${CONST_APIS_COMMON.GET_ALL}`,
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
