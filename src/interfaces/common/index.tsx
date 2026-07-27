import { ICONS } from "@/constants";
import { LucideIcon } from "lucide-react";

export interface IBreadcrumb {
  name: string;
  url: string;
}
export type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
};

export type LayoutProps = {
  params: { slug: string };
};

export interface ISearch {
  keyword: string;
  page: number;
}

export interface IPagination {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage?: number;
}

export type ButtonVariant =
  | "white"
  | "ink"
  | "orange"
  | "transparent"
  | "blue";
export interface IParams {
  key: string;
  value: string;
}
export interface IImage {
  id: number;
  src: string;
  width: number;
  height: number;
}

export interface MenuItem {
  label: string;
  value: string;
  icon: LucideIcon;
  hasPopup?: boolean;
  link?: string;
  renderPopup?: () => React.ReactNode;
  renderItem?: () => React.ReactNode;
}

export interface IBaseProduct {
  id: number;
  name: string;
  name2: string;
  productCode: string;
  isFavorite: boolean;
  url: string;
  price: number;
  marketPrice?: number;
  isInStock: boolean;
  rating?: number;
  picture: string;
  images: IImage[];
  isCompare?: boolean;
  gift?: string;
  brand?: string;
  technology?: ITechnology[];
  warranty?: string;
}

export interface ITechnology {
  id: number;
  title: string;
  description: string;
}

export interface Column<T> {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

export type NavAccountLinkItem = {
  key: string;
  label: string;
  href: string;
  icon: keyof typeof ICONS;
};
