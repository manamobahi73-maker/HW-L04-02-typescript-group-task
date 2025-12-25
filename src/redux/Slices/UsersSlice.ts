import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../components/types/userType";

const loadUsersFromLocalStorage = (): UserType[] => {
  const savedUsers = localStorage.getItem("users");
  if (!savedUsers || savedUsers === "undefined" || savedUsers === "null") {
    return [
      {
        id: "1",
        name: "Manager",
        email: "admin@gmail.com",
        password: "123",
        role: "admin",
      },
    ];
  }
  try {
    return JSON.parse(savedUsers);
  } catch {
    return [
      {
        id: "1",
        name: "Manager",
        email: "admin@gmail.com",
        password: "123",
        role: "admin",
      },
    ];
  }
};

const initialState: UserType[] = loadUsersFromLocalStorage();

export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        role: action.payload.role,
      });
    },
    removeUser: (state, action: PayloadAction<string>) => {
      return state.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<UserType>) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addUser, removeUser, updateUser } = UsersSlice.actions;

export default UsersSlice.reducer;
