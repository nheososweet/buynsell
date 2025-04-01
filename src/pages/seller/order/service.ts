import { _API_ } from "@/services/api.constant";
import axios_client from "@/services/axios";

export interface IOrderAll {
  request: IOrder[];
  confirm: any[];
  complete: any[];
  canceled: any[];
}

export interface IOrder {
  id: number;
  created_at: string;
  category_name: string;
  address: string;
  status: string;
  products: Product[];
  start_time: string;
  end_time: string;
  phone_number: string;
  image?: string;
}

export interface Product {
  name: string;
  unit: string;
  quantity: number;
}
export type OrderTypes = "request" | "confirm" | "complete" | "cancel";

export async function apiGetListOrder(type: OrderTypes) {
  return await axios_client.get(`${_API_.INVOICE.GET_LIST}-${type}`);
}

export async function apiGetAllOrder() {
  return await axios_client.get(`${_API_.INVOICE.GET_ALL}`);
}

export async function apiCancelOrder(id: number) {
  return await axios_client.put(
    `${_API_.INVOICE.CANCEL}/${id}?status=CANCELED`
  );
}

export async function apiAcceptOrder(id: number) {
  return await axios_client.put(
    `${_API_.INVOICE.CANCEL}/${id}?status=CONFIRMED`
  );
}

export async function apiGetDetailOrder(id: number) {
  return await axios_client.get(`${_API_.INVOICE.DETAIL}/${id}`);
}
