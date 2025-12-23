import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import usersReducer from "./Slices/UsersSlice";
import projectsReducer from "./Slices/ProjectsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
