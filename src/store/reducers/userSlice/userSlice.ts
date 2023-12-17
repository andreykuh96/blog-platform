import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../types/user.types';
import { existingUserLogin, registerNewUser } from './userThunk';

interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(existingUserLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export default userSlice.reducer;
