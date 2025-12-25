import { toast } from "react-toastify";

interface TaskDeadlineToastProps {
  taskTitle: string;
  projectTitle: string;
  projectId: string;
  timeRemaining: string;
  onNavigate: (path: string) => void;
  onDismiss: () => void;
}

export const TaskDeadlineToast = ({
  taskTitle,
  projectTitle,
  projectId,
  timeRemaining,
  onNavigate,
  onDismiss,
}: TaskDeadlineToastProps) => {
  const handleViewTask = () => {
    onNavigate(`/projects/${projectId}/tasks`);
    toast.dismiss();
  };

  const handleDismiss = () => {
    onDismiss();
    toast.dismiss();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold text-red-800">⏰ Urgent Deadline!</div>
      <div className="text-sm text-red-700">
        Task <span className="font-medium">"{taskTitle}"</span> from project{" "}
        <span className="font-medium">"{projectTitle}"</span> has only{" "}
        <span className="font-bold">{timeRemaining}</span> remaining!
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleViewTask}
          className="flex-1 bg-white text-red-600 px-4 py-2 rounded hover:bg-red-50 transition font-medium text-sm border border-red-300"
        >
          View Task →
        </button>
        <button
          onClick={handleDismiss}
          className="flex-1 bg-white text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition font-medium text-sm border border-gray-300"
        >
          Don't Show Again
        </button>
      </div>
    </div>
  );
};
