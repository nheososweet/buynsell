import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BasePage from "@/layouts/base-page";
import "./style.scss";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import InfoPopup from "@/components/InfoPopup/info-popup";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import { AutocompleteItem } from "@/components/Form/Autocomplete";
import AddressPopup from "./AddressPopup";
import SelectCategoryPopup from "./SelectCategoryPopup";
import { IAddress, useApi } from "@/contexts/APIContext";
import {
  apiCreatePost,
  apiEditPost,
  apiGetDetailPost,
  IPostForm,
} from "./service";
import { apiGetAddresByParent } from "@/contexts/service";

type Props = {};

const SellerEditPostPage = ({}: Props) => {
  const nav = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { user, fetchForumPosts, provinces, fetchAddressByParent } = useApi();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [infoType, setInfoType] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [titleInfo, setTitleInfo] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [pickupTime, setPickupTime] = useState<string>("");
  const [contact, setContact] = useState("");
  const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);
  const [isSelectCategoryPopupOpen, setIsSelectCategoryPopupOpen] =
    useState(false);
  const [address, setAddress] = useState({
    province: null as AutocompleteItem | null,
    district: null as AutocompleteItem | null,
    ward: null as AutocompleteItem | null,
    detail: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
    products: { id: number; name: string; quantity: number }[];
  } | null>(state?.category || null);

  const fetchPost = async () => {
    try {
      const res = await apiGetDetailPost(parseInt(id!));
      const postData = res.data;
      console.log("🚀 ~ fetchPost ~ postData:", postData);

      // Fill dữ liệu từ API vào các state
      setTitle(postData.title || "");
      setContent(postData.content || "");
      setPickupTime(
        postData.end_time
          ? new Date(postData.end_time).toISOString().slice(0, 16)
          : ""
      );
      setContact(postData.contact || "");
      setPreviewImages(postData.images || []);
      setImages([]); // Không điền File[] từ URL, để người dùng upload lại nếu cần
      setSelectedCategory({
        id: postData.category.id,
        name: postData.category.name,
        products: postData.category.products.map((p: any) => ({
          id: p.id,
          name: p.name,
          quantity: p.quantity,
        })),
      });

      // Fill address
      const provinceData = provinces.find((p) => p.id === postData.province_id);
      const fetchDistrict = await apiGetAddresByParent(postData.province_id);
      const districtData = fetchDistrict.data.find(
        (d: IAddress) => d.id === postData.district_id
      );
      const fetchWard = await apiGetAddresByParent(postData.district_id);
      const wardData = fetchWard.data.find(
        (w: IAddress) => w.id === postData.commune_id
      );

      setAddress({
        province: provinceData
          ? { id: provinceData.id, name: provinceData.name }
          : null,
        district: districtData
          ? { id: districtData.id, name: districtData.name }
          : null, // district_id là null
        ward: wardData ? { id: wardData.id, name: wardData.name } : null, // commune_id là null
        detail: postData.address || "",
      });
    } catch (error) {
      console.error("Failed to fetch post:", error);
      setTitleInfo("Không thể tải dữ liệu bài đăng");
      setInfoType("error");
      setIsOpenInfo(true);
    }
  };

  useEffect(() => {
    if (id && provinces.length > 0) {
      fetchPost();
    }
  }, [id, provinces]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickupTime(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prev) => [...prev, ...files]);
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...previews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddressConfirm = (newAddress: {
    province: AutocompleteItem | null;
    district: AutocompleteItem | null;
    ward: AutocompleteItem | null;
    detail: string;
  }) => {
    setAddress(newAddress);
    setIsAddressPopupOpen(false);
  };

  const handleCategoryConfirm = (category: {
    id: number;
    name: string;
    products: { id: number; name: string; quantity: number }[];
  }) => {
    setSelectedCategory(category);
    setIsSelectCategoryPopupOpen(false);
  };

  const handleCancel = () => {
    setIsAddressPopupOpen(false);
    setIsSelectCategoryPopupOpen(false);
  };

  const onConfirm = () => {
    setIsOpen(false);
    setTitleInfo("Bạn đã nhận đơn thành công!");
    setIsOpenInfo(true);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const onCancelInfo = () => {
    nav(`/seller/forum/${id}`);
    setIsOpenInfo(false);
  };

  const getFullAddress = () => {
    if (!address.province) return "Chưa chọn";
    const parts = [
      address.detail,
      address.ward?.name,
      address.district?.name,
      address.province.name,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const handlePost = async () => {
    if (!title) {
      setTitleInfo("Vui lòng nhập tiêu đề bài viết");
      setInfoType("error");
      setIsOpenInfo(true);
      return;
    }
    if (!content) {
      setTitleInfo("Vui lòng nhập nội dung bài viết");
      setInfoType("error");
      setIsOpenInfo(true);
      return;
    }
    if (!pickupTime) {
      setTitleInfo("Vui lòng chọn thời gian thu gom");
      setInfoType("error");
      setIsOpenInfo(true);
      return;
    }
    if (!address.province || !address.district || !address.ward) {
      setTitleInfo("Vui lòng chọn đầy đủ địa chỉ");
      setInfoType("error");
      setIsOpenInfo(true);
      return;
    }
    if (!contact) {
      setTitleInfo("Vui lòng nhập số điện thoại liên hệ");
      setInfoType("error");
      setIsOpenInfo(true);
      return;
    }
    if (!selectedCategory) {
      setTitleInfo("Vui lòng chọn danh mục và sản phẩm");
      setInfoType("error");
      setIsOpenInfo(true);
      return;
    }

    const postData: IPostForm = {
      category: selectedCategory,
      title,
      content,
      end_time: new Date(pickupTime)
        .toISOString()
        .replace("T", " ")
        .slice(0, 19),
      province_id: address.province?.id,
      district_id: address.district?.id,
      commune_id: address.ward?.id,
      address: address.detail || "",
      contact,
      images,
    };

    try {
      // Giả sử có apiUpdatePost để cập nhật
      await apiEditPost(parseInt(id!), postData); // Thay bằng apiUpdatePost(id, postData) nếu có
      await fetchForumPosts();
      setInfoType("success");
      setTitleInfo("Cập nhật bài đăng thành công");
      setIsOpenInfo(true);
    } catch (error) {
      setInfoType("error");
      setTitleInfo("Cập nhật bài đăng thất bại");
      setIsOpenInfo(true);
    }
  };

  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Chỉnh sửa bài đăng"
        isBackLayout="/seller/forum"
      >
        <div className="pb-2 pt-6 bg-white">
          <div className="px-6">
            <div className="">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/avatar.jpg"
                  className="w-[48px] h-[48px] rounded-full"
                  alt=""
                />
                <p className="text-lg font-bold">{user?.name}</p>
              </div>
              <div className="mt-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                      Danh mục:
                    </span>
                    <span
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded cursor-pointer"
                      onClick={() => setIsSelectCategoryPopupOpen(true)}
                    >
                      {selectedCategory?.name || "Chưa chọn"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                      Chi tiết:
                    </span>
                    <div className="flex gap-2">
                      {selectedCategory?.products?.map((product) => (
                        <span
                          key={product.id}
                          className="px-2 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded"
                        >
                          {`${product.name}: ${product.quantity}KG`}
                        </span>
                      )) || <span>Chưa có sản phẩm</span>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="text-sm font-medium text-gray-600">
                      Tiêu đề bài viết:
                    </span>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Nhập tiêu đề bài viết"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-700"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 shadow-sm rounded-lg border border-gray-200">
                <div className="bg-white">
                  <textarea
                    name=""
                    id=""
                    placeholder="Hành động hôm nay của bạn là gì?"
                    className="w-full h-full focus:outline-none p-4 placeholder:text-gray-400 placeholder:italic text-gray-800"
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  {previewImages.length > 0 && (
                    <div className="p-4 grid grid-cols-3 gap-4">
                      {previewImages.map((src, index) => (
                        <div key={index} className="relative">
                          <img
                            src={src}
                            alt="preview"
                            className="w-full h-24 object-cover rounded-lg shadow-sm"
                          />
                          <span
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 p-0 right-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <CloseIcon style={{ fontSize: "16px" }} />
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col gap-3 border-t border-gray-200">
                  <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded p-2">
                    <ImageIcon className="text-blue-500" />
                    <label className="flex flex-col gap-1 cursor-pointer flex-1">
                      <span className="text-sm text-gray-700">Ảnh/video</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded p-2">
                    <AccessTimeIcon className="text-green-500" />
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="text-sm text-gray-700">Thời gian thu gom</p>
                      <input
                        type="datetime-local"
                        value={pickupTime}
                        onChange={handleTimeChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-700"
                      />
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded p-2"
                    onClick={() => setIsAddressPopupOpen(true)}
                  >
                    <LocationOnIcon className="text-green-500" />
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="text-sm text-gray-700">Địa chỉ</p>
                      <p className="text-sm text-gray-500">
                        {getFullAddress()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded p-2">
                    <CallIcon className="text-green-500" />
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="text-sm text-gray-700">Liên hệ</p>
                      <input
                        type="tel"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Nhập số điện thoại"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center pt-6">
              <button
                className="text-lg font-semibold text-white bg-green-500 rounded-full px-8 py-2 hover:bg-green-600 transition-colors"
                onClick={handlePost}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>

        <AddressPopup
          address={address}
          isOpen={isAddressPopupOpen}
          onConfirm={handleAddressConfirm}
          onCancel={handleCancel}
        />

        <SelectCategoryPopup
          isOpen={isSelectCategoryPopupOpen}
          onConfirm={handleCategoryConfirm}
          onCancel={handleCancel}
          initialCategory={selectedCategory} // Truyền dữ liệu category ban đầu
        />

        <ConfirmActionPopup
          title="Bạn có chắc chắn muốn nhận đơn không?"
          isOpen={isOpen}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />

        <InfoPopup
          title={titleInfo}
          isOpen={isOpenInfo}
          type={infoType === "error" ? "error" : "success"}
          onClose={onCancelInfo}
        />
      </BasePage>
    </div>
  );
};

export default SellerEditPostPage;
