import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteTask, updateTaskStatus } from "../../redux/Slices/TasksSlice";
import { TaskType, TaskStatus } from "../../components/types/taskType";
import TaskForm from "../../components/TaskComponents/TaskForm";
import TaskCard from "../../components/TaskComponents/TaskCard";

const ProjectTasks = () => {
  const params = useParams();
  const projectId = params.projectId;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const project = useSelector((state: RootState) =>
    state.projects.find((p) => p.id === projectId)
  );
  const tasks = useSelector((state: RootState) =>
    state.tasks.filter((task) => task.projectId === projectId)
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: TaskType) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId));
    }
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const doingTasks = tasks.filter((t) => t.status === "doing");
  const doneTasks = tasks.filter((t) => t.status === "done");

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Project not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-700 mb-2 flex items-center gap-1"
            >
              ← Back to Projects
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              {project.title}
            </h1>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="bg-gray-200 px-4 py-2 rounded-t-lg">
              <h2 className="font-semibold text-gray-700">
                Todo ({todoTasks.length})
              </h2>
            </div>
            <div className="bg-gray-100 p-4 rounded-b-lg min-h-[400px]">
              {todoTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="bg-blue-200 px-4 py-2 rounded-t-lg">
              <h2 className="font-semibold text-blue-700">
                Doing ({doingTasks.length})
              </h2>
            </div>
            <div className="bg-blue-50 p-4 rounded-b-lg min-h-[400px]">
              {doingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="bg-green-200 px-4 py-2 rounded-t-lg">
              <h2 className="font-semibold text-green-700">
                Done ({doneTasks.length})
              </h2>
            </div>
            <div className="bg-green-50 p-4 rounded-b-lg min-h-[400px]">
              {doneTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <TaskForm
          projectId={projectId!}
          editingTask={editingTask}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectTasks;
