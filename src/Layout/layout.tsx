import { Outlet, Link, NavLink } from "react-router-dom";

const Layout = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1 transition-all"
      : "text-gray-500 hover:text-indigo-600 transition-all";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">
              <span className="text-indigo-600">Task</span>Manager
            </h1>

            <nav className="flex gap-6 text-sm">
              <NavLink to="/" className={navLinkClass} end>
                Dashboard
              </NavLink>

              <NavLink to="/projects/new" className={navLinkClass}>
                New Project
              </NavLink>
            </nav>
          </div>

          <Link
            to="/login"
            className="text-sm text-red-500 hover:text-red-700 font-medium hover:bg-red-50 px-3 py-1 rounded-md transition-colors"
          >
            Logout
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        {new Date().getFullYear()} Team Project Manager
      </footer>
    </div>
  );
};

export default Layout;
