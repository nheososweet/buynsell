import BasePage from "@/layouts/base-page";
import "./style.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
type Props = {};
import CancelIcon from "@mui/icons-material/Cancel";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useNavigate } from "react-router-dom";
import PaidIcon from "@mui/icons-material/Paid";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ChangePasswordPopup from "./change-password-popup";
import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import InfoPopup from "@/components/InfoPopup/info-popup";
import ChangeInfoPopup from "./change-info-popup";
import { apiLogout } from "../authenticate/service";
const ProfilePage = ({}: Props) => {
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenChangeInfo, setIsOpenChangeInfo] = useState(false);
  const [titleInfo, setTitleInfo] = useState("");

  const handleConfirmChangeInfo = () => {
    setIsOpenChangeInfo(false);
    setTitleInfo("Cập nhật thông tin thành công");
    setIsOpenInfo(true);
  };

  const handleCancelChangeInfo = () => {
    setIsOpenChangeInfo(false);
  };

  const onConfirmInfo = () => {
    setIsOpenInfo(false);
  };
  const onConfirmChangePassword = async () => {
    await apiLogout();
    setIsOpenChangePassword(false);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("login_type");
    localStorage.removeItem("savedEmail");
    localStorage.removeItem("savedPassword");
    localStorage.removeItem("role");
    nav("/login");
  };

  const onCancelChangePassword = () => {
    setIsOpenChangePassword(false);
  };

  const onConfirm = () => {
    setTitleInfo("Đổi mật khẩu thành công");
    setIsOpen(false);
    setIsOpenInfo(true);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Tôi"
      >
        <div className="px-4 pt-4 pb-2 flex flex-col gap-6">
          <div className="p-3 shadow-default rounded-md bg-gray-100">
            <div className="flex items-center gap-4">
              <img
                src="/assets/avatar.jpg"
                className="h-10 w-10 object-cover rounded-full"
                alt=""
              />
              <div>
                <p className="text-primary-color font-semibold">Phí Thị Thắm</p>
                <p className="text-xs text-primary-color">0935748345</p>
              </div>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-2 mt-3 cursor-pointer"
              onClick={() => nav("/buyer/order")}
            >
              <ReceiptIcon className="text-primary-color" />
              <p className="font-medium">Đơn hàng</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2">
              <PaidIcon className="text-yellow-500" />
              <p className="font-medium">
                Tổng thu nhập:{" "}
                <span className="text-primary-color font-bold">
                  9,000,000 đ
                </span>
              </p>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <ChangeCircleIcon className="text-blue-500" />
              <p className="font-medium">Đổi mật khẩu</p>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsOpenChangePassword(true)}
            >
              <LogoutIcon className="text-red-600" />
              <p className="font-medium">Đăng xuất</p>
            </div>
          </div>

          <div className="p-3 shadow-default rounded-md bg-gray-100 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold">Hồ sơ cá nhân</p>
              <p
                className="font-bold text-sub-primary-color cursor-pointer"
                onClick={() => setIsOpenChangeInfo(true)}
              >
                Chỉnh sửa
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Họ và tên</p>
              <p className="text-sm">Phí Thị Thắm</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Số điện thoại</p>
              <p className="text-sm">0935748345</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Email</p>
              <p className="text-sm">phitham25@gmail.com</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Giới tính</p>
              <p className="text-sm">Nữ</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Ngày sinh</p>
              <p className="text-sm">25/01/2003</p>
            </div>
          </div>
        </div>

        <ChangePasswordPopup
          isOpen={isOpen}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
        <ChangeInfoPopup
          isOpen={isOpenChangeInfo}
          onCancel={handleCancelChangeInfo}
          onConfirm={handleConfirmChangeInfo}
        />

        <InfoPopup
          title={titleInfo}
          isOpen={isOpenInfo}
          type="success"
          onClose={onConfirmInfo}
        />
        <ConfirmActionPopup
          title="Bạn có chắc chắn muốn đăng xuất?"
          isOpen={isOpenChangePassword}
          onCancel={onCancelChangePassword}
          onConfirm={onConfirmChangePassword}
        />
      </BasePage>
    </div>
  );
};

export default ProfilePage;
