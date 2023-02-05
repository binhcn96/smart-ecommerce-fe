import DashBoard from "pages/dashboard";
import Login from "pages/login";
import Register from "pages/register";
import SmsRegister from "pages/smsRegister";
import RegistInfo from "pages/registInfo";
import { pathGuest, pathPrivate } from "constants/path";
import Security from "pages/security";

export const routerPrivate = [
  {
    path: pathPrivate.dashboard,
    element: <DashBoard />
  },
  {
    path: pathPrivate.security_setting,
    element: <Security />
  },
]

export const routerGuest = [
  {
    path: pathGuest.login,
    element: <Login />
  },
  {
    path: pathGuest.signup,
    element: <Register />
  },
  {
    path: pathGuest.signup_sms,
    element: <SmsRegister />
  },
  {
    path: pathGuest.signup_info,
    element: <RegistInfo />
  },
]