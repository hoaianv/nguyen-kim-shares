import type {
  IBrand,
  IOptionsDetail,
  IRangePrice,
  ICustomerNeeds,
} from "./ICategoryDetail.interface";
import { IDetailNews, INewsMeta } from "./INews.interface";
import { IBreadcrumb } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";
import { ICategoryMeta } from "@/interfaces/models/ICategories.interface";
import {
  IProduct,
  IProductMeta,
  IProductSchema,
} from "@/interfaces/models/IProduct.interface";
import { IDetailPromotion } from "@/interfaces/models/IPromotion.interface";

export enum ESlug {
  Product = "product",
  Category = "category",
  News = "news",
  Promotion = "promotion",
}

export enum ESlugType {
  Brand = "thuong-hieu",
  Demand = "nhu-cau",
  MinPrice = "minPrice",
  MaxPrice = "maxPrice",
  Sort = "sort",
}

type ProductResponse = {
  type: ESlug.Product;
  breadcrumb: IBreadcrumb[];
  items: IProduct;
};

type NewsResponse = {
  type: ESlug.News;
  breadcrumb: IBreadcrumb[];
  items: IDetailNews;
};
type PromotionResponse = {
  type: ESlug.Promotion;
  breadcrumb: IBreadcrumb[];
  items: IDetailPromotion;
};

type CategoryResponse = {
  type: ESlug.Category;
  nameCategory: string;
  breadcrumb: IBreadcrumb[];
  listBrand: IBrand[];
  rangePrice: IRangePrice;
  option: IOptionsDetail[];
  customerNeeds?: ICustomerNeeds[];
};

export type SlugData =
  | ProductResponse
  | NewsResponse
  | CategoryResponse
  | PromotionResponse;

type ProductMetaResponse = {
  type: ESlug.Product;
  meta: IProductMeta;
};
type NewsMetaResponse = {
  type: ESlug.News;
  meta: INewsMeta;
};
type PromotionMetaResponse = {
  type: ESlug.Promotion;
  meta: INewsMeta;
};
type CategoryMetaResponse = {
  type: ESlug.Category;
  meta: ICategoryMeta;
};
export type SlugMetaData =
  | ProductMetaResponse
  | CategoryMetaResponse
  | NewsMetaResponse
  | PromotionMetaResponse;

export type IResponseSlug = IResponse<SlugData>;
export type IResponseSlugMeta = IResponse<SlugMetaData>;
