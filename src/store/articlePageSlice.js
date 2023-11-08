import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DATA } from '../data';
// import { validate } from '../utils';

export const fetchArticle = createAsyncThunk('articlePage/fetchArticle', async (id, { rejectWithValue, dispatch }) => {
  try {
    /* local server, changed this code to local storage
    const response = await fetch(`/api/article/${id}`);

    validate(response, "Sorry, we can't find this article, try another one please");

    const data = await response.json();

    dispatch(addArticle(data));*/

    let data = JSON.parse(localStorage.getItem('article'));
    if (!data) {
      localStorage.setItem('article', JSON.stringify(DATA.articles));
      data = DATA.articles;
    }
    const article = data.find((article) => id === article.id);
    dispatch(addArticle(article));
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const articlePageSlice = createSlice({
  name: 'articlePage',
  initialState: {
    item: null,
    loading: false,
    error: null,
  },
  reducers: {
    addArticle: (state, action) => {
      state.item = action.payload;
    },
  },
  extraReducers: {
    [fetchArticle.pending]: (state) => {
      state.loading = true;
    },
    [fetchArticle.fulfilled]: (state) => {
      state.loading = false;
    },
    [fetchArticle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { addArticle } = articlePageSlice.actions;

export default articlePageSlice.reducer;
