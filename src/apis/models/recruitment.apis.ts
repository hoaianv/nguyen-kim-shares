"use server";
import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";
import {
  IRecruitmentPayload,
  IResponseApplyRecruitment,
  IResponseCategoryRecruitment,
  IResponseDetailRecruitment,
  IResponseHireMeta,
  IResponseRecruitment,
  IResponseRelatedRecruitment,
} from "@/interfaces/models/IRecruitment.interfaces";

export async function getAll(page: string, category?: string, search?: string) {
  const query = new URLSearchParams({
    page,
    ...(category && { catSlug: category }),
    ...(search && { name: search }),
  });
  const result = await api<IResponseRecruitment>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.RECRUITMENT}/${CONST_APIS_COMMON.GET_ALL}?${query}`,
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

export async function getCategory() {
  const result = await api<IResponseCategoryRecruitment>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.RECRUITMENT}/${CONST_APIS_COMMON.GET_CATEGORY}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function findOne(slug: string) {
  const result = await api<IResponseDetailRecruitment>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.RECRUITMENT}/${slug}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function findRelated(slug: string) {
  const result = await api<IResponseRelatedRecruitment>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.RECRUITMENT}/${CONST_APIS_COMMON.RELATED}/${slug}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function create(payload: FormData) {
  const result = await api<IResponseApplyRecruitment>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.RECRUITMENT}/${CONST_APIS_COMMON.ADD}`,
    options: {
      method: CONST_METHODS.POST,
      body: payload,
      headers: {
        Accept: "application/json",
      },
    },
  });

  return result;
}

export async function getMeta(slug: string) {
  const result = await api<IResponseHireMeta>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.RECRUITMENT}/${CONST_APIS_COMMON.META}/${slug}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}
