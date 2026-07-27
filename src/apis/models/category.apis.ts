"use server";

import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { api } from "@/helpers/api.helper";
import { CONST_METHODS } from "@/constants/methods.constant";
import {
  ICategorySchemaResponse,
  IResponseCategory,
  IResponseCategoryProductSearch,
} from "@/interfaces/models/ICategories.interface";

export async function getSchema(payload: string) {
  const result = await api<ICategorySchemaResponse>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.CATEGORY}/${CONST_APIS_COMMON.SCHEMA}/${payload}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function categoryParentList() {
  const result = await api<IResponseCategory>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.CATEGORY}/${CONST_APIS_COMMON.GET_PARENT}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function productSearch(payload: string) {
  const result = await api<IResponseCategoryProductSearch>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PRODUCT}/${CONST_APIS_COMMON.FILTER}?${payload}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}
