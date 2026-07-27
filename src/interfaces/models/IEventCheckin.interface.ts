import { IPagination } from "@/interfaces/common";
import { IResponse } from "@/interfaces/common/IResponse.interface";

// ═══ ENUM ═══
export enum ECheckinStatus {
  Checked = "checkin",
  NotChecked = "not_checkin",
}

// ═══ CORE ENTITY ═══
export interface IEventCheckinGuest {
  id: number;
  uid: string;
  name: string;
  companyName: string;
  position?: string;
  email: string;
  phone: string;
  saleName?: string;
  qrCode: string;
  status: ECheckinStatus;
  checkinTime?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ═══ STATS ═══
export interface IEventCheckinStats {
  total: number;
  checkedIn: number;
  notCheckedIn: number;
}

// ═══ FILTER ═══
export interface IEventCheckinFilter {
  status?: string;
  q?: string;
  page?: string;
  perPage?: string;
}

// ═══ FORM PAYLOAD ═══
export interface IEventCheckinGuestPayload {
  name: string;
  companyName?: string;
  position?: string;
  email?: string;
  phone?: string;
  saleName?: string;
  status?: ECheckinStatus;
}

// ═══ API RESPONSES ═══
export interface IEventCheckinListData {
  items: IEventCheckinGuest[];
  pagination: IPagination;
  stats: IEventCheckinStats;
}

export type IResponseEventCheckinList = IResponse<IEventCheckinListData>;
export type IResponseEventCheckinDetail = IResponse<IEventCheckinGuest>;
export type IResponseEventCheckinMutate = IResponse<IEventCheckinGuest>;
export type IResponseEventCheckinBulkDelete = IResponse<{
  deletedCount: number;
}>;
