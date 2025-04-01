import Dialog from "@/components/Dialog";
import ControllerLoginInput from "@/components/Form/ControllerLoginInput";
import { requireMessage } from "@/utils/string.utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    old_password: yup.string().required(requireMessage("Mật khẩu cũ")),
    password: yup.string().required(requireMessage("Mật khẩu mới")),
    password_confirmation: yup
      .string()
      .required(requireMessage("Xác nhận mật khẩu mới")),
  })
  .required();

type Props = {
  additionClass?: string;
  isOpen: boolean;
  title?: string;
  subTitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
  width?: number;
};

function ChangePasswordPopup({
  isOpen,
  subTitle,
  title,
  onCancel,
  onConfirm,
  additionClass,
}: Props) {
  const onSubmit = async () => {
    onConfirm();
    handleClose();
  };

  const handleClose = () => {
    onCancel();
  };

  const {
    handleSubmit,
    control,
    // reset,
    // watch,
    // formState: { errors },
  } = useForm<{
    old_password: string;
    password: string;
    password_confirmation: string;
  }>({
    defaultValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <Dialog
      title={title}
      subTitle={subTitle}
      isOpen={isOpen}
      onClose={handleClose}
      actionButtonCancel={handleClose}
      actionButtonConfirm={onSubmit}
      additionClass={"w-[400px]"}
    >
      <div className="pt-5 px-10 flex flex-col gap-5">
        {" "}
        <p className="text-[18px] text-center font-semibold text-primary-color">
          Thay đổi mật khẩu
        </p>
        <div className="flex flex-col gap-3">
          <ControllerLoginInput
            name="old_password"
            control={control}
            placeholder="Mật khẩu"
            type="password"
            inputAdditionClass=" w-[550px]"
            is_password
          />
          <ControllerLoginInput
            name="password"
            control={control}
            placeholder="Mật khẩu"
            type="password"
            inputAdditionClass=" w-[550px]"
            is_password
          />
          <ControllerLoginInput
            name="password_confirmation"
            control={control}
            placeholder="Mật khẩu"
            type="password"
            inputAdditionClass=" w-[550px]"
            is_password
          />
        </div>
      </div>
    </Dialog>
  );
}

export default ChangePasswordPopup;
