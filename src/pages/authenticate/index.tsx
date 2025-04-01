import ControllerLoginCheckbox from "@/components/Form/ControllerLoginCheckbox";
import ControllerLoginInput from "@/components/Form/ControllerLoginInput";
import LoginButton from "@/components/Form/LoginButton";
import { requireMessage } from "@/utils/string.utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ILoginRequest } from "./state";
import "./style.scss";
import { apiGetCurrentUser, apiLogin } from "./service";
import { toast } from "react-toastify";

const schema = yup
  .object({
    email: yup.string().required(requireMessage("Tài khoản")),
    password: yup.string().required(requireMessage("Mật khẩu")),
  })
  .required();

const LoginPage = () => {
  const { handleSubmit, control, watch, setValue } = useForm<ILoginRequest>({
    defaultValues: {
      email: "",
      password: "",
      isRemember: undefined,
    },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const isRemember = watch("isRemember"); // Theo dõi giá trị của checkbox

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedEmail && savedPassword) {
      setValue("email", savedEmail);
      setValue("password", savedPassword);
      setValue("isRemember", true);
    }
  }, [setValue]);

  // const { login, is_logged, is_loading } = useUserStore();

  const [loading, setLoading] = useState(false);

  const handleClick = handleSubmit(async (data) => {
    setLoading(true);
    try {
      // Gọi API login, giả sử response trả về { data: { access_token, ... } }
      const loginResponse: any = await apiLogin({
        email: data.email,
        password: data.password,
      });

      // Lưu access_token vào localStorage
      const accessToken = loginResponse.data?.access_token;
      localStorage.setItem("access_token", accessToken);

      // Lấy thông tin user hiện tại
      const currentUser = await apiGetCurrentUser();
      localStorage.setItem("currentUser", JSON.stringify(currentUser.data));
      localStorage.setItem("role", currentUser?.data?.role);

      // Điều hướng dựa trên role
      if (currentUser?.data?.role === "BUYER") {
        navigate("/buyer/buy");
      } else {
        navigate("/seller/home");
      }

      // Xử lý remember me
      if (isRemember) {
        localStorage.setItem("savedEmail", data.email);
        localStorage.setItem("savedPassword", data.password);
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
      }
    } catch (err) {
      console.error("Error:", err);
      const errorMessage =
        (err as any)?.response?.data?.message ||
        (err as Error)?.message ||
        "Có lỗi xảy ra, vui lòng thử lại";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="bg-gray-100 h-screen">
      <div className="w-full md:w-[430px] mx-auto bg-white h-full">
        <div>
          <img
            src="/assets/bg_login.png"
            className="h-[283px] w-auto object-cover"
            alt=""
          />
          <div className="px-3 flex flex-col gap-6">
            <div className="text-primary-color flex flex-col gap-2 text-xl items-center font-bold mt-6">
              <p>Chào mừng bạn đến với Green Go</p>
              <p>App dành cho người thu gom</p>
            </div>
            <div
              className="flex flex-col mt-6"
              // onSubmit={handleSubmit(login)}
            >
              <div className="flex flex-col gap-6">
                <ControllerLoginInput
                  name="email"
                  control={control}
                  placeholder="Tài khoản"
                  inputAdditionClass="w-[550px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleClick();
                    }
                  }}
                />
                <ControllerLoginInput
                  name="password"
                  control={control}
                  placeholder="Mật khẩu"
                  type="password"
                  inputAdditionClass=" w-[550px]"
                  is_password
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleClick();
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-between mt-5">
                <ControllerLoginCheckbox
                  name="isRemember"
                  label="Ghi nhớ đăng nhập"
                  control={control}
                />
                <p className="text-primary-9d text-size-base md:text-size-medium font-semibold leading-8">
                  Quên mật khẩu
                </p>
              </div>
              <LoginButton
                title="Đăng nhập"
                twClassAddition="mt-8 text-white text-size-base font-medium"
                type="submit"
                onClick={handleClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleClick();
                  }
                }}
                loading={loading}
              />
              <p className="text-grey-7e text-size-base md:text-size-medium font-semibold leading-8 text-center mt-[27px]">
                Bạn chưa có tài khoản?{" "}
                <span
                  className="text-primary-9d font-semibold"
                  onClick={() => navigate("/signup")}
                >
                  Đăng ký ngay
                </span>
              </p>
            </div>
            <p className="text-primary-color text-[13px] text-center">
              Bạn muốn trở thành Người thu gom phế liệu? Hãy liên hệ với chúng
              tôi qua số điện thoại 0333446369 hoặc greengo@.app
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
