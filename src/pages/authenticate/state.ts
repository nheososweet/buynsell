import { useAppLoading } from "@/global-states/loading.state";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  apiChangePassword,
  apiGetUserInformation,
  apiLogin,
  IChangePassword,
} from "./service";

export interface IUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
  is_superadmin: boolean;
  count_login: number;
  enterprise_id: string;
  role: "admin" | "user";
}

export interface ILoginRequest {
  email: string;
  password: string;
  isRemember?: boolean;
}

export interface InitialState {
  user: IUser | null;
  is_logged: boolean;
  is_loading: boolean;
  access_token: string | null;
  login: (
    payload: ILoginRequest
  ) => Promise<{ success: boolean; message: string }>;
  getUserInformation: () => Promise<{ success: boolean; message: string }>;
  logout: (callback?: Function) => void;

  changePassword: (
    id: string,
    payload: IChangePassword,
    callback?: Function
  ) => Promise<{ success: boolean; message: string }>;
}

export const useUserStore = create<
  InitialState,
  [["zustand/persist", { access_token: string | null; is_logged: boolean }]]
>(
  persist(
    (set) => ({
      user: null,
      is_logged: false,
      is_loading: false,
      access_token: null,
      login: async (payload: ILoginRequest) => {
        try {
          set(() => ({ is_loading: true }));
          const {
            data: { access_token },
            status,
            message,
          } = await apiLogin<{
            access_token: string;
          }>(payload);
          if (status === 200) {
            set(() => ({ access_token, is_logged: true, is_loading: false }));
          }
          return { success: true, message };
        } catch (err) {
          console.log(err, "Err login");
          set(() => ({ is_loading: false }));
          return { success: false, message: "Có lỗi xảy ra" };
        }
      },
      getUserInformation: async () => {
        try {
          set(() => ({ is_loading: true }));

          const {
            data: { user },
            status,
            message,
          } = await apiGetUserInformation<{ user: IUser }>({
            hasEnterprise: true,
          });
          if (status === 200) {
            set(() => ({ user, is_loading: false }));
          }
          return { success: true, message };
        } catch (err) {
          console.log(err, "Err get user information");
          return { success: false, message: "Có lỗi xảy ra" };
        }
      },
      logout: (callback) => {
        set(() => ({
          user: null,
          is_logged: false,
          access_token: null,
        }));
        localStorage.removeItem("auth_storage");

        if (callback) callback();
      },
      changePassword: async (id, payload, callback) => {
        try {
          useAppLoading();
          set(() => ({ is_loading: true }));
          const { status, message } = await apiChangePassword(id, payload);

          if (status === 200) {
            set(() => ({ is_loading: false }));
            toast.success("Đổi mật khẩu thành công!");
          }

          callback && callback();
          useAppLoading();
          return { status, success: true, message };
        } catch (err: any) {
          console.log("🚀 ~ changePassword: ~ err:", err);
          if (err?.status === 400) {
            toast.error("Mật khẩu cũ không chính xác!");
          } else {
            toast.error("Đổi mật khẩu thất bại!");
          }
          set(() => ({ is_loading: false }));
          useAppLoading();
          return { success: false, message: "Có lỗi xảy ra" };
        }
      },
    }),

    {
      name: "auth_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        access_token: state.access_token,
        is_logged: state.is_logged,
      }),
    }
  )
);
