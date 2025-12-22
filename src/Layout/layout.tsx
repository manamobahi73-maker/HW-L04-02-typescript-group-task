import { Outlet, Link, NavLink } from "react-router-dom";
const layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-gray-800">
              <span className="text-indigo-600">task</span>manager
            </h1>

            <nav className="flex gap-6">
              <NavLink
                to="/"
                className={({ isActive }) => {
                  isActive
                    ? "text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1"
                    : "text-gray-500 hover:text-indigo-600";
                }}
              >
                داشبورد
              </NavLink>

              <NavLink
                to="/projects/new"
                className={({ isActive }) => {
                  isActive
                    ? "text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1"
                    : "text-gray-500 hover:text-indigo-600";
                }}
              >
                پروژه جدید
              </NavLink>
            </nav>
          </div>

          <Link
            to="/login"
            className="text-sm text-red-500 hover:text-red-700 font-medium hover:bg-red-50 px-3 py-1 rounded-md transition-colors"
          >
            خروج
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        {new Date().getFullYear()}  مدیریت پروژه تیمی
      </footer>
    </div>
  );
};

export default layout;
