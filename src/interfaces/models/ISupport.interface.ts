import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface ISupport {
  id: number;
  title: string;
  email: string;
  phone: number;
}
export type SupportGroups = Record<string, ISupport[]>;
export type IResponseSupport = IResponse<SupportGroups>;
