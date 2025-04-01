import BasePage from "@/layouts/base-page";
import "./style.scss";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import VisibilityIcon from "@mui/icons-material/Visibility";
import moment from "moment";

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
import { useNavigate, useParams } from "react-router-dom";
import {
  apiCreateComment,
  apiCreateView,
  apiGetDetailPost,
  apiToggleFavorite,
  IPost,
} from "./service";
import { useApi } from "@/contexts/APIContext";

const SellerPostDetailPage = ({}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const nav = useNavigate();
  const open = Boolean(anchorEl);
  const { fetchForumPosts } = useApi();

  const [newComment, setNewComment] = useState("");

  const [post, setPost] = useState<IPost>();

  const { id } = useParams();

  const handleFetchDetail = async () => {
    const res = await apiGetDetailPost(parseInt(id!));
    setPost(res.data);
  };

  useEffect(() => {
    handleFetchDetail();
  }, []);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateComment = async () => {
    const res = await apiCreateComment(post!.id, newComment);
    setPost((prev) => {
      if (!prev) return prev;
      return { ...prev, comments: [...prev.comments, res.data] };
    });

    console.log("🚀 ~ handleCreateComment ~ res:", res);
    setNewComment("");
  };

  const fetchCreateView = async () => {
    await apiCreateView(parseInt(id!));
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchCreateView();
      fetchForumPosts();
    };
    fetch();
  }, []);

  const handleToggleFavorite = async (postId: number) => {
    try {
      const response = await apiToggleFavorite(postId);

      // Gọi lại fetchForumPosts nếu cần đồng bộ với server
      await handleFetchDetail();
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
        title="Chi tiết bài viết"
      >
        {post ? (
          <>
            <div className="px-4 pt-4 pb-2 flex flex-col gap-6 relative">
              <div className="rounded-md shadow-default p-3 bg-gray-100">
                <div className="border border-gray-500 rounded-md p-3 bg-white">
                  <div className="flex gap-3">
                    <img
                      src={post?.author_avatar || "/assets/no_img.png"}
                      className="h-9 w-9 object-cover rounded-full border"
                      alt=""
                    />
                    <div className="flex-1">
                      <p className="text-base font-bold text-primary-color">
                        {post?.author_name}
                      </p>
                      <p className="text-xs text-sub-primary-color leading-none">
                        {post?.time}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3">
                    <p className="text-[15px] font-medium pb-1">
                      {post?.content}
                    </p>
                    <p className="text-[14px] pb-3">{post?.content}</p>
                    <div className="flex flex-col gap-4 pt-4 border-t">
                      <div className="grid grid-cols-3 gap-3">
                        <p>Loại rác: </p>
                        <p className="col-span-2 space-x-8 font-medium">
                          <span>{post.category_name}</span>
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <p>Khối lượng:</p>
                        <p className="col-span-2 space-x-8 font-medium">
                          {post.products.map((p, idx) => (
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
                          <p className="">{post.start_time} </p>
                          <p className="font-bold text-blue-600 pl-14">↓</p>
                          <p className="">{post.end_time}</p>
                        </div>
                      </div>
                      {post.contact && (
                        <div className="grid grid-cols-3 gap-3">
                          <p>Liên hệ: </p>
                          <p className="col-span-2  font-medium">
                            {post.contact}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        {post.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            className="w-full max-h-[150px] object-cover "
                            alt=""
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-end pt-3 border-t">
                      <button
                        className="bg-blue-500 text-xs px-2 py-1 text-white font-medium rounded"
                        onClick={() => nav(`/seller/edit-post/${post.id}`)}
                      >
                        Chỉnh sửa bài viết
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 pt-3">
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => handleToggleFavorite(post.id)}
                  >
                    <FavoriteIcon className="text-red-500" />
                    <span>{post?.favorites.length}</span>
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <ChatBubbleIcon className="text-green-2b" />
                    <span>{post?.comments.length}</span>
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
                    <span>{post?.views}</span>
                  </div>
                </div>
                <div className="max-w-xl mx-auto p-4">
                  {/* Danh sách comment */}
                  <div className="space-y-4 mb-4">
                    {post?.comments.map((comment, index) => (
                      <div key={index} className="flex gap-3">
                        <img
                          src={comment.avatar}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            {comment.display_name}
                          </p>
                          <p className="text-gray-800 text-sm">
                            {comment.content}
                          </p>
                          <span className="text-gray-500 text-xs">
                            {moment(comment.created_at).format(
                              "HH:mm DD/MM/YYYY"
                            )}
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
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateComment()}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                onClick={handleCreateComment}
              >
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
          </>
        ) : (
          <p className="pt-8 text-center  text-gray-400">Đang tải...</p>
        )}
      </BasePage>
    </div>
  );
};

export default SellerPostDetailPage;
