import { _API_ } from "@/services/api.constant";
import axios_client from "@/services/axios";

export function apiGetProductByCategory(id: number) {
  return axios_client.get(`${_API_.PRODUCT.GET_BY_CATEGORY}/${id}`);
}
