"use server";
import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";
import { IResponse } from "@/interfaces/common/IResponse.interface";
import { IResponseCategoriesProducts } from "@/interfaces/models/ICategories.interface";
import {
  IProductNotifyRegister,
  IResponseBestSeller,
  IResponseCompareProducts,
  IResponseProductDescription,
  IResponseProductProperties,
  IResponseProductRelated,
  IResponseProductSchema,
  IResponseProductsHot,
  IResponseProductsRecommend,
  IResponseProductsViewed,
  IResponseSearchProduct,
} from "@/interfaces/models/IProduct.interface";

export async function productNotifyRegister(
  data: IProductNotifyRegister,
  slug: string
) {
  const result = await api<IResponse>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PRODUCT}/${CONST_APIS_COMMON.PRODUCT_NOTIFY_REGISTER}/${slug}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(data),
    },
  });

  return result;
}

export async function getProductsHot() {
  const result = await api<IResponseProductsHot>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PRODUCT}/${CONST_APIS_COMMON.PRODUCT_HOT}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}
export async function getCategoriesProducts() {
  const result = await api<IResponseCategoriesProducts>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PRODUCT}/${CONST_APIS_COMMON.PRODUCT_BY_CATEGORY}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getProductsRecommend() {
  const result = await api<IResponseProductsRecommend>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PRODUCT}/${CONST_APIS_COMMON.PRODUCT_RECOMMEND}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}
export async function getProductProperties(slug: string) {
  const result = await api<IResponseProductProperties>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PRODUCT}/${CONST_APIS_COMMON.GET_PROPERTIES_PRODUCT}/${slug}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getProductDescription(slug: string) {
  const result = await api<IResponseProductDescription>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PRODUCT}/${CONST_APIS_COMMON.GET_DESCRIPTION}/${slug}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}
export async function getProductRelated(slug: string) {
  const result = await api<IResponseProductRelated>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PRODUCT}/${CONST_APIS_COMMON.GET_RELATED_PRODUCT}/${slug}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function searchProducts(slug: string, page?: number) {
  const params = new URLSearchParams();
  if (slug) params.append("q", slug);
  if (page) params.append("page", page.toString());

  const result = await api<IResponseSearchProduct>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PRODUCT}/${CONST_APIS_COMMON.SEARCH}?${params.toString()}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getProductsViewed(page?: string, perPage?: string) {
  const result = await api<IResponseProductsViewed>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PRODUCT}/${CONST_APIS_COMMON.PRODUCTS_VIEWED}?page=${page}&perPage=${perPage}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getSchema(slug?: string) {
  const result = await api<IResponseProductSchema>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PRODUCT}/${CONST_APIS_COMMON.SCHEMA}/${slug}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getCompare(slug: string) {
  const result = await api<IResponseCompareProducts>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PRODUCT}/${CONST_APIS_COMMON.COMPARE}/${slug}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}

export async function getBestSeller(q?: string, page?: string) {
  const params = new URLSearchParams();

  if (q) params.append("q", q);
  if (page) params.append("page", page.toString());

  const result = await api<IResponseBestSeller>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.PRODUCT}/${
      CONST_APIS_COMMON.BEST_SELLERS
    }?${params.toString()}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });

  return result;
}
