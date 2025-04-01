import { _API_ } from "@/services/api.constant";
import axios_client from "@/services/axios";

export interface IMe {
  code: string;
  email: string;
  name: string;
  birthdate: string;
  gender: any;
  role: string;
  phone_number: any;
  id_number: any;
  province_id: any;
  province_name: string;
  district_name: string;
  district_id: any;
  commune_id: any;
  commune_name: string;
  address_detail: any;
  avatar: string;
  post_number: number;
}

export interface ICategory {
  id: number;
  code: string;
  name: string;
  product_names: string[];
  products: Product[];
}

export interface Product {
  id: number;
  code: string;
  name: string;
  unit: string;
  status: string;
  image: any;
  category: Category;
  created_at: string;
}

export interface Category {
  id: number;
  code: string;
  name: string;
}

export async function apiGetAllProvinces() {
  return await axios_client.get(_API_.ADDRESS.GET_ALL_PROVINCE);
}

export async function apiGetAddresByParent(parent_id: number) {
  return await axios_client.get(`${_API_.ADDRESS.GET_BY_PARENT}/${parent_id}`);
}
