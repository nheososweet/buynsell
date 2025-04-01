import BasePage from "@/layouts/base-page";
import "./style.scss";
import { useEffect, useState } from "react";
type Props = {};

import { useNavigate } from "react-router-dom";
import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import InfoPopup from "@/components/InfoPopup/info-popup";
import { apiGetCategoryWithProduct } from "./service";
import { useApi } from "@/contexts/APIContext";

const SellerHomePage = ({}: Props) => {
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const { categories } = useApi();

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
  const handleToChildren = (id: number) => {
    nav(`/seller/home/${id}`);
  };

  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Trang chủ"
      >
        <div className="pb-2">
          <img src="/assets/seller_bg.png" alt="" />
          <div className="px-4">
            <p className="text-lg italic text-blue-600 text-center pt-3">
              Bảng giá phế liệu tham khảo
            </p>
            <div className="flex flex-col gap-4 pt-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="border border-gray-900 shadow-md p-3 flex flex-col gap-2"
                  onClick={() => handleToChildren(category.id)}
                >
                  <p className="font-bold">{category.name}:</p>
                  <p className="text-[15px]">
                    {category.product_names.join(", ")}
                  </p>
                </div>
              ))}
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

export default SellerHomePage;
