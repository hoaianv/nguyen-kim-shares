"use server";
import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";
import {
  IResponseDetailService,
  IResponseService,
  IResponseServiceMeta,
} from "@/interfaces/models/IServices.interface";

export async function getAll(page: string) {
  const result = await api<IResponseService>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.SERVICE}/${CONST_APIS_COMMON.GET_ALL}?page=${page}`,
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
  const result = await api<IResponseDetailService>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.SERVICE}/${payload}`,
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

export async function getMeta(slug: string) {
  const result = await api<IResponseServiceMeta>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.SERVICE}/${CONST_APIS_COMMON.META}/${slug}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}
