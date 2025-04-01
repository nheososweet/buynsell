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

  // Reset districts và wards khi chọn province mới
  const handleProvinceSelect = (item: AutocompleteItem | null) => {
    setTempAddress({
      ...tempAddress,
      province: item,
      district: null, // Reset district khi chọn province mới
      ward: null, // Reset ward khi chọn province mới
    });
    if (item) {
      fetchAddressByParent(parseInt(item.id), "district");
    }
  };

  // Reset wards khi chọn district mới
  const handleDistrictSelect = (item: AutocompleteItem | null) => {
    setTempAddress({
      ...tempAddress,
      district: item,
      ward: null, // Reset ward khi chọn district mới
    });
    if (item) {
      fetchAddressByParent(parseInt(item.id), "ward");
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

  // Khi popup mở, nếu đã có province hoặc district được chọn trước đó, fetch dữ liệu tương ứng
  useEffect(() => {
    if (isOpen) {
      if (tempAddress.province && !districts.length) {
        fetchAddressByParent(parseInt(tempAddress.province.id), "district");
      }
      if (tempAddress.district && !wards.length) {
        fetchAddressByParent(parseInt(tempAddress.district.id), "ward");
      }
    }
  }, [
    isOpen,
    tempAddress.province,
    tempAddress.district,
    districts.length,
    wards.length,
    fetchAddressByParent,
  ]);

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
          items={provinces.map((p) => ({ id: p.id.toString(), name: p.name }))}
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
          items={districts.map((d) => ({ id: d.id.toString(), name: d.name }))}
          selectedItem={tempAddress.district}
          onSelect={handleDistrictSelect}
          placeholder="Chọn quận/huyện"
          required
          errorText="Vui lòng chọn quận/huyện"
          wrapperAdditionalClass="!w-full"
          inputAdditionalClass="!w-full"
          disabled={!tempAddress.province} // Disable nếu chưa chọn tỉnh
        />
        <Autocomplete
          label="Phường/Xã"
          items={wards.map((w) => ({ id: w.id.toString(), name: w.name }))}
          selectedItem={tempAddress.ward}
          onSelect={handleWardSelect}
          placeholder="Chọn phường/xã"
          required
          errorText="Vui lòng chọn phường/xã"
          wrapperAdditionalClass="!w-full"
          inputAdditionalClass="!w-full"
          disabled={!tempAddress.district} // Disable nếu chưa chọn quận/huyện
        />
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Địa chỉ chi tiết
          </label>
          <input
            type="text"
            value={tempAddress.detail}
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
