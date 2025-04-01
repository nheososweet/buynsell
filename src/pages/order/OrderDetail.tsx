import BasePage from "@/layouts/base-page";
import "./style.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
type Props = {};

import { useNavigate } from "react-router-dom";
import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import InfoPopup from "@/components/InfoPopup/info-popup";

const tabs = [
  { id: "REQUESTED", label: "Yêu cầu thu gom" },
  { id: "CONFIRMED", label: "Xác nhận thu gom" },
  { id: "COMPLETED", label: "Hoàn thành thu gom" },
  { id: "CANCELED", label: "Đơn thu gom bị hủy" },
];
const OrderDetailPage = ({}: Props) => {
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

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
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Chi tiết đơn hàng"
      >
        <div className="px-4 pt-4 pb-2">
          <div>
            <div className="border border-primary-color rounded-md p-3 flex flex-col gap-3">
              <div className="flex gap-3">
                <img
                  src="/assets/map.png"
                  className="w-[70px] h-[70px] object-cover "
                  alt=""
                />
                <div className="flex flex-col justify-around">
                  <p className="text-[15px] font-semibold text-primary-color">
                    Thanh Thảo
                  </p>
                  <p className="text-sm">24/02/2025 - 13:00:02</p>
                  <p className="text-sm">
                    Số nhà 02, Xã Phú Minh, Thành phố Hà Nộii
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <div className="grid grid-cols-3 gap-3">
                  <p>Loại rác: </p>
                  <p className="col-span-2 space-x-8">
                    <span>Sắt</span>
                    <span>Thép</span>
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <p>Khối lượng:</p>
                  <p className="col-span-2 space-x-8">
                    <span>Sắt: 1kg</span>
                    <span>Thép: 2kg</span>
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <p>Thời gian thu gom: </p>
                  <p className="col-span-2">10h00 ngày 27/02/2025</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <p>Liên hệ: </p>
                  <p className="col-span-2">03785341231</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <p>Hình ảnh: </p>
                  <div className="col-span-2 ">
                    <img
                      src="/assets/sat.jpg"
                      className="w-full max-h-[150px] object-cover "
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="text-white px-3 py-1 rounded-md bg-yellow-500"
                    onClick={() => nav(`/buyer/forum/1`)}
                  >
                    Bài viết
                  </button>
                  <button
                    className="text-white px-3 py-1 rounded-md bg-blue-500"
                    // onClick={() => nav("/buyer/chat/1")}
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    className="text-white px-3 py-1 rounded-md bg-primary-color"
                    // onClick={() => setIsOpen(true)}
                    onClick={() => nav(`/payment`)}
                  >
                    Mua ngay
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

export default OrderDetailPage;
