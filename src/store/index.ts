import { configureStore } from '@reduxjs/toolkit';
import articleSlice from './reducers/articleSlice/articleSlice';
import userSlice from './reducers/userSlice/userSlice';

const store = configureStore({
  reducer: {
    articleSlice,
    userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
