import { InputHTMLAttributes } from "react";
import { Control, Controller } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  control: Control<any>;
  inputAdditionClass?: string;
  containerAdditionClass?: string;
}

const ControllerMultiSelect = ({
  control,
  name,
  label,
  inputAdditionClass,
  containerAdditionClass,
  ...inputProps
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, formState: { errors } }) => {
        return (
          <div className={`flex flex-col gap-1 ${containerAdditionClass}`}>
            <input
              className={`py-[3px] px-[1rem] text-size-base outline-none rounded-radius-base ${
                errors[name] ? "border-base-error" : ""
              } leading-8 font-['SVN-Regular'] text-first-black bg-grey-f6 ${inputAdditionClass}`}
              {...inputProps}
              {...field}
            />
          </div>
        );
      }}
    />
  );
};

export default ControllerMultiSelect;
