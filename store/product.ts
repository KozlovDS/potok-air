import { create } from "zustand";

interface State {
  price: number;
  setPrice: (activeId: number) => void;
  activeModelId: number;
  setActiveModelId: (activeModelId: number) => void;
}

export const useProductStore = create<State>()((set) => ({
  price: 0,
  activeModelId: 0,
  setActiveModelId: (activeModelId: number) => set({ activeModelId }),
  setPrice: (price: number) => set({ price }),
}));
