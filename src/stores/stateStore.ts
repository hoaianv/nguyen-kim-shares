// store/stateStore.ts
import { create } from "zustand";
import type { ISearch } from "@/interfaces/common";
import type { IAdPosition } from "@/interfaces/models/IAdvertise.interface";
import { SupportGroups } from "@/interfaces/models/ISupport.interface";
import { IFooter } from "@/interfaces/models/IFooter.interface";

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
  banner: {},
  setBanner: (banner) => set({ banner }),

  loading: false,
  setLoading: (loading) => set({ loading }),
  support: {},
  setSupport: (support) => set({ support }),
}));
