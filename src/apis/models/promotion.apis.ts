"use server";

import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";
import {
  IResponseListPromotion,
  IResponsePromotionSchema,
} from "@/interfaces/models/IPromotion.interface";

export async function getListPromotion(page: string) {
  const result = await api<IResponseListPromotion>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.NEWS}/${
      CONST_APIS_COMMON.CATEGORY
    }/${"tin-khuyen-mai"}?page=${page}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getSchema(payload: string) {
  const result = await api<IResponsePromotionSchema>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PROMOTION}/${CONST_APIS_COMMON.SCHEMA}/${payload}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getListPromotionHome() {
  const result = await api<IResponseListPromotion>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PROMOTION}/${
      CONST_APIS_COMMON.TAKE_5_PROMOTION
    }`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}
