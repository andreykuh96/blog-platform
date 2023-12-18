import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../types/user.types';
import { existingUserLogin, registerNewUser, updateCurrentUser } from './userThunk';

interface UserState {
  user: IUser | null;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserFromLS(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    removeUserFromLS(state, action: PayloadAction<null>) {
      state.user = action.payload;
    },
    onCloseError(state, action: PayloadAction<null>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // registerNewUser
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.error = action.payload || 'my unknown error';
      })
      // existingUserLogin
      .addCase(existingUserLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(existingUserLogin.rejected, (state, action) => {
        state.error = action.payload || 'my unknown error';
      })
      // updateCurrentUser
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export default userSlice.reducer;
export const { updateUserFromLS, removeUserFromLS, onCloseError } = userSlice.actions;
