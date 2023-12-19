import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle } from '../../../types/article.types';

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
});

export default articleSlice.reducer;
export const { changeCurrentPage } = articleSlice.actions;
