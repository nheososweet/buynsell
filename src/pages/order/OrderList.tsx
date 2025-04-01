import { useNavigate } from "react-router-dom";
import { TabStatus } from ".";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import { useState } from "react";
import InfoPopup from "@/components/InfoPopup/info-popup";
interface OrderListProps {
  selectedStatus: TabStatus;
}

export interface IOrder {
  date: string;
  time: string;
  location: string;
  phone: string;
  note: string;
  pickupTime: string;
  status: string;
}

const orderList: IOrder[] = [
  // Status: REQUESTED (Yêu cầu thu gom) - 5 đơn
  {
    date: "01/03/2025",
    time: "08:30",
    location: "Thành Thọ, Địa chỉ: Số 12, Ngõ 45, Xã Phú Minh, Hà Nội",
    phone: "09445362727",
    note: "Loại rác: Sắt, Thép",
    pickupTime: "14h00 ngày 01/03/2025",
    status: "REQUESTED",
  },
  {
    date: "01/03/2025",
    time: "09:15",
    location: "Mai Thủy, Địa chỉ: Số 8, Ngõ 72, Chùa Bộc, Hà Nội",
    phone: "0947362237463",
    note: "Loại rác: Nhựa",
    pickupTime: "10h00 ngày 02/03/2025",
    status: "REQUESTED",
  },
  {
    date: "02/03/2025",
    time: "07:20",
    location: "Thải Hà, Địa chỉ: Số 20, Ngõ 33, Hà Nội",
    phone: "09123456789",
    note: "Loại rác: Giấy",
    pickupTime: "09h00 ngày 03/03/2025",
    status: "REQUESTED",
  },
  {
    date: "02/03/2025",
    time: "11:45",
    location: "Hà Đông, Địa chỉ: Số 5, Ngõ 18, Hà Nội",
    phone: "09345678901",
    note: "Loại rác: Thủy tinh",
    pickupTime: "15h00 ngày 02/03/2025",
    status: "REQUESTED",
  },
  {
    date: "03/03/2025",
    time: "06:50",
    location: "Cầu Giấy, Địa chỉ: Số 15, Ngõ 99, Hà Nội",
    phone: "09234567890",
    note: "Loại rác: Vải vụn",
    pickupTime: "11h00 ngày 03/03/2025",
    status: "REQUESTED",
  },

  // Status: CONFIRMED (Xác nhận thu gom) - 5 đơn
  {
    date: "03/03/2025",
    time: "10:10",
    location: "Thanh Xuân, Địa chỉ: Số 25, Ngõ 66, Hà Nội",
    phone: "09445362727",
    note: "Loại rác: Nhôm",
    pickupTime: "14h00 ngày 03/03/2025",
    status: "CONFIRMED",
  },
  {
    date: "04/03/2025",
    time: "08:00",
    location: "Hoàn Kiếm, Địa chỉ: Số 3, Ngõ 12, Hà Nội",
    phone: "0947362237463",
    note: "Loại rác: Giấy vụn",
    pickupTime: "10h00 ngày 04/03/2025",
    status: "CONFIRMED",
  },
  {
    date: "04/03/2025",
    time: "09:30",
    location: "Đống Đa, Địa chỉ: Số 18, Ngõ 55, Hà Nội",
    phone: "09123456789",
    note: "Loại rác: Nhựa tái chế",
    pickupTime: "13h00 ngày 04/03/2025",
    status: "CONFIRMED",
  },
  {
    date: "05/03/2025",
    time: "07:15",
    location: "Ba Đình, Địa chỉ: Số 9, Ngõ 77, Hà Nội",
    phone: "09345678901",
    note: "Loại rác: Sắt vụn",
    pickupTime: "09h00 ngày 05/03/2025",
    status: "CONFIRMED",
  },
  {
    date: "05/03/2025",
    time: "11:00",
    location: "Long Biên, Địa chỉ: Số 30, Ngõ 88, Hà Nội",
    phone: "09234567890",
    note: "Loại rác: Thủy tinh",
    pickupTime: "15h00 ngày 05/03/2025",
    status: "CONFIRMED",
  },

  // Status: COMPLETED (Hoàn thành thu gom) - 5 đơn
  {
    date: "06/03/2025",
    time: "06:45",
    location: "Hai Bà Trưng, Địa chỉ: Số 7, Ngõ 44, Hà Nội",
    phone: "09445362727",
    note: "Loại rác: Nhựa",
    pickupTime: "10h00 ngày 06/03/2025",
    status: "COMPLETED",
  },
  {
    date: "06/03/2025",
    time: "09:20",
    location: "Tây Hồ, Địa chỉ: Số 14, Ngõ 22, Hà Nội",
    phone: "0947362237463",
    note: "Loại rác: Giấy",
    pickupTime: "11h00 ngày 06/03/2025",
    status: "COMPLETED",
  },
  {
    date: "07/03/2025",
    time: "08:10",
    location: "Hoàng Mai, Địa chỉ: Số 21, Ngõ 33, Hà Nội",
    phone: "09123456789",
    note: "Loại rác: Sắt",
    pickupTime: "14h00 ngày 07/03/2025",
    status: "COMPLETED",
  },
  {
    date: "07/03/2025",
    time: "10:30",
    location: "Thanh Trì, Địa chỉ: Số 16, Ngõ 11, Hà Nội",
    phone: "09345678901",
    note: "Loại rác: Thủy tinh",
    pickupTime: "13h00 ngày 07/03/2025",
    status: "COMPLETED",
  },
  {
    date: "08/03/2025",
    time: "07:00",
    location: "Nam Từ Liêm, Địa chỉ: Số 28, Ngõ 99, Hà Nội",
    phone: "09234567890",
    note: "Loại rác: Nhôm",
    pickupTime: "09h00 ngày 08/03/2025",
    status: "COMPLETED",
  },

  // Status: CANCELED (Đơn thu gom bị hủy) - 5 đơn
  {
    date: "08/03/2025",
    time: "09:50",
    location: "Bắc Từ Liêm, Địa chỉ: Số 4, Ngõ 66, Hà Nội",
    phone: "09445362727",
    note: "Loại rác: Giấy",
    pickupTime: "10h00 ngày 08/03/2025",
    status: "CANCELED",
  },
  {
    date: "09/03/2025",
    time: "08:20",
    location: "Đông Anh, Địa chỉ: Số 19, Ngõ 55, Hà Nội",
    phone: "0947362237463",
    note: "Loại rác: Nhựa",
    pickupTime: "11h00 ngày 09/03/2025",
    status: "CANCELED",
  },
  {
    date: "09/03/2025",
    time: "10:00",
    location: "Gia Lâm, Địa chỉ: Số 11, Ngõ 77, Hà Nội",
    phone: "09123456789",
    note: "Loại rác: Sắt",
    pickupTime: "14h00 ngày 09/03/2025",
    status: "CANCELED",
  },
  {
    date: "10/03/2025",
    time: "07:30",
    location: "Sơn Tây, Địa chỉ: Số 22, Ngõ 88, Hà Nội",
    phone: "09345678901",
    note: "Loại rác: Thủy tinh",
    pickupTime: "09h00 ngày 10/03/2025",
    status: "CANCELED",
  },
  {
    date: "10/03/2025",
    time: "11:15",
    location: "Thường Tín, Địa chỉ: Số 27, Ngõ 44, Hà Nội",
    phone: "09234567890",
    note: "Loại rác: Nhôm",
    pickupTime: "15h00 ngày 10/03/2025",
    status: "CANCELED",
  },
];

