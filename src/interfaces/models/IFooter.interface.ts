import { IResponse } from "@/interfaces/common/IResponse.interface";

export interface CompanyInfo {
  socialFrame: string;
  company: string;
  title: string;
  address: string;
  certificate: string;
  phone: string;
  map: string;
  email: string;
  website: string;
  workTime: string;
  mapLat: string;
  mapLng: string;
}

export interface Link {
  id: number;
  title: string;
  url: string;
}

export interface SocialIcon {
  id: number;
  picture: string;
  color: string;
  url: string;
  title: string;
  fontIcon: string;
  target: string;
}

export interface Setting {
  id: number;
  title: string;
  metaDesc: string;
  charset: string;
  favicon: string;
}

export interface SettingLogo {
  id: number;
  logo: string;
  hotline: string;
  email: string;
  emailSearch: string;
  address: string;
  toolSearch: number;
}

export interface IFooter {
  aboutCompany: Link[];
  policies: Link[];
  companyInfo: CompanyInfo;
  icons: SocialIcon[];
  setting: Setting;
  settingLogo: SettingLogo;
  hotline: string;
}

export type IResponseFooter = IResponse<IFooter>;
