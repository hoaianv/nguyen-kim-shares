import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface IContact {
  name: string;
  email?: string;
  address?: string;
  phone: string;
  staffId: string;
  subject: string;
  content: string;
}

export interface IContactCategory {
  id: number;
  title: string;
  email?: string;
  phone?: string;
  description?: string;
}

export type IPayloadContact = IContact;

export type IResponseContact = IResponse<IContact>;
export type IResponseContactCategory = IResponse<IContactCategory[]>;
