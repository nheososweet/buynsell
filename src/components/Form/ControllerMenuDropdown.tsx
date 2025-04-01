import { useSignal } from "@preact/signals-react";
import { InputHTMLAttributes, useEffect, useRef } from "react";
import { Control, Controller } from "react-hook-form";
import IconCheckedOpt from "../Icon/checkedOpt";
import IconError from "../Icon/error";
interface OptionProps {
  name: string;
  value: string;
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string; // Tên trường
  control: Control<any>;
  twColor?: string;
  inputAdditionClass?: string;
  labelAdditionClass?: string;
  additionClass?: string;
  required?: boolean;
  labelRightNode?: React.ReactNode;
  data: OptionProps[];
  placeHolder?: string;
  wrapperAdditionClass?: string;
}

const ControllerFormMenuDropdown = ({
  control,
  name,
  label,
  inputAdditionClass,
  labelAdditionClass,
  required,
  data,
  placeHolder,
  wrapperAdditionClass,
}: Props) => {
  const showOptions = useSignal<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        showOptions.value = false;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState }) => {
        return (
          <div
            ref={dropdownRef}
            className={`relative flex flex-col ${wrapperAdditionClass}`}
          >
            {label && (
              <div className="flex items-center gap-[2px] font-[SVN-Regular]">
                <label htmlFor={name} className={`${labelAdditionClass}`}>
                  {label}
                </label>
                {required && <span className="text-base-error ml-1">*</span>}
              </div>
            )}

            <div className="relative flex flex-col gap-1">
              <input
                className={`rounded-radius-base text-size-base outline-none bg-grey-f6 focus:bg-white focus:border focus:border-secondart py-[9px] pl-4 pr-[6px] ${inputAdditionClass} ${
                  showOptions.value ? "border-[#001FC5]" : ""
                } ${fieldState.invalid ? "!border-base-error" : ""}`}
                id={name}
                // readOnly
                onClick={() => (showOptions.value = !showOptions.value)}
                placeholder={placeHolder || `Chọn ${label}`}
                {...field}
                value={
                  data.find((item) => field.value === item.value)?.name || ""
                }
              />
              {fieldState.invalid && (
                <div className="text-base-error text-size-sm font-medium font-[SVN-Regular] flex items-center gap-1">
                  <IconError /> {fieldState.error?.message}
                </div>
              )}
            </div>

            {/* Dropdown */}
            <div
              className={`absolute border z-[2] bg-white border-grey-ec mt-2 rounded-radius-base p-4 shadow-white-sm top-[100%] left-0 right-0 ${
                showOptions.value ? "block" : "hidden"
              }`}
            >
              {/* Danh sách kết quả lọc */}
              <ul className="max-h-[136px] overflow-y-auto flex flex-col gap-1">
                {data.length > 0 ? (
                  data.map((item, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center justify-between text-dropdown-item-text text-size-base leading-[22px] py-[6px] px-4 hover:bg-dropdown-item-hover-bg hover:font-semibold hover:cursor-pointer rounded-radius-8 ${
                        field?.value === item.value
                          ? "bg-login-bg text-login-button font-semibold"
                          : ""
                      }`}
                      // onClick={() => handleSelectOption(item)}
                    >
                      {item.name}{" "}
                      {field?.value === item.value && <IconCheckedOpt />}
                    </li>
                  ))
                ) : (
                  <li className="text-dropdown-item-text text-size-base text-center leading-[22px] py-[6px] px-4 rounded-radius-8">
                    Không có dữ liệu
                  </li>
                )}
              </ul>
            </div>
          </div>
        );
      }}
    />
  );
};

export default ControllerFormMenuDropdown;
