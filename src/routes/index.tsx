import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/layout";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import ProjectsList from "../pages/ProjectsList"; 
import NewProject from "../pages/NewProject";
import ProjectTasks from "../pages/ProjectTasks"; 
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import UsersList from "../pages/UserManagment/UsersList";
import NewUser from "../pages/UserManagment/NewUser";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <ProjectsList />,
          },
          {
            path: "projects/new",
            element: <NewProject />,
          },
          {
            path: "projects/:projectId/tasks",
            element: <ProjectTasks />,
          },

          {
            element: <AdminRoute />,
            children: [
              {
                path: "users",
                element: <UsersList />,
              },
              {
                path: "users/new",
                element: <NewUser />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
