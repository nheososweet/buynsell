import BasePage from "@/layouts/base-page";
import "./style.scss";
import { useEffect, useState } from "react";
type Props = {};

import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import InfoPopup from "@/components/InfoPopup/info-popup";
import { useParams } from "react-router-dom";
import { apiGetProductByCategory } from "./service";

const SellerHomeDetailPage = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [categories, setCategories] = useState<
    {
      id: number;
      paren_id: number;
      code: string;
      name: string;
      image: string | null;
    }[]
  >([]);

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

  const { id } = useParams<{ id: string }>();
  const categoryId = id ? Number(id) : null;
  const getCategoryByParent = async () => {
    if (categoryId === null || isNaN(categoryId)) {
      return;
    }
    const response = await apiGetProductByCategory(categoryId);
    const transformedData = response.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.image || "assets/bao.png",
    }));
    setCategories(transformedData);
  };

  useEffect(() => {
    getCategoryByParent();
  }, [categoryId]);
  console.log(categories);
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
            <p className="text-lg text-red-600 font-semibold text-center pt-3">
              Rác tái chế
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="border border-gray-900 shadow-md p-3 flex flex-col items-center gap-1 h-[118px]"
                >
                  <img
                    src={category.image || "/assets/no_img.png"}
                    alt={category.name}
                    className="h-[70%] object-cover"
                  />
                  <p className="uppercase text-sm font-medium text-sub-primary-color">
                    {category.name}
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

export default SellerHomeDetailPage;
