import { configureStore } from '@reduxjs/toolkit';
import articleSlice from './reducers/articleSlice/articleSlice';

const store = configureStore({
  reducer: {
    articleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
