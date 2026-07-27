"use server";
import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";

import {
  IResponseDetailAdvise,
  IResponseAdvise,
  IResponseFaqs,
  IPayloadFaqs,
  IResponseCreateFaqs,
} from "@/interfaces/models/IAdvise.interfaces";
import { revalidateTag } from "next/cache";
const ADVISE_TAG = "advise";

export async function getAll() {
  const result = await api<IResponseAdvise>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.ADVISE}/${CONST_APIS_COMMON.GET_ALL}`,
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
  const result = await api<IResponseDetailAdvise>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.ADVISE}/${payload}`,
    options: {
      method: CONST_METHODS.GET,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: {
        tags: [ADVISE_TAG],
      },
    },
  });

  return result;
}

export async function getList() {
  const result = await api<IResponseFaqs>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.ADVISE}/${CONST_APIS_COMMON.GET_LIST}`,
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

export async function create(payload: IPayloadFaqs) {
  const result = await api<IResponseCreateFaqs>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.FAQS}/${CONST_APIS_COMMON.ADD}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(ADVISE_TAG);

  return result;
}
