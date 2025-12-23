import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProject } from "../../redux/Slices/ProjectsSlice";
import { ProjectType } from "../../components/types/projectType";
import { useState } from "react";

type ProjectFormInputs = {
  title: string;
  description: string;
};

const NewProject = () => {
  const dispatch = useDispatch();
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
    }, 3000);
  };

  return (
    <div>
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Project Title:</label>
          <input
            type="text"
            {...register("title", {
              required: "Title is required",
            })}
          />
          {errors.title && (
            <span style={{ color: "red" }}>{errors.title.message}</span>
          )}
        </div>
        <div>
          <label>Project Description:</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={5}
          />
          {errors.description && (
            <span style={{ color: "red" }}>{errors.description.message}</span>
          )}
        </div>
        {successMessage && (
          <div style={{ color: "green", marginTop: "10px" }}>
            {successMessage}
          </div>
        )}
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default NewProject;
