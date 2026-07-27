import { IBreadcrumb, IPagination } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface ICategoryNews {
  id: number;
  title: string;
  picture?: string;
  banner?: string;
  description: string;
  url: string;
}
export interface INews {
  id: number;
  title: string;
  slug: string;
  views: number;
  picture?: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDetailNews extends INews {
  description: string;
}

export interface INewsMeta {
  title: string;
  description: string;
  alternates: {
    canonical: string;
  };
  openGraph: {
    title: string;
    description?: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    type: "article";
    article: {
      publishedTime: string;
      modifiedTime?: string;
      expirationTime?: string;
      authors?: string[];
      section?: string;
      tags?: string[];
    };
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
    images: string[];
  };
}

export interface INewsSchema {
  newsId: number;
  newsArticle: {
    "@context": "https://schema.org";
    "@type": "NewsArticle";
    mainEntityOfPage: {
      "@type": "WebPage";
      "@id": string; // URL của bài viết
    };
    headline: string;
    name: string;
    description: string;
    image: string;
    inLanguage: string;
    articleSection: string;
    datePublished: string; // ISO string
    dateModified: string; // ISO string
    url: string;
    isAccessibleForFree: boolean;
    author: {
      "@type": "Organization";
      name: string;
    };
    publisher: {
      "@type": "Organization";
      name: string;
      logo: {
        "@type": "ImageObject";
        url: string;
      };
    };
    isPartOf: {
      "@type": "WebSite";
      name: string;
      url: string;
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
    "@id": string; // URL + #breadcrumb
    itemListElement: Array<{
      "@type": "ListItem";
      position: number;
      name: string;
      item: string; // URL hoặc slug
    }>;
  };
}

export type ICategoryNewsResponse = IResponse<ICategoryNews[]>;

export type IResponseNews = IResponse<{
  News: INews;
  breadcrumb: IBreadcrumb[];
}>;

export type IResponseListNews = IResponse<{
  items: INews[];
  pagination: IPagination;
}>;

export type IResponseNewsSchema = IResponse<{
  newsId: number;
  news: INewsSchema;
}>;

export type IResponseNewsCommon = IResponse<INews[]>;
