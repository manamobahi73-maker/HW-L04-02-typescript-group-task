import { useEffect, createElement } from "react";
import { toast } from "react-toastify";
import { TaskType } from "../components/types/taskType";
import { ProjectType } from "../components/types/projectType";
import { isDeadlineUrgent, formatTimeRemaining } from "../utils/dateHelpers";
import { TaskDeadlineToast } from "../components/TaskComponents/TaskDeadlineToast";

const STORAGE_KEY = "notified-tasks";

export const useDeadlineNotifications = (
  tasks: TaskType[],
  projects: ProjectType[],
  navigate: (path: string) => void
) => {
  useEffect(() => {
    const notifiedTasks = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    ) as string[];

    const urgentTasks = tasks.filter(
      (task) =>
        isDeadlineUrgent(task.deadline) &&
        !notifiedTasks.includes(task.id) &&
        task.status !== "done"
    );

    urgentTasks.forEach((task) => {
      const project = projects.find((p) => p.id === task.projectId);

      if (project) {
        const timeRemaining = formatTimeRemaining(task.deadline);

        const handleDismiss = () => {
          const currentNotified = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
          ) as string[];
          currentNotified.push(task.id);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(currentNotified));
        };

        toast.warn(
          createElement(TaskDeadlineToast, {
            taskTitle: task.title,
            projectTitle: project.title,
            projectId: project.id,
            timeRemaining,
            onNavigate: navigate,
            onDismiss: handleDismiss,
          }),
          {
            position: "top-right",
            autoClose: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            style: {
              background: "rgba(254, 226, 226, 0.95)",
              border: "1px solid rgba(248, 113, 113, 0.3)",
            },
          }
        );
      }
    });
  }, [tasks, projects, navigate]);
};
