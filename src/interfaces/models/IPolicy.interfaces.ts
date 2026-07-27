import { IBreadcrumb } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface IPolicy {
  id: number;
  title: string;

  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPolicyMeta {
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
export interface IDetailPolicy extends IPolicy {
  description: string;
}
export type IResponsePolicyMeta = IResponse<IPolicyMeta>;

export type IResponsePolicy = IResponse<IPolicy[]>;
export type IResponseDetailPolicy = IResponse<{
  items: IDetailPolicy;
  breadcrumb: IBreadcrumb[];
}>;
