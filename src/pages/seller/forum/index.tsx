import BasePage from "@/layouts/base-page";
import "./style.scss";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import VisibilityIcon from "@mui/icons-material/Visibility";
const forumData = [
  {
    name: "Nguyễn Văn An",
    time: "15 phút trước",
    content:
      "Cần bán lại laptop Dell XPS 13, i7-1165G7, RAM 16GB, SSD 512GB. Máy còn rất mới, dùng kỹ, pin tốt. Ai cần liên hệ nhé!",
    likes: 85,
    comments: 23,
    views: 740,
    src: "/assets/dell.jpg",
  },
  {
    name: "Trần Thị Bích",
    time: "30 phút trước",
    content:
      "Thanh lý tủ lạnh Toshiba Inverter 300L, chạy êm, tiết kiệm điện. Giá mềm cho ai thực sự cần!",
    likes: 150,
    comments: 40,
    views: 1120,
    src: "/assets/toshiba.jpg",
  },
  {
    name: "Lê Hoàng Minh",
    time: "1 giờ trước",
    content:
      "Bán lại xe đạp thể thao Giant Escape 3, đi cực nhẹ, còn 90% mới. Giá hữu nghị cho anh em đam mê!",
    likes: 210,
    comments: 55,
    views: 1650,
    src: "/assets/xe.jpg",
  },
];

type Props = {};

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { apiGetListPost, apiToggleFavorite, IPost } from "./service";
import { useNavigate } from "react-router-dom";
import { useApi } from "@/contexts/APIContext";
import moment from "moment";

const SellerForumPage = ({}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const nav = useNavigate();
  const { forumPosts, fetchForumPosts } = useApi();
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Hàm xử lý toggle favorite
  const handleToggleFavorite = async (
    postId: number,
    currentFavorites: any[]
  ) => {
    try {
      const response = await apiToggleFavorite(postId);

      // Gọi lại fetchForumPosts nếu cần đồng bộ với server
      await fetchForumPosts();
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      alert("Không thể thực hiện thao tác thích/bỏ thích!");
    }
  };

  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Diễn đàn"
      >
        <div className="pb-2">
          <div className="pb-4">
            <img src="/assets/seller_bg.png" alt="" />
          </div>
          <div className="px-4 flex flex-col gap-6 ">
            {forumPosts.map((f, idx) => (
              <div
                key={idx}
                className="rounded-md shadow-default p-3 bg-gray-100"
              >
                <div
                  className="border border-gray-500 rounded-md p-3 bg-white"
                  onClick={() => nav(`/seller/forum/${f.id}`)}
                >
                  <div className="flex gap-3">
                    <img
                      src={f.author_avatar}
                      className="h-9 w-9 object-cover rounded-full"
                      alt=""
                    />
                    <div className="flex-1">
                      <p className="text-base font-bold text-primary-color">
                        {f.author_name}
                      </p>
                      <p className="text-xs text-sub-primary-color leading-none">
                        {f.time}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 w-full">
                    <p className="text-[15px] font-medium pb-b">{f.title}</p>
                    <p className="text-[14px] pb-3">{f.content}</p>
                  </div>
                  <div className="flex flex-col gap-4 pt-4 border-t">
                    <div className="grid grid-cols-3 gap-3">
                      <p>Loại rác: </p>
                      <p className="col-span-2 space-x-8 font-medium">
                        <span>{f.category_name}</span>
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <p>Khối lượng:</p>
                      <p className="col-span-2 space-x-8 font-medium">
                        {f.products.map((p, idx) => (
                          <span key={idx}>
                            {p.name}: {p.quantity}
                            {p.unit}
                          </span>
                        ))}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <p>Thời gian thu gom: </p>
                      <div className="col-span-2 font-medium">
                        <p className="">{f.start_time} </p>
                        <p className="font-bold text-blue-600 pl-14">↓</p>
                        <p className="">{f.end_time}</p>
                      </div>
                    </div>
                    {f.contact && (
                      <div className="grid grid-cols-3 gap-3">
                        <p>Liên hệ: </p>
                        <p className="col-span-2  font-medium">{f.contact}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      {f.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          className="w-full max-h-[150px] object-cover "
                          alt=""
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 pt-3">
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => handleToggleFavorite(f.id, f.favorites)}
                  >
                    <FavoriteIcon className="text-red-500" />
                    <span>{f.favorites.length}</span>
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <ChatBubbleIcon className="text-green-2b" />
                    <span>{f.comments.length}</span>
                  </div>
                  <div className="flex items-center pl-3">
                    <img
                      src="/assets/messenger.png"
                      className="h-5 w-auto"
                      alt=""
                    />
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <VisibilityIcon className="text-purple-500" />
                    <span>{f.views}</span>
                  </div>
                </div>
              </div>
            ))}
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

export default SellerForumPage;
