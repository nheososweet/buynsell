import { Link, useLocation } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import HomeIcon from "@mui/icons-material/Home";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
const BottomPart = () => {
  const location = useLocation();
  const login_type = localStorage.getItem("role");
  // Kiểm tra route hiện tại
  const isActive = (path: string) => location.pathname === path;

  return login_type === "BUYER" ? (
    <div className="sticky bottom-0 left-0 w-full bg-white shadow-default flex items-center justify-around border-t h-[74px]">
      {/* Thống kê */}
      <Link
        to="/buyer/analysis"
        className="flex-1 h-full flex flex-col items-center justify-center py-2 relative text-primary-color"
      >
        {isActive("/buyer/analysis") && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary-color" />
        )}
        <BarChartIcon />
        <span className="text-sm font-semibold">Thống kê</span>
      </Link>

      {/* Diễn đàn */}
      <Link
        to="/buyer/forum"
        className="flex-1 h-full flex flex-col items-center justify-center py-2 relative text-primary-color"
      >
        {isActive("/buyer/forum") && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary-color" />
        )}
        <ConnectWithoutContactIcon />
        <span className="text-sm font-semibold">Diễn đàn</span>
      </Link>

      {/* Nút MUA (nổi bật) */}
      <Link
        to="/buyer/buy"
        className="flex items-center justify-center w-16 h-16 bg-green-700 text-white font-bold rounded-full shadow-lg"
      >
        MUA
      </Link>

      {/* Đơn hàng */}
      <Link
        to="/buyer/cart"
        className="flex-1 h-full flex flex-col items-center justify-center py-2 relative text-primary-color"
      >
        {isActive("/buyer/cart") && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary-color" />
        )}
        <ShoppingCartIcon />
        <span className="text-sm font-semibold">Giỏ hàng</span>
      </Link>

      {/* Tôi */}
      <Link
        to="/buyer/profile"
        className="flex-1 h-full flex flex-col items-center justify-center py-2 relative text-primary-color"
      >
        {isActive("/buyer/profile") && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary-color" />
        )}
        <AccountCircleIcon />
        <span className="text-sm font-semibold">Tôi</span>
      </Link>
    </div>
  ) : (
    <div className="sticky bottom-0 left-0 w-full bg-white shadow-default flex items-center justify-around border-t h-[74px]">
      {/* Thống kê */}
      <Link
        to="/seller/home"
        className="flex-1 h-full flex flex-col items-center justify-center py-2 relative text-primary-color"
      >
        {isActive("/seller/home") && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary-color" />
        )}
        <HomeIcon />
        <span className="text-sm font-semibold">Trang chủ</span>
      </Link>

      {/* Diễn đàn */}
      <Link
        to="/seller/forum"
        className="flex-1 h-full flex flex-col items-center justify-center py-2 relative text-primary-color"
      >
        {isActive("/seller/forum") && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary-color" />
        )}
        <ConnectWithoutContactIcon />
        <span className="text-sm font-semibold">Diễn đàn</span>
      </Link>

      {/* Nút MUA (nổi bật) */}
      <Link
        to="/seller/create-post"
        className="flex items-center justify-center w-16 h-16 bg-green-700 text-white font-bold rounded-full shadow-lg"
      >
        BÁN
      </Link>

      {/* Đơn hàng */}
      <Link
        to="/seller/order"
        className="flex-1 h-full flex flex-col items-center justify-center py-2 relative text-primary-color"
      >
        {isActive("/seller/orders") && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary-color" />
        )}
        <ManageSearchIcon />
        <span className="text-sm font-semibold">Lịch sử</span>
      </Link>

      {/* Tôi */}
      <Link
        to="/seller/profile"
        className="flex-1 h-full flex flex-col items-center justify-center py-2 relative text-primary-color"
      >
        {isActive("/seller/profile") && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary-color" />
        )}
        <AccountCircleIcon />
        <span className="text-sm font-semibold">Tôi</span>
      </Link>
    </div>
  );
};

export default BottomPart;
