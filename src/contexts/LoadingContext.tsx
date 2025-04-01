import { create } from "zustand";

// Định nghĩa interface cho state và actions
export interface LoadingState {
  app_loading: boolean;
  setAppLoading: (loading: boolean) => void;
}

// Tạo store với kiểu đã định nghĩa
export const useAppLoading = create<LoadingState>((set) => ({
  app_loading: false,
  setAppLoading: (loading) => set({ app_loading: loading }),
}));
