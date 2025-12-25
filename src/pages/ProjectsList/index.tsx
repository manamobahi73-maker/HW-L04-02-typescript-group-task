import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProjectsList = () => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.currentUser);
  const projects = useSelector((state: RootState) => state.projects);
  const allTasks = useSelector((state: RootState) => state.tasks) || [];

  const taskStats = useMemo(() => {
    const todo = allTasks.filter((t) => t.status === "todo").length;
    const inProgress = allTasks.filter((t) => t.status === "doing").length;
    const done = allTasks.filter((t) => t.status === "done").length;

    return [
      { name: "To Do", value: todo, color: "#F87171" },
      { name: "In Progress", value: inProgress, color: "#FACC15" },
      { name: "Done", value: done, color: "#4ADE80" },
    ];
  }, [allTasks]);

  const projectsWithFormattedDate = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      formattedDate: new Date(project.createdAt).toLocaleDateString(),
    }));
  }, [projects]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-gray-500 mt-1">
            Welcome back,{" "}
            <span className="font-semibold text-indigo-600">{user?.name}</span>
            <span className="text-xs ml-2 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100 capitalize">
              {user?.role}
            </span>
          </p>
        </div>

        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/projects/new")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md flex items-center gap-2"
          >
            <span className="text-xl font-bold">+</span> New Project
          </button>
        )}
      </div>

      {allTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2 relative min-h-[350px]">
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              Overall Tasks Status
            </h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm">Active Projects</p>
              <p className="text-3xl font-bold text-gray-800">
                {projects.length}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm">Total Tasks</p>
              <p className="text-3xl font-bold text-indigo-600">
                {allTasks.length}
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <p className="text-green-600 text-sm font-medium">
                Completed Tasks
              </p>
              <p className="text-3xl font-bold text-green-700">
                {taskStats.find((s) => s.name === "Done")?.value || 0}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-blue-800 flex items-center gap-3">
          <p>No tasks created in the system yet.</p>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">All Projects</h2>

        {projects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No projects found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsWithFormattedDate.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}/tasks`)}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-gray-200 hover:border-indigo-300 relative overflow-hidden h-full flex flex-col"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                    {project.title}
                  </h2>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 mt-auto">
                  <span> {project.formattedDate}</span>
                  <span className="text-indigo-600 font-medium group-hover:underline">
                    View Board 
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
