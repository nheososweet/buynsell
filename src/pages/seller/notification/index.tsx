import BasePage from "@/layouts/base-page";
import "./style.scss";
import { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline"; // Icon thư
import { useNavigate } from "react-router-dom";

type Props = {};

const NotificationPage = ({}: Props) => {
  const [activeTab, setActiveTab] = useState<"user" | "system">("system"); // Quản lý tab đang active

  // Dữ liệu giả lập cho danh sách thông báo
  const systemNotifications = [
    {
      id: 1,
      title: "GREENGO TRỞ LẠI SAU TẾT",
      content: "GreenGo xin thông báo tới quý khách hàng...",
      date: "25/02/2025 10:36:15",
    },
    {
      id: 2,
      title: "GREENGO THÔNG BÁO NGHỈ TẾT",
      content: "GreenGo xin thông báo tới quý khách hàng...",
      date: "25/01/2025 8:30:00",
    },
  ];

  const userNotifications = [
    {
      id: 3,
      title: "NGƯỜI DÙNG: BÀI ĐĂNG ĐÃ ĐƯỢC DUYỆT",
      content: "Bài đăng của bạn đã được duyệt thành công...",
      date: "24/02/2025 14:20:00",
    },
    {
      id: 4,
      title: "NGƯỜI DÙNG: CẬP NHẬT HỒ SƠ",
      content: "Hồ sơ của bạn đã được cập nhật thành công...",
      date: "23/02/2025 9:15:00",
    },
  ];

  // Hàm xử lý khi click vào thông báo
  const nav = useNavigate();

  const handleNotificationClick = (id: number) => {
    // Có thể thêm logic để mở chi tiết thông báo nếu cần
    console.log(`Clicked notification with ID: ${id}`);
    nav(`/seller/noti/${id}`);
  };

  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Hệ thống"
      >
        <div className="px-4 pt-4 pb-2 flex flex-col gap-4">
          {/* Tab Người dùng và Hệ thống */}
          <div className="flex gap-2 mb-2">
            <button
              className={`px-4 py-2 font-semibold rounded-full shadow-sm transition-colors ${
                activeTab === "user"
                  ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("user")}
            >
              Người dùng
            </button>
            <button
              className={`px-4 py-2 font-semibold rounded-full shadow-sm transition-colors ${
                activeTab === "system"
                  ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("system")}
            >
              Hệ thống
            </button>
          </div>

          {/* Danh sách thông báo */}
          <div className="flex flex-col gap-3">
            {(activeTab === "system"
              ? systemNotifications
              : userNotifications
            ).map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition-colors border border-gray-200"
              >
                <MailOutlineIcon className="text-green-500 mt-1" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {notification.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BasePage>
    </div>
  );
};

export default NotificationPage;
