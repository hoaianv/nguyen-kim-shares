import { IBreadcrumb, IPagination } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface IHirePost {
  id: number;
  name: string;
  salary: string;
  address: string;
  experience: string;
  deadline: string;
  information: string;
  position: string;
  quantity: string;
  form: string;
  degree: string;
  slug: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRecruitmentPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  cv: File;
  fileInfo: File;
}

export interface IHirePost {
  id: number;
  name: string;
}

export interface IJobApplication {
  id: number;
  name: string;
  gmail: string;
  phone: string;
  cv: string | null;
  fileInfo: string | null;
  message: string;
  createdAt: string | null;
  updatedAt: string | null;

  hirePost?: IHirePost;
}
export interface IHireMeta {
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
    article?: {
      publishedTime?: string;
      modifiedTime?: string;
    };
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

export type IResponseApplyRecruitment = IResponse<IJobApplication>;

export interface ICategoryRecruitment {
  id: number;
  name: string;
  url: string;
}
export type IResponseRecruitment = IResponse<{
  items: IHirePost[];
  pagination: IPagination;
}>;

export type IResponseDetailRecruitment = IResponse<{
  items: IHirePost;
  breadcrumb: IBreadcrumb[];
}>;

export type IResponseCategoryRecruitment = IResponse<ICategoryRecruitment[]>;
export type IResponseRelatedRecruitment = IResponse<IHirePost[]>;
export type IResponseHireMeta = IResponse<IHireMeta>;
