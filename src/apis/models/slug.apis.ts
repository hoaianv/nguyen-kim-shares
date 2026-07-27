"use server";

import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";
import {
  IResponseSlug,
  IResponseSlugMeta,
} from "@/interfaces/models/ISlug.interface";

export async function findOne(slug: string) {
  const result = await api<IResponseSlug>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.SLUG}/${CONST_APIS_COMMON.CHECK_SLUGS}?slug=${slug}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getSlugMeta(slug: string) {
  const result = await api<IResponseSlugMeta>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.SLUG}/${CONST_APIS_COMMON.CHECK_META}/${slug}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}
