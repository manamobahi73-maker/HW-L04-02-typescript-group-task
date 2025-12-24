import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import usersReducer from "./Slices/UsersSlice";
import projectsReducer from "./Slices/ProjectsSlice";
import tasksReducer from "./Slices/TasksSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
