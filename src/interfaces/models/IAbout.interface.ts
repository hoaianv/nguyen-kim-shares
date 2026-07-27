import { IBreadcrumb } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface IAbout {
  id: number;
  title: string;

  url: string;
  createdAt: string;
  updatedAt: string;
}
export interface IDetailAbout extends IAbout {
  description: string;
}

export interface IAboutMeta {
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
export type IResponseAboutMeta = IResponse<IAboutMeta>;

export type IResponseAbout = IResponse<IAbout[]>;
export type IResponseDetailAbout = IResponse<{
  items: IDetailAbout;

  breadcrumb: IBreadcrumb[];
}>;
