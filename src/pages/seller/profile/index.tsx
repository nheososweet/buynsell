import BasePage from "@/layouts/base-page";
import "./style.scss";
import { useEffect, useState } from "react";
type Props = {};
import PostAddIcon from "@mui/icons-material/PostAdd";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import ChangePasswordPopup from "./change-password-popup";
import ChangeInfoPopup from "./change-info-popup";
import InfoPopup from "@/components/InfoPopup/info-popup";
import { getGenderLabel } from "@/utils/constants";
import { useApi } from "@/contexts/APIContext";
import { apiLogout } from "@/pages/authenticate/service";
const SellerProfilePage = ({}: Props) => {
  const nav = useNavigate();
  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const [titleInfo, setTitleInfo] = useState("");
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openChangeInfo, setOpenChangeInfo] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const { user, forumPosts } = useApi();

  const handleConfirmChangeInfo = () => {
    setOpenChangeInfo(false);
    setTitleInfo("Cập nhật thông tin thành công");
    setIsOpenInfo(true);
  };

  const handleCancelChangeInfo = () => {
    setOpenChangeInfo(false);
  };

  const handleConfirmChangePassword = () => {
    setOpenChangePassword(false);
    setTitleInfo("Đổi mật khẩu thành công");
    setIsOpenInfo(true);
  };

  const handleCancelChangePassword = () => {
    setOpenChangePassword(false);
  };
  const onConfirmLogout = async () => {
    await apiLogout();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("login_type");
    localStorage.removeItem("savedEmail");
    localStorage.removeItem("savedPassword");
    localStorage.removeItem("role");
    nav("/login");
    setIsOpenLogout(false);
  };

  const onCancelLogout = () => {
    setIsOpenLogout(false);
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
                src={user?.avatar || "/assets/avatar.jpg"}
                className="h-10 w-10 object-cover rounded-full"
                alt=""
              />
              <div>
                <p className="text-primary-color font-semibold">{user?.name}</p>
                <p className="text-xs text-primary-color">
                  {user?.phone_number}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 mt-3">
              <PostAddIcon className="text-yellow-500" />
              <p className="font-medium">
                <span className="text-primary-color font-bold">
                  {forumPosts.length > 0 ? forumPosts.length : ""}
                </span>
                {forumPosts.length > 0 ? "" : "Chưa có"} bài đăng
              </p>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-2 cursor-pointer"
              onClick={() => setOpenChangePassword(true)}
            >
              <ChangeCircleIcon className="text-blue-500" />
              <p className="font-medium">Đổi mật khẩu</p>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsOpenLogout(true)}
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
                onClick={() => setOpenChangeInfo(true)}
              >
                Chỉnh sửa
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Họ và tên</p>
              <p className="text-sm">{user?.name}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Số điện thoại</p>
              <p className="text-sm">{user?.phone_number}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Email</p>
              <p className="text-sm">{user?.email}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Giới tính</p>
              <p className="text-sm">{getGenderLabel(user?.gender ?? "U")}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Ngày sinh</p>
              <p className="text-sm">{user?.birthdate}</p>
            </div>
          </div>
        </div>

        <ConfirmActionPopup
          title="Bạn có chắc chắn muốn đăng xuất?"
          isOpen={isOpenLogout}
          onCancel={onCancelLogout}
          onConfirm={onConfirmLogout}
        />

        <ChangePasswordPopup
          isOpen={openChangePassword}
          onCancel={handleCancelChangePassword}
          onConfirm={handleConfirmChangePassword}
        />
        {user && (
          <ChangeInfoPopup
            isOpen={openChangeInfo}
            onCancel={handleCancelChangeInfo}
            onConfirm={handleConfirmChangeInfo}
            currentUser={user}
          />
        )}

        <InfoPopup
          title={titleInfo}
          isOpen={isOpenInfo}
          type="success"
          onClose={() => setIsOpenInfo(false)}
        />
      </BasePage>
    </div>
  );
};

export default SellerProfilePage;
