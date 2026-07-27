import { IPagination } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface IPromotion {
  id: number;
  title: string;
  slug: string;
  picture?: string;
  endDate: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPromotionSchema {
  promotionSchema: {
    "@context": "https://schema.org";
    "@type": "SpecialAnnouncement";
    mainEntityOfPage: {
      "@type": "WebPage";
      "@id": string; // URL trang khuyến mãi
    };
    name: string;
    headline: string;
    description: string;
    image: string;
    inLanguage: string;
    url: string;
    isAccessibleForFree: boolean;
    publisher: {
      "@type": "Organization";
      name: string;
      logo: {
        "@type": "ImageObject";
        url: string;
      };
    };
    eventSchedule: {
      "@type": "Schedule";
      startDate: string; // ISO string
      endDate: string; // ISO string
    };
    identifier: {
      "@type": "PropertyValue";
      name: string;
      value: number;
    };
  };
  breadcrumb: {
    "@context": "https://schema.org";
    "@type": "BreadcrumbList";
    "@id": string;
    itemListElement: Array<{
      "@type": "ListItem";
      position: number;
      name: string;
      item: string; // URL
    }>;
  };
}

export interface IDetailPromotion extends IPromotion {
  description: string;
}

export type IResponseListPromotion = IResponse<{
  items: IPromotion[];
  pagination: IPagination;
}>;
export type IResponsePromotionCommon = IResponse<IPromotion[]>;

export type IResponsePromotionSchema = IResponse<IPromotionSchema>;