interface OrderItemProps {
  order: IOrder;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const onConfirm = () => {
    setOpen(false);
    setIsOpenInfo(true);
  };
  const onCancel = () => {
    setOpen(false);
  };

  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const onConfirmInfo = () => {
    setIsOpenInfo(false);
  };
  return (
    <>
      <div
        className="border border-green-500 rounded-lg p-4 mb-4 flex flex-col gap-3"
        onClick={() => nav(`/buyer/order/1`)}
      >
        {/* Left Section: Order Details */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-primary-color font-semibold">
              {order.date} {order.time}
            </span>
            <button className="text-green-500 text-xl font-bold">
              <CloseIcon />
            </button>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mt-1">
            {order.location.split(",")[0]}
          </h3>
          <p className="text-gray-700">
            <span className="font-semibold">Địa chỉ:</span> {order.location}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Số điện thoại:</span> {order.phone}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Loại rác:</span> {order.note}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Thời gian:</span> {order.pickupTime}
          </p>
        </div>

        {(order.status === TabStatus.REQUESTED ||
          order.status === TabStatus.CONFIRMED) && (
          <div className="flex justify-end">
            <button
              className="px-2 py-1 text-xs text-white font-medium bg-red-500 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
            >
              Hủy đơn
            </button>
          </div>
        )}
      </div>
      <ConfirmActionPopup
        isOpen={open}
        title=""
        subTitle=""
        onConfirm={onConfirm}
        onCancel={onCancel}
        children={
          <div className="p-6 max-w-lg mx-auto text-gray-800 font-sans">
            <h2 className="text-blue-800 text-2xl font-semibold text-center border-b-2 border-blue-600 pb-2 mb-4">
              Lưu ý Hủy đơn
            </h2>
            <p className="text-base leading-6 mb-2">Quy định hủy nhự sau:</p>
            <p className="text-base leading-6 mb-2">
              Hủy trước giờ hẹn trên 8 tiếng: Phạt{" "}
              <span className="font-bold text-red-600">20.000vnd</span>
            </p>
            <p className="text-base leading-6 mb-2">
              Hủy trước giờ hẹn trên 2 tiếng: Phạt{" "}
              <span className="font-bold text-red-600">
                50% giá trị đơn hàng hủy
              </span>
            </p>
            <p className="text-base leading-6 mb-2">
              Hủy trước giờ hẹn dưới 2 tiếng: Phạt{" "}
              <span className="font-bold text-red-600">
                70% giá trị đơn hàng hủy
              </span>
            </p>
            <p className="italic text-gray-600 mt-4 border-l-4 border-blue-600 pl-3">
              Đối với trường hợp bạn đã đến nơi để lấy hàng nhưng không liên hệ
              được với khách hàng, bạn sẽ không bị phạt. Đồng thời, vì những đơn
              hàng mà nguồn bạn mở tạo sai so với thực tế đơn hàng nguồn mua đến
              lấy, bạn cũng sẽ không bị phạt.
            </p>
          </div>
        }
      />

      <InfoPopup
        title="Hủy đơn hàng thành công"
        isOpen={isOpenInfo}
        type="success"
        onClose={onConfirmInfo}
      />
    </>
  );
};
function OrderList({ selectedStatus }: OrderListProps) {
  return (
    <div className="pt-6 h-[calc(100vh-150px-82px)] overflow-y-auto">
      {orderList
        .filter((order) => order.status === selectedStatus)
        .map((order, idx) => (
          <OrderItem key={idx} order={order} />
        ))}
    </div>
  );
}

export default OrderList;
