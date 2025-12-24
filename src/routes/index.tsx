import { createBrowserRouter } from "react-router-dom";
import React from "react";

// Layouts & Pages
import Layout from "../Layout/layout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard"; // فرض می‌کنیم این همان لیست پروژه‌هاست
import NewProject from "../pages/NewProject";
import ProjectTasks from "../pages/ProjectTasks";

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/login", // بهتر است حروف کوچک باشد
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  // Protected Routes (Main App)
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />, // اینجا لیست همه پروژه‌ها نمایش داده می‌شود
      },
      {
        path: "projects/new",
        element: <NewProject />,
      },
      {
        path: "projects/:projectId", // داینامیک روت برای تسک‌های هر پروژه
        element: <ProjectTasks />,
      },
    ],
  },
]);
