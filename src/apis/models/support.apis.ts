import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";
import { IResponseSupport } from "@/interfaces/models/ISupport.interface";

export async function getAll() {
  const result = await api<IResponseSupport>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.SUPPORT}/${CONST_APIS_COMMON.GET_ALL}`,
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
