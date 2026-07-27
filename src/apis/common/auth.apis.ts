"use server";

import { cookies } from "next/headers";
import { api } from "../../helpers/api.helper";

import { CONST_APIS, CONST_APIS_COMMON } from "../../constants/apis.constant";
import { CONST_VALUES } from "../../constants/values.constant";
import { CONST_METHODS } from "../../constants/methods.constant";
import {
  IMemberUpdatePayload,
  IPayloadChangePassword,
  IPayloadForgetPassword,
  IPayloadLogin,
  IPayloadRegister,
  IResponseCheckToken,
  IResponseGetMe,
  IResponseGoogleAuthUrl,
  IResponseGoogleCallback,
  IResponseLogin,
  IResponseLogout,
  IResponseRegister,
  IResponseUpdate,
} from "@/interfaces/models/member.interfaces";
import { getValidData } from "@/lib/utils";
import { IResponse } from "@/interfaces/common/IResponse.interface";

const USER = "USER";

export async function setAuthCookie(token?: string) {
  if (!token) return;
  cookies().set(CONST_VALUES.TOKEN, token, {
    httpOnly: true,
    // secure: true,
    maxAge: 30 * 24 * 60 * 60, // 30 ngày
    path: "/",
  });
}

export async function login(payload: IPayloadLogin) {
  const result = await api<IResponseLogin>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.AUTH.LOGIN}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload),
    },
  });
  const isValid = getValidData(result);
  if (isValid) {
    setAuthCookie(isValid?.token);
  }
  return result;
}

export async function forgetPassword(payload: IPayloadForgetPassword) {
  const result = await api<IResponse<{}>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.AUTH.FORGET_PASSWORD}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload),
    },
  });
  return result;
}

export async function resetPassword(
  payload: IPayloadChangePassword,
  token: string,
  email: string
) {
  const result = await api<IResponse<{}>>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.AUTH.RESET_PASSWORD}?token=${token}&email=${email}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload),
    },
  });
  return result;
}

export async function getMe() {
  const result = await api<IResponseGetMe>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS_COMMON.ME}`,
    options: {
      method: CONST_METHODS.GET,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: {
        tags: [USER],
      },
    },
  });

  return result;
}

export async function register(payload: IPayloadRegister) {
  const result = await api<IResponseRegister>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.AUTH.REGISTER}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload),
    },
  });
  return result;
}

export async function logout() {
  const result = await api<IResponseLogout>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.AUTH.LOGOUT}`,
    options: {
      method: CONST_METHODS.POST,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });

  cookies().delete(CONST_VALUES.TOKEN);

  return result;
}

export async function update(payload: IMemberUpdatePayload) {
  const result = await api<IResponseUpdate>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS_COMMON.UPDATE}`,
    options: {
      method: CONST_METHODS.PUT,
      body: JSON.stringify(payload),
    },
  });

  return result;
}
export async function checkToken() {
  const result = await api<IResponseCheckToken>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS_COMMON.CHECK_TOKEN}`,
    options: {
      method: CONST_METHODS.GET,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });

  return result;
}

export async function getGoogleAuthUrl() {
  const result = await api<IResponseGoogleAuthUrl>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.AUTH.AUTH}/${CONST_APIS_COMMON.GOOGLE}`,
    options: {
      method: CONST_METHODS.GET,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });

  return result;
}

export async function handleGoogleCallback() {
  const result = await api<IResponseGoogleCallback>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.AUTH.AUTH}/${CONST_APIS_COMMON.GOOGLE}/${CONST_APIS_COMMON.CALLBACK}`,
    options: {
      method: CONST_METHODS.GET,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });

  const isValid = getValidData(result);
  if (isValid) {
    setAuthCookie(isValid?.token);
  }
  return result;
}
