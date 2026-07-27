import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface IQuote {
  name: string;
  phone: string;
  email: string;
  company: string;
  address: string;
  content: string;
}

export type IPayloadQuote = IQuote;

export type IResponseQuote = IResponse<IQuote>;
