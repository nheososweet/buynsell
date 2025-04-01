import BasePage from "@/layouts/base-page";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const NotiDetailPage = ({}: Props) => {
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL

  // Dữ liệu giả lập cho chi tiết thông báo
  const notifications = [
    {
      id: "1",
      type: "system",
      title: "GREENGO TRỞ LẠI SAU TẾT",
      date: "25/02/2025 10:36:15",
      content:
        "GreenGo xin thông báo tới quý khách hàng, sau thời gian nghỉ Lễ Tết thì hôm nay GreenGo sẽ hoạt động trở lại, rất mong chờ sự ủng hộ của quý khách hàng!",
      image: "/assets/welcome-back.jpg", // Ảnh minh họa
    },
    {
      id: "3",
      type: "user",
      title:
        "Phiếu đã nhận đơn thu gom Kim loại của bạn yêu cầu lúc 10 giờ sáng.",
      date: "25/02/2025 10:36:15",
      orderDetails: {
        category: "Kim loại",
        items: [
          { name: "Sắt", quantity: "3kg" },
          { name: "Thép", quantity: "2kg" },
        ],
        status: "Bận vỏ chai đã sử dụng",
        time: "27/02/2025 - 10:00",
        address: "Số nhà 02, Xã Phú Minh, Thành phố Hà Nội",
        phone: "03785341231",
      },
      collectorInfo: {
        name: "Phí Thắm",
        phone: "0372721234",
        time: "27/02/2025 - 10:00",
        address: "Số nhà 14, Xã Phú Minh, Thành phố Hà Nội",
      },
    },
  ];

  // Tìm thông báo theo ID
  const notification = notifications.find((notif) => notif.id === id);

  if (!notification) {
    return (
      <div>
        <BasePage
          topLeftTitle=""
          topNodeLeft={<h1>Buy</h1>}
          topLeftSubTitle=""
          bottomRightNode={<h1>Buy</h1>}
          title="Chi tiết thông báo"
          isBackLayout="/seller/noti"
        >
          <div className="px-4 pt-4 pb-2">
            <p className="text-center text-gray-600">
              Không tìm thấy thông báo
            </p>
          </div>
        </BasePage>
      </div>
    );
  }

  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Chi tiết thông báo"
        isBackLayout="/seller/noti"
      >
        <div className="px-4 pt-4 pb-2 flex flex-col gap-4">
          {/* Tiêu đề và thời gian */}
          <div>
            <h2 className="text-lg font-semibold text-blue-600">
              {notification.title}
            </h2>
            <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
          </div>

          {/* Nội dung thông báo */}
          {notification.type === "system" ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-700">{notification.content}</p>
              {notification.image && (
                <img
                  src={notification.image}
                  alt="Notification"
                  className="w-full h-48 object-cover rounded-lg shadow-sm"
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-700">{notification.title}</p>

              {/* Chi tiết đơn hàng */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Chi tiết đơn hàng
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Danh mục:</span>{" "}
                    {notification.orderDetails?.category}
                  </p>
                  <div>
                    <p className="text-sm text-gray-700 font-medium">
                      Sản phẩm:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {notification.orderDetails?.items.map((item, index) => (
                        <li key={index}>
                          {item.name}: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Hành động:</span>{" "}
                    {notification.orderDetails?.status}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Thời gian:</span>{" "}
                    {notification.orderDetails?.time}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Địa chỉ:</span>{" "}
                    {notification.orderDetails?.address}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Liên hệ:</span>{" "}
                    {notification.orderDetails?.phone}
                  </p>
                </div>
              </div>

              {/* Thông tin người thu gom */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  Thông tin người thu gom
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Họ tên:</span>{" "}
                    {notification.collectorInfo?.name}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Số điện thoại:</span>{" "}
                    {notification.collectorInfo?.phone}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Thời gian:</span>{" "}
                    {notification.collectorInfo?.time}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Địa chỉ:</span>{" "}
                    {notification.collectorInfo?.address}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </BasePage>
    </div>
  );
};

export default NotiDetailPage;
