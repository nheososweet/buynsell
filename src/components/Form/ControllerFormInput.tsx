import { InputHTMLAttributes, useState } from "react";
import { Control, Controller } from "react-hook-form";
import IconError from "../Icon/error";
import IconEye from "../Icon/eye";
import IconEyeSlash from "../Icon/eye-slash";

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
  labelInner?: boolean;
  is_password?: boolean;
}

const ControllerFormInput = ({
  control,
  name,
  label,
  inputAdditionClass,
  labelAdditionClass,
  additionClass,
  twColor,
  required,
  labelRightNode,
  labelInner,
  is_password,
  ...inputProps
}: Props) => {
  const [focused, setFocused] = useState<boolean>(false);
  const onInputFocus = () => setFocused(true);
  const onInputBlur = () => setFocused(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState }) => {
        return (
          <div
            className={`flex flex-col ${
              (focused || field.value || fieldState.invalid) &&
              label &&
              !labelInner
                ? "gap-1"
                : ""
            } ${additionClass}`}
          >
            <div className="flex items-center gap-[2px] justify-between">
              <label
                htmlFor={name}
                className={`${labelAdditionClass} font-['SVN-Regular'] text-secondart text-size-base leading-[22px]`}
              >
                {label && !labelInner && (field.value || focused) ? label : ""}
                {label &&
                  !labelInner &&
                  (focused || field.value) &&
                  required && <span className="text-base-error ml-1">*</span>}
              </label>
              {(focused || !!field.value) && labelRightNode}
            </div>
            <div className="relative">
              {label && labelInner && (
                <label
                  htmlFor={name}
                  className={`absolute top-1/2 -translate-y-1/2 left-[10px] font-['SVN-Regular'] text-secondart text-size-base leading-[22px] ${labelAdditionClass} `}
                >
                  {label}
                </label>
              )}
              <div className={`${is_password ? "relative" : ""}`}>
                <input
                  placeholder={
                    label && !focused
                      ? `${required ? label + " (Bắt buộc)" : label} `
                      : ""
                  }
                  className={`text-size-base outline-none bg-grey-f6f8 border border-grey-f6  rounded-radius-base py-[9px] pl-4 pr-[6px] ${
                    fieldState.invalid ? "!border-base-error" : ""
                  } ${field.value ? "!bg-white border border-secondart" : ""} ${
                    focused ? "!bg-white border border-login-button" : ""
                  } ${inputAdditionClass}`}
                  {...inputProps}
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  onFocus={onInputFocus}
                  onBlur={() => {
                    field.onBlur();
                    onInputBlur();
                  }}
                  type={
                    is_password
                      ? !isShowPassword
                        ? "password"
                        : "text"
                      : inputProps.type || "text"
                  }
                />
                {is_password && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:bg-grey-ef p-1 rounded-full">
                    {isShowPassword ? (
                      <span
                        onClick={() => setIsShowPassword(false)}
                        title="Show password"
                      >
                        <IconEyeSlash className="fill-secondart" />
                      </span>
                    ) : (
                      <span
                        onClick={() => setIsShowPassword(true)}
                        title="Hide password"
                      >
                        <IconEye />
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            {fieldState.invalid && (
              <div className="text-base-error text-size-sm font-medium font-[SVN-Regular] flex items-center gap-1">
                <IconError /> {fieldState.error?.message}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default ControllerFormInput;
