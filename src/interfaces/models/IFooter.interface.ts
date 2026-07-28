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

export interface FooterItem {
  id: number;
  key: string;
  title: string;
  description: string | null;
  url: string | null;
  isLink: boolean;
  image: string | null;
  items: FooterItem[];
}

export type FooterSection = FooterItem;

export type IResponseFooterSections = IResponse<FooterSection[]>;

export interface CompanyAddress {
  id: number;
  title: string;
  company: string;
  address: string | null;
  certificate: string | null;
  phone: string | null;
  fax: string | null;
  email: string | null;
  emailOrder: string | null;
  website: string | null;
  workTime: string | null;
  map: string | null;
  mapLat: string | null;
  mapLng: string | null;
  socialFrame: string | null;
  display: boolean;
  order: number;
}

export type IResponseCompanyAddress = IResponse<CompanyAddress[]>;
