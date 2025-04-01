import { signal, useSignal } from "@preact/signals-react";
import { useEffect, useRef } from "react";
import { ControllerRenderProps } from "react-hook-form";
import BaseInput from "../Form/BaseInput";
import IconCheckedOpt from "../Icon/checkedOpt";
import IconChevronDropdown from "../Icon/chevron-dropdown";
import IconError from "../Icon/error";
import IconSearch from "../Icon/search";
import "./style.scss";

interface Props {
  label?: string;
  inputAdditionClass?: string;
  twColor?: string;
  data: OptionProps[];
  name: string;
  placeholder?: string;
  errors: any;
  field: ControllerRenderProps<any, string>;
  required?: boolean;
  placeHolderFilter?: string;
  hasSearch?: boolean;
  scroll?: boolean;
  disabled?: boolean;
  multipleSelect?: boolean;
}

interface OptionProps {
  name: string;
  value: string;
}

const focusValue = signal<boolean>(false);

const BaseDropdown = ({
  label,
  placeHolderFilter,
  inputAdditionClass = "",
  data,
  name,
  placeholder,
  errors,
  field,
  required,
  hasSearch,
  scroll = true,
  disabled = false,
  multipleSelect,
  ...inputProps
}: Props) => {
  const focusedInput = useSignal<boolean>(false);
  const showOptions = useSignal<boolean>(false);
  const keyword = useSignal<string>("");
  const filteredOptions = useSignal<OptionProps[]>(data);

  const dropdownRef = useRef<HTMLDivElement>(null);

  function removeAccents(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  useEffect(() => {
    if (!keyword.value) {
      filteredOptions.value = data;
    } else {
      const filtered = data.filter((option) =>
        removeAccents(option.name.toLowerCase()).includes(
          removeAccents(keyword.value.toLowerCase().trim())
        )
      );
      filteredOptions.value = filtered;
    }
  }, [keyword.value, data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        showOptions.value = false;
        keyword.value = "";
        focusedInput.value = false;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectOption = (option: OptionProps) => {
    if (!multipleSelect) {
      focusedInput.value = false;
      field?.onChange(option?.value);
      showOptions.value = false;
      keyword.value = "";
    } else {
      field?.onChange([...field.value, option?.value]);
      const findExistOpt = ((field.value as string[]) || []).findIndex(
        (opt: string) => opt === option?.value
      );

      if (findExistOpt === -1) {
        field?.onChange([...field.value, option?.value]);
      } else {
        const newOpts = ((field.value as string[]) || []).filter(
          (opt: string) => opt !== option?.value
        );
        field?.onChange(newOpts);
      }
    }
  };

  const onInputFocus = () => (focusedInput.value = true);

  return (
    <div ref={dropdownRef} className="relative w-full h-full">
      <div
        className={`relative flex flex-col justify-end h-full ${
          focusedInput.value || field.value ? "gap-1" : ""
        }`}
      >
        {label && (
          <p className=" font-['SVN-Regular'] text-secondart text-size-base leading-[22px]">
            {(!multipleSelect && field.value) ||
            (multipleSelect &&
              Array.isArray(field.value) &&
              field.value.some((opt: string) => opt !== "")) ||
            focusedInput.value
              ? label
              : ""}
            {(focusedInput.value ||
              (!multipleSelect && field.value) ||
              (multipleSelect &&
                Array.isArray(field.value) &&
                field.value.some((opt: string) => opt !== ""))) &&
              required && <span className="text-base-error ml-1">*</span>}
          </p>
        )}
        <div className="relative h-full">
          <input
            className={`text-size-base outline-none bg-grey-f6 border border-grey-f6 focus:bg-white focus:border focus:border-login-button rounded-radius-base  py-[9px] pl-4 pr-[6px] h-full ${inputAdditionClass} ${inputAdditionClass} ${
              errors[name] ? "!border-base-error" : ""
            } ${
              (!multipleSelect && field.value) ||
              (multipleSelect &&
                Array.isArray(field.value) &&
                field.value.some((opt: string) => opt !== ""))
                ? "bg-white border border-secondart"
                : ""
            } ${focusedInput.value ? "!border-login-button" : ""}`}
            id={name}
            readOnly
            placeholder={
              label && !focusedInput.value
                ? `${required ? label + " (Bắt buộc)" : label}`
                : placeholder
            }
            onFocus={() => {
              onInputFocus();
              showOptions.value = true;
            }}
            onBlur={() => {
              field.onBlur();
              focusValue.value = false;
            }}
            // {...field}
            value={
              !multipleSelect
                ? data.find((item) => field.value === item.value)?.name || ""
                : data
                    .filter((option) =>
                      ((field.value as string[]) || []).includes(option.value)
                    )
                    .map((option) => option.name)
                    .join(", ") || ""
            }
            {...inputProps}
            disabled={disabled}
          />
          <span
            onClick={() => {
              if (disabled) return;
              showOptions.value = !showOptions.value;
              focusedInput.value = !focusedInput.value;
              keyword.value = "";
            }}
            className={`absolute right-[14px] top-1/2 -translate-y-1/2 cursor-pointer transition-all duration-100 ease-linear select-none ${
              showOptions.value ? "rotate-180" : ""
            }`}
          >
            <IconChevronDropdown />
          </span>
        </div>
        {errors[name] && (
          <div className="text-base-error text-size-sm font-medium font-[SVN-Regular] flex items-center gap-1">
            <IconError /> {errors[name]?.message as string}
          </div>
        )}
      </div>

      <div
        className={`z-10 absolute border bg-white border-grey-ec mt-2 rounded-radius-base p-4 shadow-white-sm top-[100%] left-0 right-0 ${
          showOptions.value ? "block" : "hidden"
        }`}
      >
        {hasSearch && (
          <div className="flex items-center border border-dropdown-search-border rounded-radius-base pl-4">
            <IconSearch />
            <BaseInput
              inputAdditionClass="h-[34px] px-[16px] py-[6] border-none w-full"
              onChange={(e) => (keyword.value = e.target.value)}
              value={keyword.value}
              autoFocus
              onFocus={() => (focusedInput.value = true)}
              placeholder={placeHolderFilter || ""}
            />
          </div>
        )}

        <ul
          className={`${
            scroll ? "max-h-[136px]" : ""
          } overflow-y-auto flex flex-col gap-1 dropdown-opt-list ${
            hasSearch ? "mt-3" : ""
          }`}
        >
          {filteredOptions.value.length > 0 ? (
            filteredOptions.value.map((item, idx) => (
              <li
                key={idx}
                className={`flex items-center justify-between text-dropdown-item-text text-size-base leading-[22px] py-[6px] px-4 hover:bg-dropdown-item-hover-bg hover:font-semibold hover:cursor-pointer rounded-radius-8 ${
                  field?.value === item.value ||
                  (multipleSelect &&
                    Array.isArray(field.value) &&
                    field.value.some((opt: string) => opt === item.value))
                    ? "bg-login-bg text-login-button font-semibold"
                    : ""
                }`}
                onMouseUp={() => {
                  handleSelectOption(item);
                }}
              >
                {item.name}{" "}
                {((!multipleSelect && field?.value === item.value) ||
                  (multipleSelect &&
                    Array.isArray(field.value) &&
                    field.value.some((opt: string) => opt === item.value))) && (
                  <IconCheckedOpt />
                )}
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
};

export default BaseDropdown;
