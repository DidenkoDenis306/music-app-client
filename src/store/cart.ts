import { create } from "zustand";

export const useCart = create((set, get) => ({
  cart: [],
  addToCart: () => set((state) => ({ cart: [...get().cart, state] })),
}));
