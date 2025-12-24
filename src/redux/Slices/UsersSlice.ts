import {createSlice , PayloadAction} from '@reduxjs/toolkit';
import {UserType} from '../../components/types/userType';

const initialState: UserType[] = [
    {
        id: "1",
        name: 'John Doe',
        email: "info@example.com",
        password: "123",
        role: 'user',
    }
];

export const UsersSlice = createSlice({
  name: 'users',
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
      return state.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<UserType>) => {
      const index = state.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const {addUser, removeUser, updateUser} = UsersSlice.actions;

export default UsersSlice.reducer;