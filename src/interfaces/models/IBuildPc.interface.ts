import { IPagination } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";
import { ICartItem } from "@/interfaces/models/ICart.interfaces";
import { IProduct } from "@/interfaces/models/IProduct.interface";

export interface IBrand {
  id: number;
  title: string;
  picture: string;
  url: string;
}

export interface IBuildPcCategory {
  id: number;
  title: string;
  picture: string;
  url: string;
  brand: IBrand[];
}

export type IDataBuildPc = {
  [key: string]: ICartItem;
};

export interface IAccessories {
  pagination: IPagination;
  items: IProduct[];
}

export interface IItemConfigPc {
  productId: number;
  quantity: number;
}

export interface IPayloadExport {
  items: IItemConfigPc[];
}

export type IResponseBuildPcCategory = IResponse<IBuildPcCategory[]>;
export type IResponseAccessories = IResponse<IAccessories>;
