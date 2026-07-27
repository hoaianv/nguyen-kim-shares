"use server";
import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";
import {
  IPayloadExport,
  IResponseAccessories,
  IResponseBuildPcCategory,
} from "@/interfaces/models/IBuildPc.interface";

const BUILD_PC_TAG = "build_pc";

export async function getAll() {
  const result = await api<IResponseBuildPcCategory>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.BUILD_PC}/${CONST_APIS_COMMON.GET_ALL}`,
    options: {
      method: CONST_METHODS.GET,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: {
        tags: [BUILD_PC_TAG],
      },
    },
  });

  return result;
}

export async function getAccessories(url: string, payload: any) {
  const query = new URLSearchParams({
    ...payload,
  }).toString();

  const result = await api<IResponseAccessories>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.BUILD_PC}/${CONST_APIS_COMMON.FILTER}?url=${url}&${query}`,
    options: {
      method: CONST_METHODS.GET,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: {
        tags: [BUILD_PC_TAG],
      },
    },
  });

  return result;
}
