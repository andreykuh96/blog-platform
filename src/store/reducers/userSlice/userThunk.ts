import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserRequest, IUserResponse } from '../../../types/user.types';
import { KataApi } from '../../../api/KataApi';
import { AxiosError } from 'axios';
import { BadResponse } from '../../../types/form.types';

export const registerNewUser = createAsyncThunk<IUserResponse, IUserRequest, { rejectValue: string }>(
  'user/registerNewUser',
  async (body, thunkApi) => {
    try {
      const response = await KataApi.post<IUserResponse>(`users`, body);

      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.user.token);

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

      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.user.token);

      return response.data;
    } catch (error) {
      const e = error as AxiosError<BadResponse>;

      if (e.response?.status === 422) {
        return thunkApi.rejectWithValue(e.response.data.errors['email or password']);
      } else {
        return thunkApi.rejectWithValue(e.message);
      }
    }
  }
);

export const updateCurrentUser = createAsyncThunk<IUserResponse, IUserRequest, { rejectValue: string }>(
  'user/updateCurrentUser',
  async (body, thunkApi) => {
    try {
      const response = await KataApi.put<IUserResponse>('user', body);

      localStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
