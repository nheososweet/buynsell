import Dialog from "@/components/Dialog";
import { useEffect, useState } from "react";
import { useApi } from "@/contexts/APIContext";

type Props = {
  isOpen: boolean;
  title?: string;
  onConfirm: (category: {
    id: number;
    name: string;
    products: { id: number; name: string; quantity: number }[];
  }) => void;
  onCancel: () => void;
  additionClass?: string;
  initialCategory?: {
    id: number;
    name: string;
    products: { id: number; name: string; quantity: number }[];
  } | null; // Prop mới để nhận dữ liệu ban đầu
};

function SelectCategoryPopup({
  isOpen,
  title = "",
  onConfirm,
  onCancel,
  additionClass,
  initialCategory,
}: Props) {
  const { categories } = useApi();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<
    { id: number; name: string; quantity: number }[]
  >([]);

  // Điền dữ liệu ban đầu khi popup mở
  useEffect(() => {
    if (isOpen && initialCategory) {
      setSelectedCategory(initialCategory.id);
      setSelectedItems(initialCategory.products);
    }
  }, [isOpen, initialCategory]);

  const toggleCategory = (id: number) => {
    setSelectedCategory(selectedCategory === id ? null : id);
    if (selectedCategory !== id) {
      const category = categories.find((c) => c.id === id);
      if (category) {
        setSelectedItems(
          category.products.map((p) => ({
            id: p.id,
            name: p.name,
            quantity: 0, // Khởi tạo quantity là 0, người dùng sẽ chỉnh sửa
          }))
        );
      }
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (
    productId: number,
    productName: string,
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
            },
          ];
        }
      } else {
        return prev.filter((item) => item.id !== productId);
      }
    });
  };

  const handleConfirm = () => {
    const selectedCategoryData = categories.find(
      (category) => category.id === selectedCategory
    );
    if (selectedCategoryData && selectedItems.length > 0) {
      onConfirm({
        id: selectedCategory || 0,
        name: selectedCategoryData?.name || "",
        products: selectedItems,
      });
    }
  };

  const handleCancel = () => {
    setSelectedCategory(null);
    setSelectedItems([]);
    onCancel();
  };

  return (
    <Dialog
      title={title}
      isOpen={isOpen}
      onClose={handleCancel}
      actionButtonCancel={handleCancel}
      actionButtonConfirm={handleConfirm}
      buttonConfirmLabel="Tiếp tục"
      additionClass={`w-[500px] ${additionClass || ""}`}
    >
      <div className="p-5 flex flex-col gap-4">
        <div className="bg-[#C9F5D4] p-4 rounded-lg">
          <div className="flex items-center gap-2 justify-center pb-4">
            <img src="/assets/toiban.png" className="h-[48px]" alt="" />
            <p className="text-lg font-bold text-sub-primary-color italic">
              Chọn rác muốn bán
            </p>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
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
                          <div key={product.id} className="flex flex-col gap-1">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={!!selectedItem}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    product.id,
                                    product.name,
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
                                  product.name,
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
      </div>
    </Dialog>
  );
}

export default SelectCategoryPopup;
