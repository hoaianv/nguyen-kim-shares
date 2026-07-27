import { IDataBuildPc } from "./../interfaces/models/IBuildPc.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BuildPcState {
  buildConfigs: Record<number, IDataBuildPc>;
  setBuildConfigs: (configId: number, components: IDataBuildPc) => void; // setData → setBuildConfigs
  removeBuildConfig: (configId: number) => void; // clearData → removeBuildConfig
  setActive: (id: number) => void;
  active: number;

  removeBuildItem: (configId: number, key: string) => void;
}

export const useBuildPc = create<BuildPcState>()(
  persist(
    (set, get) => ({
      buildConfigs: {},

      setActive: (id) => set(() => ({ active: id })),
      active: 1, // mặc định = 1

      setBuildConfigs: (configId, components) =>
        set((state) => {
          const merged = {
            ...state.buildConfigs[configId],
            ...components,
          };

          return {
            buildConfigs: {
              ...state.buildConfigs,
              [configId]: merged,
            },
          };
        }),

      removeBuildConfig: (configId) =>
        set((state) => {
          const newConfigs = { ...state.buildConfigs };
          delete newConfigs[configId];
          return { buildConfigs: newConfigs };
        }),
      removeBuildItem: (configId: number, key: string) =>
        set((state) => {
          const updated = { ...state.buildConfigs[configId] };
          delete updated[key];
          return {
            buildConfigs: {
              ...state.buildConfigs,
              [configId]: updated,
            },
          };
        }),
    }),
    {
      name: "build-pc-storage",
    }
  )
);
