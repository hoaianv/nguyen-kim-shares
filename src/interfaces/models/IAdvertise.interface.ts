import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface IAdvertise {
  id: number;
  title: string;
  picture: string;
  positionId: number;
  width: number;
  height: number;
  link: string;
  target: string;
  description: string;
  order: number;
}

export interface IAdPosition {
  quantity: number;
  id: number;
  title: string;
  url: string;
  description: string;
  order: number;
  advertises: IAdvertise[];
}

export type IAdvertiseResponse = IResponse<{
  [key: string]: IAdPosition;
}>;
