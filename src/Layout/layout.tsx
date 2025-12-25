import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Layout = () => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.currentUser);

  const handleLogout = () => {
    navigate("/login");
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1 transition-all"
      : "text-gray-500 hover:text-indigo-600 transition-all font-medium";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold  mr-4">Task <span className="text-indigo-600">Manager</span></div>
          <NavLink to="/" className={getLinkClass}>
            Dashboard
          </NavLink>
              {user?.role === "admin" && (
            <NavLink to="/projects/new" className={getLinkClass}>
              New Project
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/users" className={getLinkClass}>
              Users Management
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto w-full pb-24">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 fixed bottom-0 left-0 w-full z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col md:flex-row justify-center items-center text-sm text-gray-500">
          <p>{new Date().getFullYear()} Team Project.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
