export type TaskPriority = "high" | "medium" | "low";
export type TaskStatus = "todo" | "doing" | "done";

export interface TaskType {
  id: string;
  projectId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  assignedTo: string;
  deadline: string;
  status: TaskStatus;
  createdAt: string;
}
