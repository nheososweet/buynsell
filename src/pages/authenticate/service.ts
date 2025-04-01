import { IResponse, _API_ } from "@/services/api.constant";
import axios_client from "@/services/axios";
import { ILoginRequest } from "./state";
import { IMe } from "@/contexts/service";

export interface IChangePassword {
  old_password: string;
  password: string;
}

export interface IUserInformationParams {
  hasEnterprise?: boolean;
}

export interface UserInfo {
  code: string;
  email: string;
  name: string;
  birthdate: string;
  gender: string;
  role: string;
  phone_number: string;
  id_number: string;
  province_name: string;
  district_name: string;
  commune_name: string;
  address_detail: string;
  avatar: string;
}

export interface GetCurrentUserResponse {
  message: string;
  status: number;
  data: IMe;
}

export function apiLogin<T>(payload: ILoginRequest): Promise<IResponse<T>> {
  return axios_client.post(_API_.AUTH.LOGIN, payload);
}

export async function apiLogout<T>(): Promise<IResponse<T>> {
  return axios_client.get(_API_.AUTH.LOGOUT);
}

export function apiGetUserInformation<T>(
  params?: IUserInformationParams
): Promise<IResponse<T>> {
  return axios_client.get(_API_.AUTH.GET_USER_INFORMATION, { params });
}

export function apiChangePassword<T>(
  id: string,
  payload: IChangePassword
): Promise<IResponse<T>> {
  return axios_client.post(`${_API_.USER.CHANGE_PASSWORD}/${id}`, payload);
}

export function apiGetCurrentUser(): Promise<GetCurrentUserResponse> {
  return axios_client.get(_API_.AUTH.ME);
}
