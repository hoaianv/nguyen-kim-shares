"use server";

import { CONST_APIS, CONST_APIS_COMMON } from "@/constants/apis.constant";
import { CONST_METHODS } from "@/constants/methods.constant";
import { api } from "@/helpers/api.helper";
import {
  IEventCheckinFilter,
  IEventCheckinGuestPayload,
  IResponseEventCheckinBulkDelete,
  IResponseEventCheckinDetail,
  IResponseEventCheckinList,
  IResponseEventCheckinMutate,
} from "@/interfaces/models/IEventCheckin.interface";

const BASE = `${CONST_APIS.SERVER_URL}/${CONST_APIS.FEATURES.MODEL.EVENT_CHECKIN}`;

export async function getEventCheckinList(filter: IEventCheckinFilter) {
  const params = new URLSearchParams();
  if (filter.status) params.set("status", filter.status);
  if (filter.q) params.set("q", filter.q);
  if (filter.page) params.set("page", filter.page);
  if (filter.perPage) params.set("perPage", filter.perPage);

  const result = await api<IResponseEventCheckinList>({
    url: `${BASE}?${params.toString()}`,
    options: { method: CONST_METHODS.GET },
  });
  return result;
}

export async function getEventCheckinDetail(id: number) {
  const result = await api<IResponseEventCheckinDetail>({
    url: `${BASE}/${id}`,
    options: { method: CONST_METHODS.GET },
  });
  return result;
}

export async function createEventCheckinGuest(data: IEventCheckinGuestPayload) {
  const result = await api<IResponseEventCheckinMutate>({
    url: `${BASE}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify(data),
    },
  });
  return result;
}

export async function updateEventCheckinGuest(
  id: number,
  data: IEventCheckinGuestPayload,
) {
  const result = await api<IResponseEventCheckinMutate>({
    url: `${BASE}/${id}`,
    options: {
      method: CONST_METHODS.POST, // Backend uses method override
      body: JSON.stringify({ ...data, _method: "PUT" }),
    },
  });
  return result;
}

export async function deleteEventCheckinGuest(id: number) {
  const result = await api<IResponseEventCheckinBulkDelete>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS_COMMON.PARTICIPANTS_DELETE}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify({ _method: "DELETE", ids: [id] }),
    },
  });
  return result;
}

export async function bulkDeleteEventCheckinGuests(ids: number[]) {
  const result = await api<IResponseEventCheckinBulkDelete>({
    url: `${CONST_APIS.SERVER_URL}/${CONST_APIS_COMMON.PARTICIPANTS_DELETE}`,
    options: {
      method: CONST_METHODS.POST,
      body: JSON.stringify({ _method: "DELETE", ids }),
    },
  });
  return result;
}

export async function importEventCheckinGuests(formData: FormData) {
  const result = await api<IResponseEventCheckinMutate>({
    url: `${BASE}/${CONST_APIS_COMMON.IMPORT}`,
    options: {
      method: CONST_METHODS.POST,
      body: formData,
    },
  });
  return result;
}

export async function checkinEventGuest(uid: string, checkin: boolean = false) {
  const params = new URLSearchParams({ uid });
  if (checkin) params.set("checkin", "true");

  const result = await api<IResponseEventCheckinDetail>({
    url: `${BASE}/${CONST_APIS_COMMON.GET_INFORMATION}?${params.toString()}`,
    options: {
      method: CONST_METHODS.GET,
    },
  });
  return result;
}

