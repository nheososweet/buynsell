import Dialog from "@/components/Dialog";
import ControllerLoginInput from "@/components/Form/ControllerLoginInput";
import { requireMessage } from "@/utils/string.utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useState } from "react";
import { changeAvatar } from "../seller/profile/service";

const schema = yup
  .object({
    old_password: yup.string().required(requireMessage("Mật khẩu cũ")),
    password: yup.string().required(requireMessage("Mật khẩu mới")),
    password_confirmation: yup
      .string()
      .required(requireMessage("Xác nhận mật khẩu mới")),
  })
  .required();

type Props = {
  additionClass?: string;
  isOpen: boolean;
  title?: string;
  subTitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
  width?: number;
};

function ChangeInfoPopup({
  isOpen,
  subTitle,
  title,
  onCancel,
  onConfirm,
  additionClass,
}: Props) {
  const [avatar, setAvatar] = useState<string>("/assets/avatar.jpg"); // Ảnh đại diện mặc định
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null); // Lưu file ảnh mới

  const onSubmit = async () => {
    onConfirm();
    handleClose();
  };

  const handleClose = () => {
    onCancel();
  };

  // Xử lý khi chọn ảnh mới
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
    }
  };

  return (
    <Dialog
      title={title}
      subTitle={subTitle}
      isOpen={isOpen}
      onClose={handleClose}
      actionButtonCancel={handleClose}
      actionButtonConfirm={onSubmit}
      additionClass={"w-[400px]"}
      buttonConfirmLabel="Cập nhật"
    >
      <div className="pt-5 px-10 flex flex-col gap-5">
        <div className="">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Hồ sơ cá nhân
          </h2>
          {/* Ảnh đại diện */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                  />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
                type="text"
                value="0935748345"
                readOnly
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                value="Phí Thị Thắm"
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value="phitham25@gmail.com"
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Giới tính
              </label>
              <select className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800">
                <option value="Nữ">Nữ</option>
                <option value="Nam">Nam</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Ngày sinh
              </label>
              <input
                type="text"
                value="25/01/2003"
                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default ChangeInfoPopup;
