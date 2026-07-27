import { IPagination } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";
import { IProduct } from "@/interfaces/models/IProduct.interface";

export interface IFavorite {
  type: string;
  isFavorite: boolean;
}

export interface IProductsFavorite {
  items: IProduct[];
  pagination: IPagination;
}

export type IResponseToggleFavorite = IResponse<IFavorite>;

export type IResponseProductsFavorite = IResponse<IProductsFavorite>;
