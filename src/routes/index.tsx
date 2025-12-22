import Layout from "../Layout/layout";
import React from "react";
import NewProject from "../pages/NewProject";
import ProjectsList from "../pages/ProjectsList";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { createBrowserRouter } from "react-router-dom";
export const router=createBrowserRouter([
  {
    path:"/Login",
    element:<Login/>
  },
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        index: true,
        element:<Dashboard/>
      }
      ,{
        path:"projects/new",
        element:<NewProject/>
      }
       ,{
        path:"projects/list",
        element:<ProjectsList/>
      }
    ]
  }
]);
