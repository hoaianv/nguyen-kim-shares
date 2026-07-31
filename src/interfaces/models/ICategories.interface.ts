import { IBreadcrumb, IPagination } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";
import { IProduct } from "@/interfaces/models/IProduct.interface";
import type { ICustomerNeeds } from "@/interfaces/models/ICategoryDetail.interface";

export interface ICategory {
  id: number;
  title: string;
  picture: string;
  banner: string;
  description?: string | null;
  url: string;
  children?: ICategory[];
}
export interface ICategoryExtended extends ICategory {
 color:  string;
}
export interface ICategoryMeta {
  title: string;
  description: string;

  alternates: {
    canonical: string;
  };

  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    type: string;
  };

  robots: {
    index: boolean;
    follow: boolean;
    googleBot?: {
      index: boolean;
      follow: boolean;
      "max-image-preview": "none" | "standard" | "large";
      "max-video-preview": number;
      "max-snippet": number;
    };
  };

  twitter: {
    card: "summary_large_image" | "summary" | string;
    title: string;
    description: string;
    images: string[]; // URL ảnh
  };

  breadcrumb: IBreadcrumb[];
}
export interface ICategorySchema {
  categoryId: number;
  collectionPage: {
    "@context": "https://schema.org";
    "@type": "CollectionPage";
    name: string;
    description: string;
    url: string;
    image?: string[];
    inLanguage: string;
    isPartOf: {
      "@type": "WebSite";
      name: string;
      url: string;
    };
    breadcrumb: { "@id": string };
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

export interface ICategoryCustomerNeed extends ICustomerNeeds {
  items: IProduct[];
}

export interface ICategoriesProducts extends ICategoryExtended {
  customerNeeds?: ICategoryCustomerNeed[];
}

export interface ICategoryProductSearch {
  pagination: IPagination;
  items: IProduct[];
}

export type ICategorySchemaResponse = IResponse<{
  categoryId?: number;
  category: ICategorySchema;
}>;

export type IResponseCategory = IResponse<ICategory[]>;
export type IResponseCategoriesProducts = IResponse<ICategoriesProducts[]>;
export type IResponseCategoryProductSearch = IResponse<ICategoryProductSearch>;
