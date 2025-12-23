import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
// import Login from "./pages/Auth/Login";
import NewProject from "./pages/NewProject";
// import Register from "./pages/Auth/Register";

function App() {
  const projects = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  return (
    <>
      {/* <Login /> */}
      {/* <Register /> */}
      <NewProject />
    </>
  );
}

export default App;
