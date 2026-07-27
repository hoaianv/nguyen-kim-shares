import { IBreadcrumb, IPagination } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface IService {
  id: number;
  title: string;
  picture: string;
  url: string;
}
export interface IServiceMeta {
  title: string;
  description: string;

  alternates?: {
    canonical?: string;
  };

  openGraph?: {
    title: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    type?: "website" | "profile" | "article";
  };

  robots?: {
    index: boolean;
    follow: boolean;
  };

  twitter?: {
    card?: "summary_large_image" | "summary";
    title?: string;
    description?: string;
    images?: string[];
  };
}
export interface IServiceDetail extends IService {
  createdAt: string;
  updatedAt: string;
  description: string;
}
export type IResponseServiceMeta = IResponse<IServiceMeta>;

export type IResponseDetailService = IResponse<{
  items: IServiceDetail;
  breadcrumb: IBreadcrumb[];
}>;

export type IResponseService = IResponse<{
  items: IService[];
  pagination: IPagination;
}>;
