"use server";
import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";
import {
  IResponseAbout,
  IResponseAboutMeta,
  IResponseDetailAbout,
} from "@/interfaces/models/IAbout.interface";

export async function getAll() {
  const result = await api<IResponseAbout>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.ABOUT}/${CONST_APIS_COMMON.GET_ALL}`,
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
  const result = await api<IResponseDetailAbout>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.ABOUT}/${payload}`,
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
  const result = await api<IResponseAboutMeta>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.ABOUT}/${CONST_APIS_COMMON.META}/${slug}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}
