import { _API_ } from "@/services/api.constant";
import axios_client from "@/services/axios";
import { toast } from "react-toastify";

export interface IPostForm {
  category: Category;
  title: string;
  content: string;
  end_time: string;
  province_id: number;
  district_id: number;
  commune_id: number;
  address: string;
  contact: string;
  images: any[];
}

export interface Category {
  id: number;
  name: string;
  products: Product[];
}

export interface Product {
  id: number;
  quantity: number;
}

export const apiCreatePost = async (data: IPostForm) => {
  const formData = new FormData();

  // Thêm dữ liệu vào FormData
  formData.append("category", JSON.stringify(data.category));
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("end_time", data.end_time);
  formData.append("province_id", String(data.province_id)); // Chuyển number thành string
  formData.append("district_id", String(data.district_id)); // Chuyển number thành string
  formData.append("commune_id", String(data.commune_id)); // Chuyển number thành string
  formData.append("address", data.address);
  formData.append("contact", data.contact);

  // Thêm ảnh vào FormData
  data.images.forEach((image, index) => {
    formData.append(`images[${index}]`, image);
  });

  try {
    const response = await axios_client.post(
      _API_.FORUM.CREATE_POST,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data; // Trả về dữ liệu từ API nếu cần
  } catch (error) {
    console.error("Error creating post:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi nếu cần
  }
};
