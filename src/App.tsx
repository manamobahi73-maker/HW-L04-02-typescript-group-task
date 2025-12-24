import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import NewProject from "./pages/NewProject";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectsList from "./pages/ProjectsList";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProjectTasks from "./pages/ProjectTasks";
import UserManagement from "./pages/UserManagment";

function App() {
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    // <>
    //   {/* <Login /> */}
    //   {/* <Register /> */}
    //   <NewProject />
    // </>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/projects/:projectId/tasks" element={<ProjectTasks />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
