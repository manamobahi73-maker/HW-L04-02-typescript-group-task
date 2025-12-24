import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const ProjectsList = () => {
  const projects = useSelector((state: RootState) => state.projects);
  const navigate = useNavigate();

  const projectsWithFormattedDate = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      formattedDate: new Date(project.createdAt).toLocaleDateString(),
    }));
  }, [projects]);

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}/tasks`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
          <button
            onClick={() => navigate("/new-project")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No projects yet. Create your first project!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsWithFormattedDate.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border border-gray-200"
              >
                <div className="text-xs text-gray-500 mb-3">
                  {project.formattedDate}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
