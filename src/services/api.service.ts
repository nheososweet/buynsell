import { _API_, IResponse } from "./api.constant";
import axios_client from "./axios";

export function apiGetListProvinces(): Promise<IResponse> {
  return axios_client.get(_API_.PROVINCE.GET_LIST);
}

export function apiGetListDistrictsByProvinceCode(
  province_code: string
): Promise<IResponse> {
  return axios_client.get(
    _API_.DISTRICT.GET_LIST + "?province_code=" + province_code
  );
}

export function apiGetListWardsByDistrictCode(
  district_code: string
): Promise<IResponse> {
  return axios_client.get(
    _API_.WARD.GET_LIST + "?district_code=" + district_code
  );
}

export function apiGetListPost(id: any = null) {
  const url = id ? `${_API_.FORUM.GET_LIST_POST}/${id}` : _API_.FORUM.GET_LIST_POST;
  return axios_client.get(url);
}

// AUTH
export function apiRegister(payload: any) {
  return axios_client.post(_API_.AUTH.REGISTER, payload);
}

export function apiVerify(payload: any) {
  return axios_client.post(_API_.AUTH.VERIFY, payload);
}

export function apiResendOtp(payload: any) {
  return axios_client.post(_API_.AUTH.RESEND, payload);
}