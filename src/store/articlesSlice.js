import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { validate } from '../utils';
import { DATA } from '../data';
import { createId } from '../utils';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (errorMessage, { rejectWithValue, getState, dispatch }) => {
    try {
      //check if we don't have articles
      if (!getState().articles.list) {
        /* local server, changed this code to local storage
        const response = await fetch(`/api/article`);
        validate(response, errorMessage);
        const data = await response.json();
        dispatch(addArticles(data.data));*/

        // if we have local articles, don't load them from the file
        let data = JSON.parse(localStorage.getItem('article'));
        if (!data) {
          localStorage.setItem('article', JSON.stringify(DATA.articles));
          data = DATA.articles;
        }
        dispatch(addArticles(data));
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchPartArticles = createAsyncThunk(
  'articles/fetchPartArticles',
  async (offset, { rejectWithValue, getState, dispatch }) => {
    // use 4, but take 5 because we want to know "do we have more articles?"
    const limit = 5;
    let articles = [];
    const { list } = getState().articles;

    try {
      // if we already have articles, use them from store
      if (list) {
        articles = list.slice(offset, offset + limit);
      } else {
        // If we don't have articles in store, we load them

        /* local server, changed this code to local storage
        const response = await fetch(`/api/article?limit=${limit}&offset=${offset}`);

        validate(response, "Sorry, we can't get our articles, please try later");

        const data = await response.json();
        articles = data.data;
         */

        let list = JSON.parse(localStorage.getItem('article'));
        if (!list) {
          localStorage.setItem('article', JSON.stringify(DATA.articles));
          list = DATA.articles;
        }
        articles = list.slice(offset, offset + limit);
      }

      dispatch(
        pageArticles(
          articles.length > 4
            ? {
                hasMore: true,
                list: articles.slice(0, 4),
              }
            : {
                hasMore: false,
                list: articles,
              },
        ),
      );
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const sortArticles = createAsyncThunk(
  'articles/sortArticles',
  async (sort, { rejectWithValue, dispatch, getState }) => {
    try {
      let list = getState().articles.list;

      if (!list) {
        /* local server, changed this code to local storage
        const response = await fetch(`/api/article`);
        validate(response, "Sorry I can't load articles");
        const data = await response.json();
        list = data.data;
        */
        list = JSON.parse(localStorage.getItem('article'));
      }

      const articles = list.slice().sort((a, b) => {
        const x = new Date(a.date);
        const y = new Date(b.date);
        if (sort === 'new') {
          return y - x;
        } else {
          return x - y;
        }
      });

      dispatch(addArticles(articles));

      dispatch(
        pageArticles(
          articles.length > 4
            ? {
                hasMore: true,
                list: articles.slice(0, 4),
              }
            : {
                hasMore: false,
                list: articles,
              },
        ),
      );
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      let list = getState().articles.list;

      if (!list) {
        /*
        local server, changed this code to local storage
        const response = await fetch(`/api/article`);

        validate(response, "Sorry I can't load articles");

        const data = await response.json();

        list = data.data;*/

        list = JSON.parse(localStorage.getItem('article'));
      }

      const articles = list.filter((article) => article.id !== id);

      dispatch(addArticles(articles));

      //Only for localStorage, in local server don't do it
      localStorage.setItem('article', JSON.stringify(articles));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addArticle = createAsyncThunk(
  'articles/addArticle',
  async (article, { rejectWithValue, dispatch, getState }) => {
    try {
      let list = getState().articles.list;
      //check if we already have all articles
      if (!list) {
        /* local server, changed this code to local storage
        const articlesResponse = await fetch(`/api/article`);

        validate(articlesResponse, "Sorry I can't load articles");

        const data = await articlesResponse.json();
        list = data.data;*/

        list = JSON.parse(localStorage.getItem('article'));
      }

      /* local server, changed this code to local storage
      const response = await fetch(`/api/article`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });

      validate(response, "Sorry I can't add your article, try later please");

      const data = await response.json();

      dispatch(addArticles([data, ...list]));*/
      const newArticle = {
        ...article,
        id: createId(),
        date: new Date(),
      };

      const data = [newArticle, ...list];
      localStorage.setItem('article', JSON.stringify(data));
      dispatch(addArticles(data));
    } catch (err) {
      rejectWithValue(err.message);
    }
  },
);

const setPending = (state) => {
  state.loading = true;
};

const setFulfilled = (state) => {
  state.loading = false;
};

const setRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    list: null,
    pageArticles: {
      list: null,
      hasMore: true,
    },
    comments: [],
    error: null,
    loading: false,
    sorting: false,
    deleting: false,
  },
  reducers: {
    addArticles: (state, action) => {
      state.list = action.payload;
    },
    pageArticles: (state, action) => {
      state.pageArticles = action.payload;
    },
  },
  extraReducers: {
    [fetchPartArticles.pending]: setPending,
    [fetchPartArticles.fulfilled]: setFulfilled,
    [fetchPartArticles.rejected]: setRejected,

    [fetchArticles.pending]: setPending,
    [fetchArticles.fulfilled]: setFulfilled,
    [fetchArticles.rejected]: setRejected,

    [addArticle.pending]: setPending,
    [addArticle.fulfilled]: setFulfilled,
    [addArticle.rejected]: setRejected,

    [deleteArticle.pending]: (state) => {
      state.deleting = true;
    },
    [deleteArticle.fulfilled]: (state) => {
      state.deleting = false;
    },
    [deleteArticle.rejected]: (state) => {
      state.deleting = false;
    },

    [sortArticles.pending]: (state) => {
      state.sorting = true;
    },
    [sortArticles.fulfilled]: (state) => {
      state.sorting = false;
    },
    [sortArticles.rejected]: (state) => {
      state.sorting = false;
    },
  },
});

const { addArticles, pageArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
