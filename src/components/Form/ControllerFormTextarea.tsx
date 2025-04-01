import { TextareaHTMLAttributes, useState } from "react";
import { Control, Controller } from "react-hook-form";
import IconError from "../Icon/error";
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string; // Tên trường
  control: Control<any>;
  twColor?: string;
  inputAdditionClass?: string;
  labelAdditionClass?: string;
  additionClass?: string;
  required?: boolean;
  labelRightNode?: React.ReactNode;
}

const ControllerFormTextarea = ({
  control,
  name,
  label,
  inputAdditionClass,
  labelAdditionClass,
  additionClass,
  twColor,
  required,
  labelRightNode,
  ...textareaProps
}: Props) => {
  const [focused, setFocused] = useState<boolean>(false);
  const onInputFocus = () => setFocused(true);
  const onInputBlur = () => setFocused(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState }) => {
        return (
          <div
            className={`flex flex-col ${
              (focused && label) || (label && field.value) || fieldState.invalid
                ? "gap-1"
                : ""
            } ${additionClass}`}
          >
            <div className="flex items-center gap-[2px] justify-between">
              <label
                htmlFor={name}
                className={`${labelAdditionClass} font-['SVN-Regular'] text-secondart text-size-base leading-[22px]`}
              >
                {label && (field.value || focused) ? label : ""}
                {label && (focused || field.value) && required && (
                  <span className="text-base-error ml-1">*</span>
                )}
              </label>
              {(focused || !!field.value) && labelRightNode}
            </div>
            <div className="relative flex">
              <textarea
                placeholder={
                  label && !focused
                    ? `${required ? label + " (Bắt buộc)" : label} `
                    : ""
                }
                className={`rounded-radius-6 text-size-base outline-none bg-grey-f6 border border-grey-f6  py-[9px] pl-4 pr-[6px] ${inputAdditionClass} ${
                  fieldState.invalid ? "!border-base-error" : ""
                } ${
                  focused || field.value
                    ? "bg-white border border-secondart"
                    : ""
                }`}
                {...textareaProps}
                {...field}
                onFocus={onInputFocus}
                onBlur={() => {
                  field.onBlur();
                  onInputBlur();
                }}
              />
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

export default ControllerFormTextarea;
