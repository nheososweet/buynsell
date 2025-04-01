import { InputHTMLAttributes, useState } from "react";
import { Control, Controller } from "react-hook-form";
import IconError from "../Icon/error";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  control: Control<any>;
  inputAdditionClass?: string;
  is_password?: boolean;
}

const ControllerLoginInput = ({
  control,
  name,
  label,
  inputAdditionClass,
  is_password,
  ...inputProps
}: Props) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-1 ">
            <div className={`${is_password ? "relative " : ""} `}>
              <input
                className={`w-full h-[40px] flex items-center px-[1rem] text-size-base font-medium outline-none bg-grey-f6 focus:bg-white border border-bg-grey-f6 rounded-radius-base ${
                  errors[name] ? "border-base-error" : ""
                } leading-4 text-text-primary ${inputAdditionClass} ${
                  field.value ? "bg-white" : ""
                }`}
                {...inputProps}
                {...field}
                type={
                  is_password
                    ? !isShowPassword
                      ? "password"
                      : "text"
                    : inputProps.type || "text"
                }
              />
              {is_password && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:text-first-black p-1 text-text-primary select-none">
                  {isShowPassword ? (
                    <span
                      className="text-size-sm font-semibold text-grey-7e"
                      onClick={() => setIsShowPassword(false)}
                      title="Hiện"
                    >
                      Ẩn
                    </span>
                  ) : (
                    <span
                      className="text-size-sm font-semibold text-grey-7e"
                      onClick={() => setIsShowPassword(true)}
                      title="Ẩn"
                    >
                      Hiện
                    </span>
                  )}
                </div>
              )}
            </div>
            {errors[name] && (
              <div className="text-base-error text-size-13 flex items-center gap-1">
                <IconError /> {errors[name]?.message as string}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default ControllerLoginInput;
