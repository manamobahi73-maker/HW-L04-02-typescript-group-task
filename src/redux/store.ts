import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import usersReducer from "./Slices/UsersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
