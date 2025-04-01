import { InputHTMLAttributes } from "react";
import { Control, Controller } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  control: Control<any>;
  inputAdditionClass?: string;
  containerAdditionClass?: string;
}

const ControllerSearchInput = ({
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
              className={`py-[3px] px-[1rem] text-size-base outline-none bg-grey-f6 border border-grey-f6 focus:bg-white focus:border focus:border-login-button rounded-radius-base ${
                errors[name] ? "border-base-error" : ""
              } ${
                field.value ? "bg-white border border-secondart" : ""
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

export default ControllerSearchInput;
