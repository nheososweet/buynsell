import BasePage from "@/layouts/base-page";
import "./style.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
type Props = {};
import CancelIcon from "@mui/icons-material/Cancel";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import InfoPopup from "@/components/InfoPopup/info-popup";
import { useApi } from "@/contexts/APIContext";
import { IOrderDetail } from "../seller/order/OrderDetail";
import { apiAcceptOrder, apiGetDetailOrder } from "../seller/order/service";

const BuyDetailPage = ({}: Props) => {
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const { orders, user, fetchOrders } = useApi();
  const { id } = useParams();

  const [orderDetail, setOrderDetail] = useState<IOrderDetail | null>(null);
  console.log("🚀 ~ SellerOrderDetailPage ~ orderDetail:", orderDetail);

  const fetchDetail = async () => {
    const res = await apiGetDetailOrder(parseInt(id!));
    await fetchOrders();
    setOrderDetail(res.data);
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const onConfirm = async () => {
    await apiAcceptOrder(parseInt(id!));
    setIsOpen(false);
    setIsOpenInfo(true);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const onCancelInfo = () => {
    setIsOpenInfo(false);
    nav("/buyer/buy");
  };

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
                    className="absolute top-1/2 -translate-y-1/2 right-3 text-red-500"
                    onClick={() => setSearchQuery("")}
                  />
                )}
              </div>
              <div>
                <TuneIcon className="text-primary-color" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 h-[calc(100vh-374px)] overflow-auto">
            <div className="border border-primary-color rounded-md p-3 flex flex-col gap-3">
              <div className="flex gap-3">
                <img
                  src={user?.avatar || "/assets/no_img.png"}
                  className="w-[70px] h-[70px] object-cover rounded-full border border-gray-200"
                  alt=""
                />
                <div className="flex flex-col justify-around">
                  <p className="text-[15px] font-semibold text-primary-color">
                    {user?.name}
                  </p>
                  <p className="text-sm">{orderDetail?.end_time}</p>
                  <p className="text-sm">{orderDetail?.address}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <div className="grid grid-cols-3 gap-3">
                  <p>Loại rác: </p>
                  <p className="col-span-2 space-x-8">
                    <span>{orderDetail?.category_name}</span>
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <p>Khối lượng:</p>
                  <div>
                    {orderDetail?.products.map((product, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <p className="">{product.name}:</p>
                        <p className="">
                          {product.quantity}({product.unit})
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <p>Thời gian thu gom: </p>
                  <p className="col-span-2">{orderDetail?.end_time}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <p>Liên hệ: </p>
                  <p className="col-span-2">03785341231</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <p>Hình ảnh: </p>
                  <div className="grid grid-cols-1 gap-3">
                    {orderDetail?.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        className="w-full max-h-[150px] object-cover "
                        alt=""
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="text-white px-3 py-2 rounded-md bg-orange-500"
                    onClick={() => nav("/buyer/chat/1")}
                  >
                    Chat ngay
                  </button>
                  <button
                    className="text-white px-3 py-2 rounded-md bg-primary-color"
                    onClick={() => setIsOpen(true)}
                  >
                    Nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ConfirmActionPopup
          title="Bạn có chắc chắn muốn nhận đơn không?"
          isOpen={isOpen}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />

        <InfoPopup
          title="Bạn đã nhận đơn thành công!"
          isOpen={isOpenInfo}
          type="success"
          onClose={onCancelInfo}
        />
      </BasePage>
    </div>
  );
};

export default BuyDetailPage;
