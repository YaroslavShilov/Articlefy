import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice';
import articlePageReducer from './articlePageSlice';
import commentsReducer from './commentsSlice';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    articlePage: articlePageReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
