import BasePage from "@/layouts/base-page";
import "./style.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import CancelIcon from "@mui/icons-material/Cancel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useApi } from "@/contexts/APIContext";

type Props = {};

const orderList = [
  {
    name: "Thanh Thảo",
    datetime: "24/02/2025 - 13:00:02",
    address: "Số 15, Ngõ 101, Thái Hà, Hà Nội",
  },
  {
    name: "Mai Thùy",
    datetime: "24/02/2025 - 14:02",
    address: "Số 10, Ngõ 90, Chùa Bộc, Hà Nội",
  },
  {
    name: "Mai Anh",
    datetime: "24/02/2025 - 14:05:00",
    address: "Số 9, Ngõ 101, Chùa Bộc, Hà Nội",
  },
  {
    name: "Phương Anh",
    datetime: "24/02/2025 - 14:06:00",
    address: "Số 20, Ngõ 101, Chùa Bộc, Hà Nội",
  },
  {
    name: "Minh Đức",
    datetime: "24/02/2025 - 14:10:15",
    address: "Số 7, Phố Huế, Hà Nội",
  },
  {
    name: "Ngọc Bích",
    datetime: "24/02/2025 - 14:20:30",
    address: "Số 5, Trần Duy Hưng, Hà Nội",
  },
  {
    name: "Hoàng Nam",
    datetime: "24/02/2025 - 14:30:45",
    address: "Số 12, Ngõ 125, Giảng Võ, Hà Nội",
  },
  {
    name: "Linh Chi",
    datetime: "24/02/2025 - 14:45:00",
    address: "Số 3, Lê Văn Lương, Hà Nội",
  },
  {
    name: "Hữu Thành",
    datetime: "24/02/2025 - 15:00:00",
    address: "Số 25, Ngọc Khánh, Hà Nội",
  },
  {
    name: "Khánh Vy",
    datetime: "24/02/2025 - 15:15:10",
    address: "Số 8, Hoàng Quốc Việt, Hà Nội",
  },
];

const BuyPage = ({}: Props) => {
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { orders } = useApi();
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Hàm lọc đơn hàng dựa trên searchQuery
  const filteredOrders =
    orders?.request.filter((order) => {
      if (!searchQuery) return true; // Nếu không có query, hiển thị tất cả

      const query = searchQuery.toLowerCase();
      const categoryMatch = order.category_name.toLowerCase().includes(query);
      const addressMatch = order.address.toLowerCase().includes(query);
      const productMatch = order.products.some((product) =>
        product.name.toLowerCase().includes(query)
      );

      return categoryMatch || addressMatch || productMatch;
    }) || [];

  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Mua"
      >
        <div className="px-4 pt-4 pb-2">
          <div className="flex flex-col gap-4 pb-4">
            <p className="text-base font-bold text-primary-color">
              Các đơn xung quanh bạn!
            </p>
            <div className="bg-primary-color py-3 px-4 text-base font-bold text-white text-center">
              {orders?.request.length} Đơn hàng đang chờ bạn thu gom
            </div>
            <p className="text-base font-bold text-primary-color">
              Danh sách yêu cầu thu gom
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
                    className="absolute top-1/2 -translate-y-1/2 right-3 text-red-500 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  />
                )}
              </div>
              <div onClick={handleClick}>
                <TuneIcon className="text-primary-color" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 h-[calc(100vh-374px-44px)] overflow-auto">
            {filteredOrders.map((o, idx) => (
              <div
                key={idx}
                onClick={() =>
                  nav(`/buyer/buy/${o.id}`, {
                    state: {
                      orderCount: orderList.length,
                    },
                  })
                }
                className="border border-primary-color rounded-md p-3 flex gap-2"
              >
                <img
                  src={o.image || "/assets/no_img.png"}
                  alt=""
                  className="h-[70px] w-[70px] object-cover"
                />
                <div className="flex-1 flex flex-col gap-1">
                  <p className="font-semibold text-[18px]">{o.category_name}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {o.products.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <p>{p.name}:</p>{" "}
                        <p>
                          {p.quantity}({p.unit})
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* <p>{o.datetime}</p> */}
                  <p className="border-t border-gray-200 text-sm pt-2">
                    {o.address}
                  </p>
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
          <MenuItem onClick={handleClose}>Đồ gia dụng</MenuItem>
        </Menu>
      </BasePage>
    </div>
  );
};

export default BuyPage;
