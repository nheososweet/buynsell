import BasePage from "@/layouts/base-page";
import "./style.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
type Props = {};
import CancelIcon from "@mui/icons-material/Cancel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
const orderList = [
  {
    name: "Vỏ chai nhựa",
    datetime: "24/02/2025 - 13:00:02",
    address: "Số 15, Ngõ 101, Thái Hà, Hà Nội",
  },
  {
    name: "Sắt",
    datetime: "24/02/2025 - 14:02",
    address: "Số 10, Ngõ 90, Chùa Bộc, Hà Nội",
  },
];

const CartPage = ({}: Props) => {
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Giỏ hàng"
      >
        <div className="px-4 pt-4 pb-2">
          <div className="flex flex-col gap-4 pb-4">
            <p className="text-base font-bold text-primary-color">
              Danh sản phẩm
            </p>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-3" />
                <input
                  type="text"
                  className="focus:outline-none border border-gray-300 rounded py-1.5 px-10 w-full"
                  placeholder="Tìm kiếm"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
                {searchQuery && (
                  <CancelIcon
                    className="absolute top-1/2 -translate-y-1/2 right-3 text-red-500"
                    onClick={() => setSearchQuery("")}
                  />
                )}
              </div>
              <div onClick={handleClick}>
                <TuneIcon className="text-primary-color" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 h-[calc(100vh-314px-8px)] overflow-auto">
            {orderList.map((o, idx) => (
              <div
                key={idx}
                className="border border-primary-color rounded-md p-3 h-[98px] flex gap-3 relative"
              >
                <button
                  className="p-0 absolute right-3 top-3 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CloseIcon className="" />
                </button>
                <img
                  src="/assets/map.png"
                  alt=""
                  className="h-full aspect-square object-cover"
                />
                <div className="flex-1 flex flex-col gap-1">
                  <div>
                    <p>{o.name}</p>
                    <p>{o.address}</p>
                  </div>
                  <div className="flex items-center gap-4 justify-end">
                    <button
                      className="bg-blue-500 text-xs px-2 py-1 text-white font-medium rounded"
                      onClick={() => nav(`/product/${idx}`)}
                    >
                      Chi tiết
                    </button>
                    <button
                      className="bg-primary-color text-xs px-2 py-1 text-white font-medium rounded"
                      onClick={() => nav(`/payment`)}
                    >
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <div className="flex items-center justify-end gap-2 h-6 bg-white">
              <ChevronLeftIcon className="text-primary-color" />
              <div className="text-sm text-center font-medium w-[30px] text-primary-color">
                1
              </div>
              <div className="text-sm text-center font-medium w-[24px] text-white bg-primary-color">
                2
              </div>
              <ChevronRightIcon className="text-primary-color" />
            </div>
            <p className="text-xs text-primary-color text-right">
              Tổng: 4/10 dòng
            </p>
          </div>
        </div>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Kim loại</MenuItem>
          <MenuItem onClick={handleClose}>Nhựa</MenuItem>
          <MenuItem onClick={handleClose}>Giấy & carton</MenuItem>
          <MenuItem onClick={handleClose}>Đồ điện tử</MenuItem>
          <MenuItem onClick={handleClose}>Đồ điện tử</MenuItem>
          <MenuItem onClick={handleClose}>Đồ gia dụng</MenuItem>
        </Menu>
      </BasePage>
    </div>
  );
};

export default CartPage;
