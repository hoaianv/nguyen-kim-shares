"use server";

import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";
import {
  ICategoryNewsResponse,
  IResponseListNews,
  IResponseNewsCommon,
  IResponseNewsSchema,
} from "@/interfaces/models/INews.interface";
import { IResponsePromotionCommon } from "@/interfaces/models/IPromotion.interface";

export async function getNewsLatest() {
  const result = await api<IResponseNewsCommon>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.NEWS}/${CONST_APIS_COMMON.TAKE_FIVE_NEWS}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getCategories() {
  const result = await api<ICategoryNewsResponse>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.NEWS}/${CONST_APIS_COMMON.CATEGORY}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function newsMain(slug: string) {
  const result = await api<IResponseNewsCommon>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.NEWS}/${CONST_APIS_COMMON.NEW}/${slug}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getListNews(slug: string, page: string) {
  const result = await api<IResponseListNews>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.NEWS}/${CONST_APIS_COMMON.CATEGORY}/${slug}?page=${page}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getPromotionNews() {
  const result = await api<IResponsePromotionCommon>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.NEWS}/${CONST_APIS_COMMON.PROMOTION}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getMostViewedNews() {
  const result = await api<IResponseNewsCommon>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.NEWS}/${CONST_APIS_COMMON.TOP_VIEW}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getSchema(payload: string) {
  const result = await api<IResponseNewsSchema>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.NEWS}/${CONST_APIS_COMMON.SCHEMA}/${payload}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}
