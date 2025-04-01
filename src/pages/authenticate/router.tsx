import LoginPage from ".";
import OtpPage from "./OTPPage";
import RegisterPage from "./RegisterPage";

const AuthenticateRouter = [
  {
    path: "login",
    element: <LoginPage />,
    private: false,
    for_super_admin: false,
  },
  {
    path: "signup",
    element: <RegisterPage />,
    private: false,
    for_super_admin: false,
  },
  {
    path: "otp",
    element: <OtpPage />,
    private: false,
    for_super_admin: false,
  },
];

export default AuthenticateRouter;

export const a = 1;
