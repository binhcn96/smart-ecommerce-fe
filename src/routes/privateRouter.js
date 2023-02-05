import useAuth from "hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouter = () => {
  const user = useAuth()
  return !user ? <Navigate to='/login'></Navigate> : <Outlet />
}

export default PrivateRouter