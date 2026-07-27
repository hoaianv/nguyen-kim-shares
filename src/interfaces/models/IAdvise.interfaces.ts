import { IBreadcrumb } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface IAdvise {
  id: number;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}
export interface IFaq {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPayloadFaqs {
  fullName: string;
  email: string;
  catId: string;
  content: string;
}

export type IResponseCreateFaqs = IResponse<IFaq>;

export type IResponseAdvise = IResponse<IAdvise[]>;
export type IResponseDetailAdvise = IResponse<{
  items: {
    faqs: IFaq[] | [];
    advise: IAdvise;
  };
  breadcrumb: IBreadcrumb[];
}>;

export type IResponseFaqs = IResponse<{
  title: string;
  faqs: IFaq[] | [];
  breadcrumb: IBreadcrumb[];
}>;
