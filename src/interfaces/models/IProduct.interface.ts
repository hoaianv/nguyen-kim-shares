import { IBaseProduct, IPagination } from '@/interfaces/common';
import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface IProductNotifyRegister {
  fullname: string;
  phone: string;
  email: string;
  address: string;
}

export interface IPresent {
  id: number;
  title: string;
  description: string;
}

export interface ICouponDes {
  id: number;
  code: string;
  remain: number;
}

export interface ICoupon {
  id: number;
  title: string;
  description: string;
  value: number;
  endDate: string;
  productCode: string;
  couponDes?: ICouponDes[];
}

export interface IProduct extends IBaseProduct {
  present?: IPresent;
  coupon?: ICoupon[];
}

export interface IProperties {
  id: number;
  name: string;
  description: string;
}

export interface IDescription {
  description: string;
}

export interface ProductMeta
  extends Pick<
    IProduct,
    | "name"
    | "productCode"
    | "url"
    | "price"
    | "marketPrice"
    | "rating"
    | "picture"
  > {
  brand?: string;
  shortDesc?: string;
  metaKey?: string;
  metaDesc?: string;
  description?: string;
}
export type ISearchProduct = {
  items: IProduct[];
  pagination: IPagination;
  message: string;
};

export type IProductsViewed = {
  items: IProduct[];
  pagination: IPagination;
};

export interface IProductMeta {
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
    card: string;
    title: string;
    description: string;
    images: string[];
  };
}

export interface IProductSchema {
  productId: number;
  product: {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    image: string[];
    sku: string;
    offers: {
      "@type": string;
      url: string;
      priceCurrency: string;
      price: string;
      availability: string;
      itemCondition: string;
      seller: {
        "@type": string;
        name: string;
        url: string;
      };
    };
    aggregateRating: {
      "@type": string;
      ratingValue: number;
      reviewCount: number;
    };
  };
  breadcrumb: {
    "@context": string;
    "@type": string;
    itemListElement: Array<{
      "@type": string;
      position: number;
      name: string;
      item: string;
    }>;
  };
}

export interface ICompareProduct {
  id: number;
  name: string;
  productCode: string;
  url: string;
  brand: string;
  price: number;
  isFavorite: boolean;
  marketPrice: number;
  isInStock: boolean;
  rating: number;
  picture: string;
  isCompare: boolean;
  specs: IProperties[];
}

export type IResponseBestSeller = IResponse<{
  title: string;
  items: IProduct[];
  pagination: IPagination;
}>;

export type IResponseProductSchema = IResponse<IProductSchema>;

export type IResponseSearchProduct = IResponse<ISearchProduct>;
export type IResponseCompareProducts = IResponse<ICompareProduct[]>;

export type IResponseProduct = IResponse<IProduct>;
export type IResponseProductProperties = IResponse<IProperties[]>;
export type IResponseProductDescription = IResponse<IDescription>;
export type IResponseProductRelated = IResponse<IProduct[]>;

export type IResponseProductsHot = IResponse<IProduct[]>;

  
export type IResponseProductsRecommend = IResponse<IProduct[]>;
export type IResponseProductsFlashSale = IResponse<IProduct[]>;
export type IResponseProductsViewed = IResponse<IProductsViewed>;
