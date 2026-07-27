"use server";
import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";

import {
  IResponseDetailPolicy,
  IResponsePolicy,
  IResponsePolicyMeta,
} from "@/interfaces/models/IPolicy.interfaces";

export async function getAll() {
  const result = await api<IResponsePolicy>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.POLICY}/${CONST_APIS_COMMON.GET_ALL}`,
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
  const result = await api<IResponseDetailPolicy>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.POLICY}/${payload}`,
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
  const result = await api<IResponsePolicyMeta>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.POLICY}/${CONST_APIS_COMMON.META}/${slug}`,
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
