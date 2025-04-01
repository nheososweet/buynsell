import { InputHTMLAttributes, forwardRef } from "react";
import { Control, Controller } from "react-hook-form";
import IconChecked from "../Icon/checked";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputAdditionClass?: string;
  twColor?: string;
  name: string;
  control: Control<any>;
}

const ControllerLoginCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ label, control, name, ...checkboxProps }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-[7px]">
            <div className="rk-checkbox-wrapper flex items-center">
              <input
                id={name}
                {...field}
                checked={field.value || false} // Đảm bảo có giá trị mặc định
                {...checkboxProps}
                type="checkbox"
                className={`ml-2 login-checkbox rounded-radius-base border border-primary-9d ${
                  field.value ? "rk-checked" : ""
                }`}
              />
              <IconChecked additionClass="rk-checked-icon" />
            </div>

            <label
              className="text-size-sm text-grey-888 font-medium select-none"
              htmlFor={name}
            >
              {label ?? ""}
            </label>
          </div>
        )}
      />
    );
  }
);

export default ControllerLoginCheckbox;
