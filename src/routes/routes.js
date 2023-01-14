import { createBrowserRouter } from "react-router-dom";

import DashBoard from "pages/dashboard";
import Login from "pages/login";
import Register from "pages/register";
import SmsRegister from "pages/smsRegister";
import RegistInfo from "pages/registInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/signup/sms",
    element: <SmsRegister />,
  },
  {
    path: "/signup/info",
    element: <RegistInfo />,
  },
]);

export default router