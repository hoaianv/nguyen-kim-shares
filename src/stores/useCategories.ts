import { IMenu } from "@/interfaces/models/IMenu.interface";
import { create } from "zustand";

interface CategoriesState {
  categories: IMenu[] | null;
  setCategories: (categories: IMenu[] | null) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: null,

  setCategories: (categories) => set({ categories }),
}));
