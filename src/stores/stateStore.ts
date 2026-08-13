// store/stateStore.ts
import { create } from "zustand";
import type { ISearch } from "@/interfaces/common";
import type { IAdPosition } from "@/interfaces/models/IAdvertise.interface";
import { SupportGroups } from "@/interfaces/models/ISupport.interface";
import {
  CompanyAddress,
  FooterSection,
  IFooter,
} from "@/interfaces/models/IFooter.interface";
import type { ThemeConfig } from "@/theme/types";

interface SearchState {
  search: ISearch;
  setSearch: (patch: Partial<ISearch> | ((prev: ISearch) => ISearch)) => void;
  banner: Record<string, IAdPosition>;
  setBanner: (banner: Record<string, IAdPosition>) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;

  support: SupportGroups;
  setSupport: (support: SupportGroups) => void;
  config: IFooter;

  setConfig: (config: IFooter) => void;
  footerSections: FooterSection[];
  setFooterSections: (footerSections: FooterSection[]) => void;
  companyAddress: CompanyAddress | null;
  setCompanyAddress: (companyAddress: CompanyAddress | null) => void;
  theme: ThemeConfig | null;
  setTheme: (theme: ThemeConfig) => void;
}

export const useStateStore = create<SearchState>((set) => ({
  search: {
    keyword: "",
    page: 1,
  },
  setSearch: (patch) =>
    set((s) => ({
      search:
        typeof patch === "function"
          ? patch(s.search)
          : { ...s.search, ...patch },
    })),
  config: {} as IFooter,
  setConfig: (config) => set({ config }),
  footerSections: [],
  setFooterSections: (footerSections) => set({ footerSections }),
  companyAddress: null,
  setCompanyAddress: (companyAddress) => set({ companyAddress }),
  theme: null,
  setTheme: (theme) => set({ theme }),
  banner: {},
  setBanner: (banner) => set({ banner }),

  loading: false,
  setLoading: (loading) => set({ loading }),
  support: {},
  setSupport: (support) => set({ support }),
}));
