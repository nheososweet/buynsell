import { useNavigate } from "react-router-dom";
import { tabs, TabStatus } from ".";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import { useState } from "react";
import InfoPopup from "@/components/InfoPopup/info-popup";
import { useApi } from "@/contexts/APIContext";
import { apiCancelOrder, IOrder } from "./service";
interface OrderListProps {
  selectedStatus: TabStatus;
}

interface SellerOrderItemProps {
  order: IOrder;
  selectedStatus: TabStatus;
}

const SellerOrderItem: React.FC<SellerOrderItemProps> = ({
  order,
  selectedStatus,
}) => {
  const { fetchOrders } = useApi();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const onConfirm = async () => {
    try {
      await apiCancelOrder(order.id);
      await fetchOrders();
      setOpen(false);
      setIsOpenInfo(true);
    } catch (error) {
      console.log("🚀 ~ onConfirm ~ error:", error);
    }
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
        onClick={() => nav(`/seller/order/${order.id}`)}
      >
        {/* Left Section: Order Details */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-primary-color font-semibold">
              {order.start_time} → {order.end_time}
            </span>
            {/* <button className="text-green-500 text-xl font-bold">
              <CloseIcon />
            </button> */}
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            {order.category_name}
          </h3>
          <div className="text-gray-700 flex gap-2">
            <span className="font-semibold">Sản phẩm:</span>{" "}
            <div className="flex-1 flex flex-col gap-2">
              {order.products.map((product, index) => (
                <div key={index}>
                  <span className="">
                    {product.name}: {product.quantity}({product.unit})
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-700">
            <span className="font-semibold">Địa chỉ:</span> {order.address}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Số điện thoại:</span>{" "}
            {order.phone_number}
          </p>
        </div>

        {selectedStatus === TabStatus.REQUESTED && (
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
  console.log("🚀 ~ OrderList ~ selectedStatus:", selectedStatus);
  const { orders } = useApi();
  console.log("🚀 ~ OrderList ~ orders:", orders);

  // Lấy danh sách đơn hàng theo selectedStatus, mặc định là mảng rỗng nếu không có
  const orderList =
    orders && orders[selectedStatus] ? orders[selectedStatus] : [];

  return (
    <div className="pt-6 h-[calc(100vh-150px-82px)] overflow-y-auto">
      {orderList.length > 0 ? (
        orderList.map((order, idx) => (
          <SellerOrderItem
            key={order.id}
            order={order}
            selectedStatus={selectedStatus}
          /> // Dùng order.id thay vì idx để key unique
        ))
      ) : (
        <p className="text-center text-sm text-gray-500">
          Không có đơn hàng nào ở trạng thái{" "}
          <span className="font-medium text-primary-color">
            {tabs.find((t) => t.id === selectedStatus)?.label}
          </span>
        </p>
      )}
    </div>
  );
}

export default OrderList;
