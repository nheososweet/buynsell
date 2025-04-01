import { CheckIcon } from "@/assets/icon/check";
import { ChevronDownIcon } from "@/assets/icon/chevron-down";
import { SearchDatasetIcon } from "@/assets/icon/search-dataset";
import { useState, useRef, useEffect } from "react";

export interface AutocompleteItem {
  id: number;
  name: string;
}

interface AutocompleteProps {
  items: AutocompleteItem[];
  selectedItem: AutocompleteItem | null;
  onSelect: (item: AutocompleteItem) => void;
  onItemsChange?: (items: AutocompleteItem[]) => void; // Thêm prop này
  maxHeight?: number;
  inputAdditionalClass?: string;
  wrapperAdditionalClass?: string;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  noDataText?: string;
  required?: boolean;
  errorText?: string;
  hasSearchIcon?: boolean;
  label?: string;
}

export default function Autocomplete({
  items,
  selectedItem,
  onSelect,
  maxHeight = 336,
  inputAdditionalClass,
  wrapperAdditionalClass,
  isLoading,
  placeholder,
  disabled,
  noDataText = "No data found",
  required,
  errorText,
  hasSearchIcon,
  label,
}: AutocompleteProps) {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedItem) {
      if (!showDropdown) {
        setQuery(selectedItem.name);
      } else {
        setQuery("");
        setFilteredItems(items);
      }
      // Gán lại query bằng giá trị của selectedItem khi đóng dropdown
    } else {
      setQuery("");
    }
  }, [showDropdown, selectedItem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredItems(items); // Nếu input rỗng, hiển thị lại danh sách gốc
    } else {
      setFilteredItems(
        items.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
    setShowDropdown(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Bỏ qua sự kiện click từ wrapper
    if (event.target === dropdownRef.current) {
      return;
    }

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
      // setFilteredItems(items);
    }
  };

  // Sửa lại hàm handleWrapperClick
  const handleWrapperClick = (e: React.MouseEvent) => {
    // Kiểm tra nếu không click vào dropdown
    if (!e.target || !(e.target as HTMLElement).closest("ul")) {
      inputRef.current?.focus();
      setShowDropdown(true);
    }
  };

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <p className="flex items-center gap-1">
          <span className="text-guideSecond font-medium uppercase text-[13px]">
            {label}
          </span>
          {required && (
            <span className="text-guide2 text-[13px] font-medium">*</span>
          )}
        </p>
      )}
      <div
        ref={dropdownRef}
        className={`relative h-[40px] w-fit border ${
          required && !selectedItem && errorText
            ? "border-red-500"
            : "border-guideBorder"
        } border-guideBorder bg-white rounded px-3 ${wrapperAdditionalClass}`}
        id="custom-scrollbar"
        onClick={handleWrapperClick}
      >
        {/* Input */}
        <div className="h-full flex items-center">
          <div className="flex items-center gap-2 px-2 py-1 flex-1">
            {isLoading ? (
              <div className="">
                <div className="border-gray-300 w-4 h-4  animate-spin rounded-full border-2 border-t-blue-600" />
              </div>
            ) : !disabled && hasSearchIcon ? (
              <span>
                <SearchDatasetIcon />
              </span>
            ) : (
              <></>
            )}

            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={() => setShowDropdown(true)}
              className={`w-[368px] focus:outline-none placeholder:text-guideSecond font-medium text-sm ${inputAdditionalClass}`}
              placeholder={placeholder}
              ref={inputRef}
              // disabled={disabled}
            />
          </div>
          <span className={`${showDropdown ? "rotate-180" : ""}`}>
            <ChevronDownIcon />
          </span>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <ul
            className="absolute left-0 right-0 mt-2 bg-white border border-guideBorder rounded-lg overflow-y-auto z-20 p-4 flex flex-col gap-1"
            style={{ maxHeight: `${maxHeight}px` }}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <li
                  key={item.id}
                  className={`flex justify-between items-center py-[10px] px-[14px] text-guideDark text-sm font-medium cursor-pointer rounded hover:bg-guideBgButton ${
                    selectedItem?.id === item.id
                      ? "text-guide1 bg-guideBgButton"
                      : ""
                  }`}
                  onClick={() => {
                    if (!disabled) {
                      onSelect(item);
                      setQuery(item.name);
                      setShowDropdown(false);

                      // Sắp xếp lại danh sách: Đưa item được chọn lên đầu
                      setFilteredItems([
                        item,
                        ...items.filter((i) => i.id !== item.id),
                      ]);
                    }
                  }}
                >
                  {item.name}
                  {selectedItem?.id === item.id && <CheckIcon />}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-guideSecond text-sm text-center">
                {noDataText}
              </li>
            )}
          </ul>
        )}
      </div>
      {required && !selectedItem && (
        <span className="text-xs font-medium text-red-500 mt-1">
          {errorText}
        </span>
      )}
    </div>
  );
}
