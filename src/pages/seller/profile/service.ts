import { _API_ } from "@/services/api.constant";
import axios_client from "@/services/axios";
import { toast } from "react-toastify";

export const changeAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await axios_client.post(_API_.USER.CHANGE_AVATAR, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        toast.success("Thay đổi avatar thành công");
        return response.data;
    } catch (error) {
        toast.error("Có lỗi xảy ra vui lòng thử lại");
        console.error(error);
    }
};