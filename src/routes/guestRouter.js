import useAuth from "hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom"

const GuestRouter = () => {
  const user = useAuth()
  return !user ? <Outlet /> : <Navigate to='/'></Navigate>
}

export default GuestRouter