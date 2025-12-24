import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
// import Login from "./pages/Auth/Login";
import NewProject from "./pages/NewProject";
// import Register from "./pages/Auth/Register";

function App() {
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      {/* <Login /> */}
      {/* <Register /> */}
      <NewProject />
    </>
  );
}

export default App;
