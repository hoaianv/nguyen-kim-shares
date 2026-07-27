"use server";
import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";
import {
  IResponseToggleFavorite,
  IResponseProductsFavorite,
} from "@/interfaces/models/IFavorite.interface";

export async function getAll(page?: string, perPage?: string) {
  const result = await api<IResponseProductsFavorite>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.FAVORITES}/${CONST_APIS_COMMON.GET_ALL}?page=${page}&perPage=${perPage}`,
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

export async function toggle(id: number) {
  const result = await api<IResponseToggleFavorite>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.FAVORITES}/${CONST_APIS_COMMON.TOGGLE}/${id}`,
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
