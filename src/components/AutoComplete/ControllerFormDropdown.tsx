import { InputHTMLAttributes } from "react";
import { Control, Controller } from "react-hook-form";
import BaseDropdown from "./BaseDropdown";

interface OptionProps {
  name: string;
  value: string;
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  control: Control<any>;
  twColor?: string;
  inputAdditionClass?: string;
  data: OptionProps[];
  required?: boolean;
  placeholder?: string;
  wrapperAdditionClass?: string;
  placeHolderFilter?: string;
  hasSearch?: boolean;
  scroll?: boolean;
  disabled?: boolean;
  multipleSelect?: boolean;
}

const ControllerFormDropdown = ({
  control,
  name,
  label,
  inputAdditionClass,
  wrapperAdditionClass,
  data,
  required,
  placeholder,
  placeHolderFilter,
  hasSearch = false,
  scroll,
  disabled,
  multipleSelect = false,
  ...inputProps
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, formState: { errors } }) => {
        return (
          <div className={`${wrapperAdditionClass}`}>
            <BaseDropdown
              name={name}
              label={label}
              data={data}
              inputAdditionClass={inputAdditionClass}
              errors={errors}
              field={field}
              required={required}
              placeholder={placeholder}
              placeHolderFilter={placeHolderFilter}
              hasSearch={hasSearch}
              scroll={scroll}
              disabled={disabled}
              multipleSelect={multipleSelect}
              {...inputProps}
            />
          </div>
        );
      }}
    />
  );
};

export default ControllerFormDropdown;
