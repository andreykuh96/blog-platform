import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle } from '../../../types/article.types';
import { deleteAnArticle, getAllArticles, getAnArticle, updateAnArticle } from './articleThunk';

interface ArticleState {
  articles: IArticle[];
  article: IArticle | null;
  articlesCount: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  articles: [],
  article: null,
  articlesCount: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    changeCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //getAllArticles
      .addCase(getAllArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(getAllArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'my unknown error';
      })
      //getAnArticle
      .addCase(getAnArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.article = action.payload.article;
      })
      .addCase(getAnArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'my unknown error';
      })
      //deleteAnArticle
      .addCase(deleteAnArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter((item) => item.slug !== action.payload);
      })
      //updateAnArticle
      .addCase(updateAnArticle.fulfilled, (state, action) => {
        state.article = action.payload.article;
      });
  },
});

export default articleSlice.reducer;
export const { changeCurrentPage } = articleSlice.actions;
