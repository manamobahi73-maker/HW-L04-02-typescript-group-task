import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '../../components/types/userType';

const initialState = {
  currentUser: null as UserType | null,
};

export const AuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const {setCurrentUser, clearCurrentUser} = AuthSlice.actions;

export default AuthSlice.reducer;