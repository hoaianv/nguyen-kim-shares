"use server";
import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";

import {
  IContact,
  IResponseContact,
  IResponseContactCategory,
} from "@/interfaces/models/IContact.interface";

export async function getAll() {
  const result = await api<IResponseContactCategory>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.CONTACT}/${CONST_APIS_COMMON.GET_CATEGORY}`,
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

export async function create(payload: IContact) {
  const result = await api<IResponseContact>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.CONTACT}/${CONST_APIS_COMMON.ADD}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload),
    },
  });

  return result;
}
