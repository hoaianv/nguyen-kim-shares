export interface IBrand {
  brandId: string;
  title: string;
  slug: string;
  picture: string;
}

export interface IRangePrice {
  minPrice: number;
  maxPrice: number;
}

export interface ICustomerNeeds {
  id: number;
  title: string;
  description: string;
  url: string;
  picture: string;
}

export interface ISubCateOption {
  id: number;
  title: string;
  url: string;
}

export interface IOptionsDetail {
  id: number;
  title: string;
  slug: string;
  subCateOption: ISubCateOption[];
}
