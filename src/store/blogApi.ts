import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseAllArticles, ResponseAnArticle } from '../types/article.types';
import { getTokenFromLS } from '../components/App/App';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Articles', 'Article'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
  }),
  endpoints: (build) => ({
    getAllArticles: build.query<ResponseAllArticles, number>({
      query: (offset) => ({
        url: `articles?limit=5&offset=${offset}`,
        headers: {
          Authorization: `Bearer ${getTokenFromLS()}`,
        },
      }),
      providesTags: (result) =>
        result?.articles
          ? [
              ...result.articles.map(({ slug }) => ({ type: 'Articles' as const, slug })),
              { type: 'Articles', id: 'LIST' },
            ]
          : [{ type: 'Articles', id: 'LIST' }],
    }),
    getAnArticle: build.query<ResponseAnArticle, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
        headers: {
          Authorization: `Bearer ${getTokenFromLS()}`,
        },
      }),
      providesTags: ['Article'],
    }),
    deleteArticle: build.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getTokenFromLS()}`,
        },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    createArticle: build.mutation({
      query: (body) => ({
        url: 'articles',
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${getTokenFromLS()}`,
        },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    editArticle: build.mutation({
      query: ({ slug, body }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${getTokenFromLS()}`,
        },
      }),
      invalidatesTags: ['Article'],
    }),
    toggleLike: build.mutation({
      query: ({ slug, active }) => ({
        url: `articles/${slug}/favorite`,
        method: !active ? 'POST' : 'DELETE',
        headers: {
          Authorization: `Bearer ${getTokenFromLS()}`,
        },
        invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
      }),
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useGetAnArticleQuery,
  useDeleteArticleMutation,
  useCreateArticleMutation,
  useEditArticleMutation,
  useToggleLikeMutation,
} = blogApi;
