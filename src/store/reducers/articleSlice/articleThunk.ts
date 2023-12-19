import { createAsyncThunk } from '@reduxjs/toolkit';
import { KataApi } from '../../../api/KataApi';

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
