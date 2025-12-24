import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Layout from "../Layout/layout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard";
import NewProject from "../pages/NewProject";
import ProjectTasks from "../pages/ProjectTasks";
import ProjectsList from "../pages/ProjectsList";

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
    ],
  },
]);
