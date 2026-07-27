import { IResponse } from "@/interfaces/common/IResponse.interface";
import { IProduct } from "@/interfaces/models/IProduct.interface";

export interface IMenu {
  id: number;
  title: string;
  picture: string;
  banner: string;
  description: string;
  url: string;
  children?: IMenu[];
}

export interface IMenuNode {
  catId: number;
  name: string;
  url: string;
  active: boolean;
  children?: IMenuNode[];
  products?: IProduct[];
}

export type IResponseMenu = IResponse<IMenu[]>;
export type IResponseCategoryTree = IResponse<IMenuNode[]>;
