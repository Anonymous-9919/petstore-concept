"use client";

import { create } from "zustand";

interface UiState {
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  setCartOpen: (v) => set({ cartOpen: v }),
}));
