import BasePage from "@/layouts/base-page";
import "./style.scss";
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const PostDetailPage = ({}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const nav = useNavigate();
  const open = Boolean(anchorEl);
  const [postDetail, setPostDetail] = useState({
    name: "Nguyễn Văn An",
    time: "15 phút trước",
    content:
      "Cần bán lại laptop Dell XPS 13, i7-1165G7, RAM 16GB, SSD 512GB. Máy còn rất mới, dùng kỹ, pin tốt. Ai cần liên hệ nhé!",
    likes: 85,
    views: 740,
    src: "/assets/dell.jpg",
    comments: [
      {
        name: "Trần Thị Bình",
        avatar: "/assets/avatar.jpg",
        content: "Máy còn bảo hành không bạn? Giá bao nhiêu vậy?",
        time: "10 phút trước",
      },
      {
        name: "Lê Minh Châu",
        avatar: "/assets/avatar.jpg",
        content: "Nhìn máy đẹp quá, cho mình xin giá với nhé!",
        time: "8 phút trước",
      },
      {
        name: "Phạm Quốc Đạt",
        avatar: "/assets/avatar.jpg",
        content: "Mình ở Hà Nội, có ship không bạn?",
        time: "5 phút trước",
      },
      {
        name: "Trần Thị Bình",
        avatar: "/assets/avatar.jpg",
        content: "Máy còn bảo hành không bạn? Giá bao nhiêu vậy?",
        time: "10 phút trước",
      },
      {
        name: "Lê Minh Châu",
        avatar: "/assets/avatar.jpg",
        content: "Nhìn máy đẹp quá, cho mình xin giá với nhé!",
        time: "8 phút trước",
      },
      {
        name: "Phạm Quốc Đạt",
        avatar: "/assets/avatar.jpg",
        content: "Mình ở Hà Nội, có ship không bạn?",
        time: "5 phút trước",
      },
      {
        name: "Trần Thị Bình",
        avatar: "/assets/avatar.jpg",
        content: "Máy còn bảo hành không bạn? Giá bao nhiêu vậy?",
        time: "10 phút trước",
      },
      {
        name: "Lê Minh Châu",
        avatar: "/assets/avatar.jpg",
        content: "Nhìn máy đẹp quá, cho mình xin giá với nhé!",
        time: "8 phút trước",
      },
      {
        name: "Phạm Quốc Đạt",
        avatar: "/assets/avatar.jpg",
        content: "Mình ở Hà Nội, có ship không bạn?",
        time: "5 phút trước",
      },
      {
        name: "Trần Thị Bình",
        avatar: "/assets/avatar.jpg",
        content: "Máy còn bảo hành không bạn? Giá bao nhiêu vậy?",
        time: "10 phút trước",
      },
      {
        name: "Lê Minh Châu",
        avatar: "/assets/avatar.jpg",
        content: "Nhìn máy đẹp quá, cho mình xin giá với nhé!",
        time: "8 phút trước",
      },
      {
        name: "Phạm Quốc Đạt",
        avatar: "/assets/avatar.jpg",
        content: "Mình ở Hà Nội, có ship không bạn?",
        time: "5 phút trước",
      },
    ],
  });
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
        title="Chi tiết bài viết"
      >
        <div className="px-4 pt-4 pb-2 flex flex-col gap-6 relative">
          <div className="rounded-md shadow-default p-3 bg-gray-100">
            <div className="border border-gray-500 rounded-md p-3 bg-white">
              <div className="flex gap-3">
                <img
                  src="/assets/avatar.jpg"
                  className="h-9 w-9 object-cover rounded-full"
                  alt=""
                />
                <div className="flex-1">
                  <p className="text-base font-bold text-primary-color">
                    {postDetail.name}
                  </p>
                  <p className="text-xs text-sub-primary-color leading-none">
                    {postDetail.time}
                  </p>
                </div>
              </div>
              <div className="pt-3">
                <p className="text-[15px] pb-3">{postDetail.content}</p>
                <div className="flex items-center justify-center pb-3 border-b border-gray-300">
                  <img
                    src={postDetail.src}
                    alt=""
                    className="h-[200px] w-auto object-cover"
                  />
                </div>
                <div className="flex items-center gap-4 justify-end pt-3">
                  <button
                    className="bg-blue-500 text-xs px-2 py-1 text-white font-medium rounded"
                    onClick={() => nav(`/product/1`)}
                  >
                    Chi tiết sản phẩm
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 pt-3">
              <div className="flex items-center gap-1">
                <FavoriteIcon className="text-red-500" />
                <span>{postDetail.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <ChatBubbleIcon className="text-green-2b" />
                <span>{postDetail.comments.length}</span>
              </div>
              <div className="flex items-center pl-3">
                <img
                  src="/assets/messenger.png"
                  className="h-5 w-auto"
                  alt=""
                />
              </div>
              <div className="flex items-center gap-1">
                <VisibilityIcon className="text-purple-500" />
                <span>{postDetail.views}</span>
              </div>
            </div>
            <div className="max-w-xl mx-auto p-4">
              {/* Danh sách comment */}
              <div className="space-y-4 mb-4">
                {postDetail.comments.map((comment, index) => (
                  <div key={index} className="flex gap-3">
                    <img
                      src={comment.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{comment.name}</p>
                      <p className="text-gray-800 text-sm">{comment.content}</p>
                      <span className="text-gray-500 text-xs">
                        {comment.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ô input để nhắn comment */}
            </div>
          </div>
        </div>
        <div className="flex gap-2 sticky bottom-0 px-3 pb-3 bg-white">
          <input
            type="text"
            placeholder="Viết bình luận..."
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none  focus:border-primary-color"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
            Gửi
          </button>
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

export default PostDetailPage;
