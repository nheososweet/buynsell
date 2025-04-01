import Dialog from "@/components/Dialog";
import ControllerFormInput from "@/components/Form/ControllerFormInput";
import { useUserStore } from "@/pages/authenticate/state";
import { requireMessage } from "@/utils/string.utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { Signal } from "@preact/signals-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Props = {
  openState: Signal<{
    isOpen: boolean;
    id: string;
  }>;
};

const schema = yup
  .object({
    old_password: yup
      .string()
      .required(requireMessage("Mật khẩu cũ"))
      .min(6, "Mật khẩu ít nhất 6 kí tự"),
    new_password: yup
      .string()
      .required(requireMessage("Mật khẩu mới"))
      .min(6, "Mật khẩu ít nhất 6 kí tự"),
    confirm_password: yup
      .string()
      .oneOf(
        [yup.ref("new_password")],
        "Xác nhận mật khẩu không khớp với mật khẩu mới"
      )
      .required(requireMessage("Xác nhận mật khẩu")),
  })
  .required();

interface IPasswordChange {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

function ChangePasswordPopup({ openState }: Props) {
  const { changePassword } = useUserStore();
  const [initValue] = useState<IPasswordChange>({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const { handleSubmit, control, reset } = useForm<IPasswordChange>({
    defaultValues: initValue,
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    openState.value = { isOpen: false, id: "" };
    reset();
  };

  const onSubmit = async (formData: IPasswordChange) => {
    await changePassword(
      openState.value.id,
      {
        old_password: formData.old_password,
        password: formData.new_password,
      },
      handleClose
    );
  };

  return (
    <Dialog
      title={"Đổi mật khẩu"}
      isOpen={openState.value.isOpen}
      onClose={handleClose}
      actionButtonCancel={handleClose}
      actionButtonConfirm={handleSubmit(onSubmit)}
      additionClass="w-[591px]"
    >
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid grid-cols-1 gap-4 px-[40px] pb-[48px]"
        >
          <ControllerFormInput
            control={control}
            label="Mật khẩu cũ"
            inputAdditionClass="w-full"
            name="old_password"
            required={true}
            is_password
          />
          <ControllerFormInput
            control={control}
            label="Mật khẩu mới"
            inputAdditionClass="w-full"
            name="new_password"
            required={true}
            is_password
          />
          <ControllerFormInput
            control={control}
            label="Xác nhận mật khẩu"
            inputAdditionClass="w-full"
            name="confirm_password"
            required={true}
            is_password
          />
        </form>
      </div>
    </Dialog>
  );
}

export default ChangePasswordPopup;
