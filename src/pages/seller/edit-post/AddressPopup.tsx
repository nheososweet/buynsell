import Dialog from "@/components/Dialog";
import Autocomplete, { AutocompleteItem } from "@/components/Form/Autocomplete";
import { useApi } from "@/contexts/APIContext";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  title?: string;
  address: {
    province: AutocompleteItem | null;
    district: AutocompleteItem | null;
    ward: AutocompleteItem | null;
    detail: string;
  };
  onConfirm: (address: {
    province: AutocompleteItem | null;
    district: AutocompleteItem | null;
    ward: AutocompleteItem | null;
    detail: string;
  }) => void;
  onCancel: () => void;
  additionClass?: string;
};

function AddressPopup({
  isOpen,
  title = "Chọn địa chỉ",
  address,
  onConfirm,
  onCancel,
  additionClass,
}: Props) {
  const { provinces, districts, wards, fetchAddressByParent } = useApi();
  const [tempAddress, setTempAddress] = useState(address);
  console.log("🚀 ~ address:", address);

  // Đồng bộ tempAddress với address prop khi popup mở
  useEffect(() => {
    if (isOpen) {
      setTempAddress(address);
    }
  }, [isOpen, address]);

  // Fetch districts/wards khi province hoặc district thay đổi
  useEffect(() => {
    if (isOpen && tempAddress.province && !districts.length) {
      fetchAddressByParent(tempAddress.province.id, "district");
    }
    if (isOpen && tempAddress.district && !wards.length) {
      fetchAddressByParent(tempAddress.district.id, "ward");
    }
  }, [
    isOpen,
    tempAddress.province,
    tempAddress.district,
    districts.length,
    wards.length,
    fetchAddressByParent,
  ]);

  // Reset districts và wards khi chọn province mới
  const handleProvinceSelect = (item: AutocompleteItem | null) => {
    setTempAddress({
      ...tempAddress,
      province: item,
      district: null,
      ward: null,
    });
    if (item) {
      fetchAddressByParent(item.id, "district");
    }
  };

  // Reset wards khi chọn district mới
  const handleDistrictSelect = (item: AutocompleteItem | null) => {
    setTempAddress({
      ...tempAddress,
      district: item,
      ward: null,
    });
    if (item) {
      fetchAddressByParent(item.id, "ward");
    }
  };

  const handleWardSelect = (item: AutocompleteItem | null) => {
    setTempAddress({ ...tempAddress, ward: item });
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempAddress({ ...tempAddress, detail: e.target.value });
  };

  const handleConfirm = () => {
    onConfirm(tempAddress);
    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Dialog
      title={title}
      isOpen={isOpen}
      onClose={handleCancel}
      actionButtonCancel={handleCancel}
      actionButtonConfirm={handleConfirm}
      buttonConfirmLabel="Xác nhận"
      additionClass={`w-[420px] ${additionClass || ""}`}
    >
      <div className="p-5 flex flex-col gap-4">
        <Autocomplete
          label="Tỉnh/Thành phố"
          items={provinces.map((p) => ({ id: p.id, name: p.name }))}
          selectedItem={tempAddress.province}
          onSelect={handleProvinceSelect}
          placeholder="Chọn tỉnh/thành phố"
          required
          errorText="Vui lòng chọn tỉnh/thành phố"
          wrapperAdditionalClass="!w-full"
          inputAdditionalClass="!w-full"
        />
        <Autocomplete
          label="Quận/Huyện"
          items={districts.map((d) => ({ id: d.id, name: d.name }))}
          selectedItem={tempAddress.district}
          onSelect={handleDistrictSelect}
          placeholder="Chọn quận/huyện"
          required
          errorText="Vui lòng chọn quận/huyện"
          wrapperAdditionalClass="!w-full"
          inputAdditionalClass="!w-full"
          disabled={!tempAddress.province}
        />
        <Autocomplete
          label="Phường/Xã"
          items={wards.map((w) => ({ id: w.id, name: w.name }))}
          selectedItem={tempAddress.ward}
          onSelect={handleWardSelect}
          placeholder="Chọn phường/xã"
          required
          errorText="Vui lòng chọn phường/xã"
          wrapperAdditionalClass="!w-full"
          inputAdditionalClass="!w-full"
          disabled={!tempAddress.district}
        />
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Địa chỉ chi tiết
          </label>
          <input
            type="text"
            value={tempAddress.detail || ""} // Đảm bảo hiển thị rỗng nếu null
            onChange={handleDetailChange}
            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800"
            placeholder="Nhập địa chỉ chi tiết"
          />
        </div>
      </div>
    </Dialog>
  );
}

export default AddressPopup;
