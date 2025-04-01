import BasePage from "@/layouts/base-page";
import "./style.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
type Props = {};

import { useNavigate, useParams } from "react-router-dom";
import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import InfoPopup from "@/components/InfoPopup/info-popup";
import { apiGetDetailOrder } from "./service";
import { IPVersion } from "net";
import { useApi } from "@/contexts/APIContext";

export interface IOrderDetail {
  id: number;
  created_at: string;
  category_name: string;
  address: string;
  status: string;
  products: Product[];
  start_time: string;
  end_time: string;
  phone_number: string;
  images: string[];
}

export interface Product {
  name: string;
  unit: string;
  quantity: number;
}

const SellerOrderDetailPage = ({}: Props) => {
  const nav = useNavigate();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const { user } = useApi();

  const onConfirm = () => {
    setIsOpen(false);
    setIsOpenInfo(true);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const onCancelInfo = () => {
    setIsOpenInfo(false);
  };

  const [orderDetail, setOrderDetail] = useState<IOrderDetail | null>(null);
  console.log("🚀 ~ SellerOrderDetailPage ~ orderDetail:", orderDetail);

  const fetchDetail = async () => {
    const res = await apiGetDetailOrder(parseInt(id!));
    setOrderDetail(res.data);
  };

  React.useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Chi tiết đơn hàng"
      >
        {orderDetail ? (
          <div className="px-4 pt-4 pb-2">
            <div>
              <div className="border border-primary-color rounded-md p-3 flex flex-col gap-3">
                <div className="flex gap-3">
                  <img
                    src={user?.avatar || "assets/no_avatar.png"}
                    className="w-[70px] h-[70px] object-cover rounded-full border border-gray-200"
                    alt=""
                  />
                  <div className="flex flex-col justify-around">
                    <p className="text-[15px] font-semibold text-primary-color">
                      {user?.name}
                    </p>
                    <p className="text-sm">{orderDetail.end_time}</p>
                    <p className="text-sm">{orderDetail.address}</p>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="flex flex-col gap-4 pt-4 border-t">
                    <div className="grid grid-cols-3 gap-3">
                      <p>Loại rác: </p>
                      <p className="col-span-2 space-x-8 font-medium">
                        <span>{orderDetail.category_name}</span>
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <p>Khối lượng:</p>
                      <div>
                        {orderDetail.products.map((product, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <p className="font-medium">{product.name}:</p>
                            <p className="font-medium">
                              {product.quantity}({product.unit})
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <p>Thời gian thu gom: </p>
                      <div className="col-span-2 font-medium">
                        <p className="">{orderDetail.start_time} </p>
                        <p className="font-bold text-blue-600 pl-14">↓</p>
                        <p className="">{orderDetail.end_time}</p>
                      </div>
                    </div>
                    {orderDetail.phone_number && (
                      <div className="grid grid-cols-3 gap-3">
                        <p>Liên hệ: </p>
                        <p className="col-span-2  font-medium">
                          {orderDetail.phone_number}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      {orderDetail.images.map((img, idx) => (
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
              </div>
            </div>
          </div>
        ) : (
          <p className="pt-8 text-center  text-gray-400">Đang tải...</p>
        )}

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

export default SellerOrderDetailPage;
