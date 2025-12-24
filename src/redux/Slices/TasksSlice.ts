import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "../../components/types/taskType";

const loadTasksFromLocalStorage = (): TaskType[] => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const initialState: TaskType[] = loadTasksFromLocalStorage();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskType>) => {
      state.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<TaskType>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: TaskType["status"] }>
    ) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },
});

export const { addTask, deleteTask, updateTask, updateTaskStatus } =
  tasksSlice.actions;
export default tasksSlice.reducer;
