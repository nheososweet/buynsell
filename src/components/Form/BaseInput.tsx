import { InputHTMLAttributes, useState } from "react";
import IconEye from "../Icon/eye";
import IconEyeSlash from "../Icon/eye-slash";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelAdditionClass?: string;
  inputAdditionClass?: string;
  twColor?: string;
  is_password?: boolean;
}

const BaseInput = ({
  label,
  labelAdditionClass = "",
  twColor = "denim",
  inputAdditionClass = "",
  is_password,
  ...inputProps
}: Props) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col">
      {label && (
        <div className="flex items-center gap-[2px]">
          <label
            htmlFor={inputProps.name}
            className={` ${labelAdditionClass} font-['SVN-Regular'] text-secondart text-size-base leading-[22px]`}
          >
            {label}
          </label>
        </div>
      )}
      <div className={`${is_password ? "relative" : ""}`}>
        <input
          className={`w-full rounded-radius-6 text-size-base outline-none border border-${twColor}-600 py-[9px] pl-4 pr-[6px] ${inputAdditionClass}`}
          type={!isShowPassword && is_password ? "password" : ""}
          id={inputProps.name}
          name={inputProps.name}
          {...inputProps}
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
  );
};

export default BaseInput;
