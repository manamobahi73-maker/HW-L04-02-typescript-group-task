import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "../../redux/Slices/ProjectsSlice";
import { ProjectType } from "../../components/types/projectType";
import { useState } from "react";

type ProjectFormInputs = {
  title: string;
  description: string;
};

const NewProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormInputs>();

  const onSubmit: SubmitHandler<ProjectFormInputs> = (data) => {
    const newProject: ProjectType = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      createdAt: new Date().toISOString(),
    };

    dispatch(addProject(newProject));
    setSuccessMessage("Project created successfully!");
    reset();

    setTimeout(() => {
      setSuccessMessage("");
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-1"
          >
            ← Back to Projects
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            Create New Project
          </h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                {...register("title", {
                  required: "Title is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project title"
              />
              {errors.title && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project description"
              />
              {errors.description && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.description.message}
                </span>
              )}
            </div>

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                {successMessage}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Create Project
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
