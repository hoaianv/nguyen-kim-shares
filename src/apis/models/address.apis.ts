"use server";

import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { api } from "@/helpers/api.helper";
import { CONST_METHODS } from "@/constants/methods.constant";
import {
  IAddressResponse,
  ICreateAddressResponse,
  IPayloadAddress,
} from "@/interfaces/models/IAddress.interface";
import { revalidateTag } from "next/cache";

const ADDRESS_TAG = "addresses";

export async function getAll() {
  const result = await api<IAddressResponse>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.ADDRESS}/${CONST_APIS_COMMON.GET_ALL}`,
    options: {
      method: CONST_METHODS.GET,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: {
        tags: [ADDRESS_TAG],
      },
    },
  });

  return result;
}

export async function create(payload: IPayloadAddress) {
  const result = await api<ICreateAddressResponse>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.ADDRESS}/${CONST_APIS_COMMON.ADD}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(ADDRESS_TAG);

  return result;
}

export async function update(id: number, payload: IPayloadAddress) {
  const result = await api<ICreateAddressResponse>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.ADDRESS}/${CONST_APIS_COMMON.UPDATE}/${id}`,
    options: {
      method: CONST_METHODS.PUT,
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(ADDRESS_TAG);

  return result;
}

export async function remove(id: number) {
  const result = await api<ICreateAddressResponse>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.ADDRESS}/${CONST_APIS_COMMON.DELETE}/${id}`,
    options: {
      method: CONST_METHODS.DELETE,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });
  revalidateTag(ADDRESS_TAG);

  return result;
}
