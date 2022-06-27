import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./app/hook";
import { selectUID } from "./components/slices/authSlice";

export const UseAuth = () =>{
    const LoginUID = useAppSelector(selectUID);
    return LoginUID;
}

const RoutesProtected = () => {
    const isAuth = UseAuth()

  return  isAuth ? <Outlet /> : <Navigate to="/"/>
}

export default RoutesProtected