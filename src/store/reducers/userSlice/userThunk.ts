import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserRequest, IUserResponse } from '../../../types/user.types';
import { KataApi } from '../../../api/KataApi';
import { AxiosError } from 'axios';

export const registerNewUser = createAsyncThunk<IUserResponse, IUserRequest, { rejectValue: string }>(
  'user/registerNewUser',
  async (body, thunkApi) => {
    try {
      const response = await KataApi.post<IUserResponse>(`users`, body);
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const existingUserLogin = createAsyncThunk<IUserResponse, IUserRequest, { rejectValue: string }>(
  'user/existingUserLogin',
  async (body, thunkApi) => {
    try {
      const response = await KataApi.post<IUserResponse>(`users/login`, body);
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
