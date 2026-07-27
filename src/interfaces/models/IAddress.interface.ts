import { IResponse } from "@/interfaces/common/IResponse.interface";
interface IBaseAddress {
  name: string;
  phone: string;
  email: string;
  address: string;
  isDefault: boolean;
}

export interface IAddress extends IBaseAddress {
  id: number;
}

export type IPayloadAddress = IBaseAddress;

export type ICreateAddressResponse = IResponse<IAddress>;
export type IAddressResponse = IResponse<IAddress[]>;
