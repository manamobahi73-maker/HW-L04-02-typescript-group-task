import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TaskType, TaskStatus } from "../types/taskType";

interface TaskCardProps {
  task: TaskType;
  onEdit: (task: TaskType) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) => {
  const users = useSelector((state: RootState) => state.users);

  const formattedDeadline = useMemo(() => {
    return new Date(task.deadline).toLocaleDateString();
  }, [task.deadline]);

  const assignedUser = useMemo(() => {
    const user = users.find((u) => u.id === task.assignedTo);
    return user ? user.name : task.assignedTo;
  }, [users, task.assignedTo]);

  const getPriorityColor = (priority: TaskType["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{task.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      <div className="text-xs text-gray-500 space-y-1 mb-3">
        <div>Assigned to: {assignedUser}</div>
        <div>Deadline: {formattedDeadline}</div>
      </div>
      <div className="flex gap-2">
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
          className="text-xs px-2 py-1 border border-gray-300 rounded"
        >
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button
          onClick={() => onEdit(task)}
          className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
