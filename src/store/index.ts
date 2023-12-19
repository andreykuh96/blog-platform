import { configureStore } from '@reduxjs/toolkit';
import articleSlice from './reducers/articleSlice/articleSlice';
import userSlice from './reducers/userSlice/userSlice';
import { blogApi } from './blogApi';

const store = configureStore({
  reducer: {
    articleSlice,
    userSlice,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
