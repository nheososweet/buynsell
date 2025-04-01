import { _API_ } from "@/services/api.constant";
import axios_client from "@/services/axios";

export function apiGetCategoryWithProduct() {
  return axios_client.get(_API_.PRODUCT_CATEGORY.GET_LIST_WITH_PRODUCT);
}
