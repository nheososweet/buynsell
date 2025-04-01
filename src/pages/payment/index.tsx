import BasePage from "@/layouts/base-page";
import "./style.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import InfoPopup from "@/components/InfoPopup/info-popup";

type Props = {};

const tabs = [
  { id: "REQUESTED", label: "Yêu cầu thu gom" },
  { id: "CONFIRMED", label: "Xác nhận thu gom" },
  { id: "COMPLETED", label: "Hoàn thành thu gom" },
  { id: "CANCELED", label: "Đơn thu gom bị hủy" },
];

const PaymentPage = ({}: Props) => {
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [titleInfo, setTitleInfo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("vnpay"); // Thêm state để theo dõi phương thức thanh toán

  const onConfirm = () => {
    setIsOpen(false);
    setIsOpenInfo(true);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const onCancelInfo = () => {
    setIsOpenInfo(false);
    nav("/buyer/order");
  };

  const handleOpenInfoPopup = (title: string) => {
    setTitleInfo(title);
    setIsOpenInfo(true);
  };

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Thanh toán"
      >
        <div className="bg-white h-[calc(100vh-70px-75px)] relative px-6 pt-6 overflow-y-auto">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">
            Thanh Thảo
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Địa chỉ: Số nhà 02, Xã Phú Minh, Thanh phố Hà Nội
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Loại rác:</span>
              <span className="text-gray-800 font-medium">Sắt</span>
              <span className="text-gray-800 font-medium">Thép</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Khối lượng:</span>
              <span className="text-gray-800 font-medium">Sắt: 1 kg</span>
              <span className="text-gray-800 font-medium">Thép: 2kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thời gian thu gom:</span>
              <span className="text-gray-800">10h00 ngày 27/02/2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Liên hệ:</span>
              <span className="text-gray-800">03785341231</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-gray-600">Hình ảnh:</span>
              <img
                src="/assets/sat.jpg"
                className="w-full max-h-[150px] object-cover"
                alt=""
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">
                Khối lượng thực tế *
              </label>
              <input
                type="text"
                placeholder="Nhập khối lượng thực tế"
                className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Đơn giá *</label>
              <input
                type="text"
                placeholder="Nhập đơn giá"
                className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Thành tiền</label>
              <input
                type="text"
                placeholder="Thành tiền sẽ được tính tự động"
                disabled
                className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-800"
              />
            </div>
          </div>
          <div className="mt-6 space-y-3 pb-6">
            <div className="flex items-center">
              <input
                id="cod"
                type="radio"
                name="payment"
                className="mr-2"
                onChange={() => handlePaymentMethodChange("cod")}
                checked={paymentMethod === "cod"}
              />
              <label
                htmlFor="cod"
                className="flex items-center gap-1 flex-1 justify-between"
              >
                <span className="text-gray-600">Thanh toán khi nhận hàng</span>
                <img
                  src="/assets/cod.png"
                  alt=""
                  className="h-6 w-auto object-cover"
                />
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="vnpay"
                type="radio"
                name="payment"
                className="mr-2"
                onChange={() => handlePaymentMethodChange("vnpay")}
                checked={paymentMethod === "vnpay"}
              />
              <label
                htmlFor="vnpay"
                className="flex items-center gap-1 flex-1 justify-between"
              >
                <span className="text-gray-600">VNPAY</span>
                <img
                  src="/assets/vnpay.png"
                  alt=""
                  className="h-6 w-auto object-cover"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 italic">
              Thanh toán qua VNPAY bạn có thể thanh toán bằng thẻ tín dụng nếu
              bạn không có tài khoản VNPAY
            </p>
            {paymentMethod === "vnpay" && (
              <div className="mt-4">
                <img
                  src="/assets/qrcode.png"
                  alt="QR Code"
                  className="w-40 h-40 mx-auto object-contain"
                />
              </div>
            )}
          </div>
          <div className="sticky bottom-0 left-0 right-0 pb-3 w-full bg-white border-none">
            <button
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 border-none"
              onClick={() => handleOpenInfoPopup("Thanh toán thành công")}
            >
              Thanh toán
            </button>
          </div>
        </div>

        <ConfirmActionPopup
          title="Bạn có chắc chắn muốn nhận đơn không?"
          isOpen={isOpen}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />

        <InfoPopup
          title={titleInfo}
          isOpen={isOpenInfo}
          type="success"
          onClose={onCancelInfo}
        />
      </BasePage>
    </div>
  );
};

export default PaymentPage;
