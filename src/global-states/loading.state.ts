// Trong global-states/loading.state.ts
import { create } from "zustand";

export interface LoadingState {
  app_loading: boolean;
  setAppLoading: (loading: boolean) => void;
}

export const useAppLoading = create<LoadingState>((set) => ({
  app_loading: false,
  setAppLoading: (loading) => set({ app_loading: loading }),
}));
