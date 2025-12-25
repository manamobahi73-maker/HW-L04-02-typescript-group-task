import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const AdminRoute = () => {
  const user = useSelector((state: RootState) => state.auth.currentUser);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;