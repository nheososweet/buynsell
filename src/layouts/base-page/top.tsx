import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
type Props = {
  leftTitle: string;
  leftSubTitle: string;
  nodeRight: React.ReactNode;
  customTopPart?: React.ReactNode;
  title?: string;
  isChatLayout?: boolean;
  isBackLayout?: string;
  headerContent?: React.ReactNode;
  onBack?: () => void;
  onClickNoti?: () => void;
};

const TopPart = ({
  title,
  isChatLayout,
  isBackLayout,
  headerContent,
  onBack,
  onClickNoti,
}: Props) => {
  const nav = useNavigate();
  const login_type = localStorage.getItem("login_type");
  return (
    <div className="sticky top-0 left-0 right-0 flex px-3 items-center justify-between h-[70px] bg-gradient-to-r from-primary-color to-sub-primary-color z-10">
      {isChatLayout && (
        <span className="cursor-pointer" onClick={onBack}>
          <ChevronLeftIcon className="text-white" />
        </span>
      )}
      {isBackLayout && (
        <span className="cursor-pointer" onClick={() => nav(isBackLayout)}>
          <ChevronLeftIcon className="text-white" />
        </span>
      )}
      {!isChatLayout && !isBackLayout && (
        <span className="cursor-pointer">
          <MenuIcon className="text-white" />
        </span>
      )}
      {title && <p className="text-white text-lg font-semibold">{title}</p>}
      {headerContent}
      <span
        className="cursor-pointer"
        onClick={() => {
          if (login_type === "buyer@gmail.com") {
            nav("/buyer/noti");
          } else {
            nav("/seller/noti");
          }
        }}
      >
        <NotificationsActiveIcon className="text-white" />
      </span>
    </div>
  );
};

export default TopPart;
