import { createAsyncThunk } from '@reduxjs/toolkit';
import { KataApi } from '../../../api/KataApi';
import { ResponseAllArticles, ResponseAnArticle } from '../../../types/article.types';
import { AxiosError } from 'axios';

export const getAllArticles = createAsyncThunk<ResponseAllArticles, number, { rejectValue: string }>(
  'article/getAllArticles',
  async (offset, thunkApi) => {
    try {
      const response = await KataApi.get<ResponseAllArticles>(`articles?limit=5&offset=${offset}`);
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const getAnArticle = createAsyncThunk<ResponseAnArticle, string, { rejectValue: string }>(
  'article/getAnArticle',
  async (slug, thunkApi) => {
    try {
      const response = await KataApi.get<ResponseAnArticle>(`articles/${slug}`);
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
