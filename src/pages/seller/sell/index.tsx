import BasePage from "@/layouts/base-page";
import "./style.scss";
import { useEffect, useState } from "react";
type Props = {};

import { useNavigate } from "react-router-dom";
import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import InfoPopup from "@/components/InfoPopup/info-popup";
import { apiGetCategoryWithProduct } from "../home/service";

const SellerSellPage = ({ }: Props) => {
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [categories, setCategories] = useState<
    {
      id: number;
      code: string;
      name: string;
      product_names: string[];
      products: {
        id: number;
        code: string;
        name: string;
        unit: string;
      }[];
    }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiGetCategoryWithProduct();
        const transformedData = response.data.map((item: any) => ({
          id: item.id.toString(),
          code: item.code,
          name: item.name,
          product_names: item.product_names,
          products: item.products,
        }));
        setCategories(transformedData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
  const handleNavToDetail = () => {
    nav("/seller/home/1");
  };

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  console.log("🚀 ~ SellerSellPage ~ selectedCategory:", selectedCategory);
  const [selectedItems, setSelectedItems] = useState<
    { id: number; name: string; quantity: number }[] // Thêm name vào
  >([]);
  console.log("🚀 ~ SellerSellPage ~ selectedItems:", selectedItems);

  const toggleCategory = (id: number) => {
    setSelectedCategory(selectedCategory === id ? null : id);
  };

  const handleCheckboxChange = (
    productId: number,
    productName: string, // Thêm tham số productName
    checked: boolean,
    quantity: string = "0"
  ) => {
    setSelectedItems((prev) => {
      if (checked) {
        const existingItem = prev.find((item) => item.id === productId);
        if (existingItem) {
          return prev.map((item) =>
            item.id === productId
              ? { ...item, quantity: parseFloat(quantity) || 0 }
              : item
          );
        } else {
          return [
            ...prev,
            {
              id: productId,
              name: productName,
              quantity: parseFloat(quantity) || 0,
            }, // Thêm name
          ];
        }
      } else {
        return prev.filter((item) => item.id !== productId);
      }
    });
  };
  const handleContinue = () => {
    const selectedCategoryData = categories.find(
      (category) => category.id === selectedCategory
    );

    const state = {
      category: {
        id: selectedCategory || 0,
        name: selectedCategoryData?.name || "",
        products: selectedItems, // selectedItems giờ có cả name
      },
    };

    nav("/seller/create-post", { state });
  };

  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Tôi bán"
      >
        <div className="pb-2 pt-6">
          <div className="px-6">
            <div className="bg-[#C9F5D4] p-4">
              <div className="flex items-center gap-2 justify-center pb-6">
                <img src="/assets/toiban.png" className=" h-[58px]" alt="" />
                <p className="text-xl font-bold text-sub-primary-color italic">
                  Chọn rác muốn bán
                </p>
              </div>
              <div>
                {categories.map((category) => (
                  <div key={category.name} className="mb-3">
                    <label className="flex gap-2 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        onChange={() => toggleCategory(category.id)}
                        checked={selectedCategory === category.id}
                      />
                      <div>
                        <p>{category.name}</p>
                        <p className="text-sm font-normal">
                          {category.product_names.join(", ")}
                        </p>
                      </div>
                    </label>

                    {selectedCategory === category.id &&
                      category.products.length > 0 && (
                        <div className="ml-6 mt-2 flex flex-col gap-2">
                          {category.products.map((product) => {
                            const selectedItem = selectedItems.find(
                              (item) => item.id === product.id
                            );
                            return (
                              <div
                                key={product.id}
                                className="flex flex-col gap-1"
                              >
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={!!selectedItem}
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        product.id,
                                        product.name, // Truyền product.name
                                        e.target.checked,
                                        selectedItem?.quantity.toString() || "0"
                                      )
                                    }
                                  />
                                  {product.name}
                                </label>
                                <input
                                  type="text"
                                  className="border rounded px-2 py-1 w-full"
                                  placeholder={product.unit}
                                  value={selectedItem?.quantity || ""}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      product.id,
                                      product.name, // Truyền product.name
                                      true,
                                      e.target.value
                                    )
                                  }
                                  disabled={!selectedItem}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center pt-6">
              <button
                className="text-xl font-bold text-white bg-primary-color rounded-full px-6 py-3"
                onClick={handleContinue}
              >
                Tiếp tục
              </button>
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

export default SellerSellPage;
