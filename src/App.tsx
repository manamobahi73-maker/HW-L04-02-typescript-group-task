import { useEffect } from "react";
import { useSelector } from "react-redux";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom"; 
import { RootState } from "./redux/store"; 
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
    <RouterProvider router={router} />
  );
}

export default App;