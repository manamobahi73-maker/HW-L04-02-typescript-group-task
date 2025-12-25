import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '../../components/types/userType';

const loadCurrentUser = (): UserType | null => {
  const savedUser = localStorage.getItem("currentUser");
  return savedUser ? JSON.parse(savedUser) : null;
};

const initialState = {
  currentUser: loadCurrentUser(), };

export const AuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const {setCurrentUser, clearCurrentUser} = AuthSlice.actions;

export default AuthSlice.reducer;