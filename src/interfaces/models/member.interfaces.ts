import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface IMember {
  id: number;
  username: string;
  email: string;
  address: string;
  fullName: string;
  avatar: string;
  phone: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  companyName: string;
  taxCode: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  customerCode: string;
  district: string | null;
  ward: string | null;
  cityProvince: string;
  status: number;
  accumulatedPoints: number;
}
export interface IPayloadLogin {
  username: string;
  password: string;
}

export interface IPayloadForgetPassword {
  email: string;
}

export interface IPayloadChangePassword {
  password: string;
  passwordConfirm: string;
}

// types/member.ts
export type IMemberUpdatePayload = {
  fullName: string;
  phone: string;
  email: string;
  gender: "male" | "female" | "other";
  dateOfBirth?: string | null;
};
export type IResponseLogin = IResponse<{
  member: IMember;
  token: string;
}>;

export type IResponseGetMe = IResponse<IMember>;
export type IResponseCheckToken = IResponse<{
  auth: boolean;
}>;

export interface IPayloadRegister {
  username: string;
  password: string;
  password_confirmation?: string;
  name: string;
  email: string;
  phone: string;
}

export type IResponseGoogleCallback = IResponse<{
  token: string;
  member: IMember;
}>;

export type IResponseGoogleAuthUrl = IResponse<{
  url: string;
}>;

export type IResponseRegister = IResponse<IMember>;
export type IResponseLogout = IResponse<{}>;
export type IResponseUpdate = IResponse<IMember>;
