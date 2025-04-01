import { _API_ } from "@/services/api.constant";
import axios_client from "@/services/axios";
export interface IPost {
  id: number;
  author_name: string;
  author_avatar: string;
  title: string;
  content: string;
  time: string;
  favorites: any[];
  views: number;
  images: any[];
  comments: IComment[];
  products: IProduct[];
  category_name: string;
  start_time: string;
  end_time: string;
  contact: string;
}

export interface IProduct {
  name: string;
  unit: string;
  quantity: number;
}

interface IComment {
  id: number;
  content: string;
  created_at: string;
  display_name: string;
  avatar: string;
}

export async function apiGetListPost() {
  return await axios_client.get(_API_.FORUM.GET_LIST_POST);
}

export async function apiGetDetailPost(id: number) {
  return await axios_client.get(`${_API_.FORUM.GET_DETAIL}/${id}`);
}

export async function apiCreateComment(post_id: number, content: string) {
  return await axios_client.post(`${_API_.FORUM.CREATE_COMMENT}/${post_id}`, {
    content,
  });
}

export async function apiCreateView(post_id: number) {
  return await axios_client.get(`${_API_.FORUM.CREATE_VIEW}/${post_id}`);
}

export async function apiToggleFavorite(post_id: number) {
  try {
    const response = await axios_client.get(`${_API_.FORUM.LIKE}/${post_id}`);
    return response.data; // Trả về dữ liệu từ API (thường là trạng thái mới của favorite)
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
}
