"use server";
import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";

import {
  IPayloadQuote,
  IResponseQuote,
} from "@/interfaces/models/IQuote.interfaces";
import { revalidateTag } from "next/cache";
const ADVISE_TAG = "advise";

export async function create(payload: IPayloadQuote) {
  const result = await api<IResponseQuote>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.QUOTE}/${CONST_APIS_COMMON.ADD}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(ADVISE_TAG);

  return result;
}
