import { create } from "zustand";

interface State {
  activeId: number;
  subCategoryActiveId: number;

  setSubCategoryActiveId: (subCategoryActiveId: number) => void;
  setActiveId: (activeId: number) => void;
}

export const useCategoryStore = create<State>()((set) => ({
  activeId: 0,
  subCategoryActiveId: 0,
  setActiveId: (activeId: number) => set({ activeId }),
  setSubCategoryActiveId: (subCategoryActiveId: number) =>
    set({ subCategoryActiveId }),
}));
