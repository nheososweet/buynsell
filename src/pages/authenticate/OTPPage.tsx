import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ControllerLoginInput from "@/components/Form/ControllerLoginInput";
import LoginButton from "@/components/Form/LoginButton";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { requireMessage } from "@/utils/string.utils";
import "./style.scss";
import { apiResendOtp, apiVerify } from "@/services/api.service";
import { toast } from "react-toastify";

// Define the form schema for OTP
const schema = yup
  .object({
    otp: yup
      .string()
      .required(requireMessage("Mã OTP"))
      .matches(/^[0-9]{6}$/, "Mã OTP phải có 6 chữ số"),
  })
  .required();

// Define the form data type
interface IOtpRequest {
  otp: string;
}

const OtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the email from the registration form (passed via navigation state)
  const { email } = location.state || { email: "example@gmail.com" }; // Fallback email if not passed

  // Mask the email (e.g., example@gmail.com -> exa***@gmail.com)
  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");
    if (name.length < 3) return email;
    return `${name.slice(0, 3)}***@${domain}`;
  };

  const { handleSubmit, control } = useForm<IOtpRequest>({
    defaultValues: {
      otp: "",
    },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true); // Allow resend when timer expires
    }
  }, [timer]);

  // Format the timer as MM:SS
  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle OTP submission
  const onSubmit = async (data: IOtpRequest) => {
    setLoading(true);
    const payload = { ...data, email };
    const response = await apiVerify(payload);
    if (response.status === 200) {
      toast.success(response.data.message);
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000);
      return;
    }
    toast.error(response.data.message);
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (canResend) {
      const response = await apiResendOtp({ email });
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimer(300); // Reset timer
        setCanResend(false);
      }
      toast.error(response.data.message);
      setLoading(false);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate("/signup"); // Navigate back to the registration page
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className="w-full md:w-[430px] mx-auto bg-white h-full">
        <div className="relative">
          {/* Header */}
          <div className="bg-green-600 h-12 flex items-center px-3">
            <button onClick={handleBack} className="text-white text-2xl">
              &larr;
            </button>
            <p className="text-white text-lg font-bold text-center flex-1">
              Xác thực OTP
            </p>
          </div>

          {/* Main Content */}
          <div className="px-3 flex flex-col gap-6 items-center">
            {/* OTP Illustration */}
            <img
              src="/assets/verify_otp.png" // Replace with your actual image path
              className="h-[150px] w-auto mt-6"
              alt="OTP Verify"
            />

            {/* OTP Message */}
            <p className="text-primary-color text-center text-base font-medium">
              Mã xác thực đã được gửi đến email: <br />
              <span className="font-bold">{maskEmail(email)}</span>
            </p>

            {/* OTP Input */}
            <form
              className="flex flex-col w-full mt-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <ControllerLoginInput
                name="otp"
                control={control}
                placeholder=""
                inputAdditionClass="w-full text-center text-lg font-bold"
                type="number"
              />

              {/* Timer */}
              <p className="text-red-500 text-center mt-2">
                Hết hạn sau: {formatTimer(timer)}
              </p>

              {/* Confirm OTP Button */}
              <LoginButton
                title="Xác nhận OTP"
                twClassAddition="mt-6 text-white text-size-base font-medium bg-green-600"
                type="submit"
                loading={loading}
              />

              {/* Resend OTP Link */}
              <p
                className={`text-center mt-4 text-base font-semibold ${
                  canResend ? "text-blue-500 cursor-pointer" : "text-gray-500"
                }`}
                onClick={handleResendOtp}
              >
                Không nhận được OTP?
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
