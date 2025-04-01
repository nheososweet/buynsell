import ControllerLoginInput from "@/components/Form/ControllerLoginInput";
import LoginButton from "@/components/Form/LoginButton";
import { requireMessage } from "@/utils/string.utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./style.scss";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { apiRegister } from "@/services/api.service";
import { toast } from "react-toastify";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
enum Role {
  SELLER = "SELLER",
  BUYER = "BUYER",
}
// Define the form schema for registration
const schema = yup
  .object({
    name: yup.string().required(requireMessage("Họ và tên")),
    email: yup
      .string()
      .required(requireMessage("Email"))
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Email không hợp lệ"
      ),
    password: yup.string().required(requireMessage("Mật khẩu")),
    role: yup
      .mixed<Role>()
      .oneOf(Object.values(Role))
      .required("Vui lòng chọn vai trò"),
    password_confirmation: yup
      .string()
      .required(requireMessage("Nhập lại mật khẩu"))
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  })
  .required();

// Define the form data type
interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: Role;
}

const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const { handleSubmit, control, setValue } = useForm<IRegisterRequest>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: undefined,
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle form submission
  // In RegisterPage
  const onSubmit = async (data: IRegisterRequest) => {
    setLoading(true);
    const response = await apiRegister(data);
    if (response.status === 200) {
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/otp", { state: { email: data.email } });
        setLoading(false);
      }, 2000);
      return;
    }
    toast.error(response.data.message);
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 h-screen flex">
      <div
        className={`${
          !selectedRole ? "w-full md:w-[430px]" : "w-0"
        } overflow-hidden transition-all mx-auto bg-white h-full`}
      >
        <div>
          <img
            src="/assets/bg_login.png"
            className="h-[283px] w-auto object-cover"
            alt="Background"
          />
          <div className="px-3 flex flex-col gap-6">
            <div className="text-primary-color flex  gap-2 text-xl items-end font-bold mt-6 justify-center">
              <AssignmentIndIcon
                className="text-primary-color"
                fontSize="large"
              />
              <p>Chọn vai trò</p>
            </div>
            <div
              className="flex flex-col mt-6 gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <button
                className={`p-4 rounded-lg hover:opacity-90 border-2 text-center transition-all bg-primary-color text-white font-bold text-xl ${
                  selectedRole === Role.SELLER
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => {
                  setSelectedRole(Role.SELLER);
                  setValue("role", Role.SELLER);
                }}
              >
                Người bán
              </button>

              <button
                className={`p-4 rounded-lg hover:opacity-90 border-2 text-center transition-all bg-primary-color text-white font-bold text-xl ${
                  selectedRole === Role.BUYER
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => {
                  setSelectedRole(Role.BUYER);
                  setValue("role", Role.BUYER);
                }}
              >
                Người mua
              </button>

              <p className="text-primary-color text-[13px] text-center mt-16">
                Bạn muốn trở thành Người bán hoặc Người mua?
                <br /> Hãy chọn vai trò phù hợp để tiếp tục.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          selectedRole ? "w-full md:w-[430px]" : "w-0"
        } overflow-hidden mx-auto bg-white h-full`}
      >
        <div>
          <img
            src="/assets/bg_login.png"
            className="h-[283px] w-auto object-cover"
            alt="Background"
          />
          <div className="px-3 flex flex-col gap-6">
            <div className="text-primary-color flex  gap-2 text-xl items-end font-bold mt-6 justify-center">
              <PersonAddIcon className="text-primary-color" fontSize="large" />
              <p>Đăng ký tài khoản</p>
            </div>
            <form
              className="flex flex-col mt-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-6">
                <ControllerLoginInput
                  name="name"
                  control={control}
                  placeholder="Nhập tên của bạn"
                  inputAdditionClass="w-full"
                />
                <ControllerLoginInput
                  name="email"
                  control={control}
                  placeholder="Nhập địa chỉ email"
                  inputAdditionClass="w-full"
                  type="email"
                />
                <ControllerLoginInput
                  name="password"
                  control={control}
                  placeholder="Mật khẩu"
                  type="password"
                  inputAdditionClass="w-full"
                  is_password
                />
                <ControllerLoginInput
                  name="password_confirmation"
                  control={control}
                  placeholder="Nhập lại mật khẩu"
                  type="password"
                  inputAdditionClass="w-full"
                  is_password
                />
              </div>
              <LoginButton
                title="Tiếp tục"
                twClassAddition="mt-8 text-white text-size-base font-medium"
                type="submit"
                loading={loading}
              />
              <p className="text-primary-color text-[13px] text-center mt-4">
                Chính sách Bảo mật của chúng tôi áp dụng khi bạn đăng ký
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
