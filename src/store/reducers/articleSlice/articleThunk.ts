import { createAsyncThunk } from '@reduxjs/toolkit';
import { KataApi } from '../../../api/KataApi';
import {
  ICreateArticleRequest,
  ICreateArticleResponse,
  ResponseAllArticles,
  ResponseAnArticle,
} from '../../../types/article.types';
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

export const createAnArticle = createAsyncThunk<ICreateArticleResponse, ICreateArticleRequest, { rejectValue: string }>(
  'article/createAnArticle',
  async (body) => {
    const response = await KataApi.post<ICreateArticleResponse>('articles', body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
);

export const deleteAnArticle = createAsyncThunk<string, string>('article/deleteAnArticle', async (slug) => {
  await KataApi.delete(`articles/${slug}`);
  return slug;
});

export const updateAnArticle = createAsyncThunk<ICreateArticleResponse, { slug: string; body: ICreateArticleRequest }>(
  'article/updateAnArticle',
  async ({ slug, body }) => {
    const response = await KataApi.put<ICreateArticleResponse>(`articles/${slug}`, body);
    return response.data;
  }
);

export const favoriteAnArticle = createAsyncThunk<string, string>('article/favoriteAnArticle', async (slug) => {
  await KataApi.post(
    `articles/${slug}/favorite`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return slug;
});

export const unfavoriteAnArticle = createAsyncThunk<string, string>('article/unfavoriteAnArticle', async (slug) => {
  await KataApi.delete(`articles/${slug}/favorite`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
  return slug;
});
