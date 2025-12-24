import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteTask, updateTaskStatus } from "../../redux/Slices/TasksSlice";
import {
  TaskType,
  TaskStatus,
  TaskPriority,
} from "../../components/types/taskType";
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
  const users = useSelector((state: RootState) => state.users);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">(
    "all"
  );
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

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

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setAssigneeFilter("all");
    setStartDateFilter("");
    setEndDateFilter("");
  };

  // Filter tasks by all criteria
  const filteredTasks = tasks.filter((task) => {
    // Search query filter
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Status filter
    if (statusFilter !== "all" && task.status !== statusFilter) {
      return false;
    }

    // Priority filter
    if (priorityFilter !== "all" && task.priority !== priorityFilter) {
      return false;
    }

    // Assignee filter
    if (assigneeFilter !== "all" && task.assignedTo !== assigneeFilter) {
      return false;
    }

    // Date range filter
    if (startDateFilter && task.deadline < startDateFilter) {
      return false;
    }
    if (endDateFilter && task.deadline > endDateFilter) {
      return false;
    }

    return true;
  });

  const todoTasks = filteredTasks.filter((t) => t.status === "todo");
  const doingTasks = filteredTasks.filter((t) => t.status === "doing");
  const doneTasks = filteredTasks.filter((t) => t.status === "done");

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

        <div className="mb-6 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Filter Tasks
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-sm text-blue-600 hover:text-blue-700 underline"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search by title
              </label>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as TaskStatus | "all")
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(e.target.value as TaskPriority | "all")
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned to
              </label>
              <select
                value={assigneeFilter}
                onChange={(e) => setAssigneeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Members</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due date from
              </label>
              <input
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due date to
              </label>
              <input
                type="date"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </div>
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
