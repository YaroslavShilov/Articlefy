import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { validate } from '../utils';
import { DATA } from '../data';
import { createId } from '../utils';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (articleId, { rejectWithValue, dispatch, getState }) => {
    // check if we already have comments
    let comments = getState().comments.list;

    try {
      if (!comments || !comments.length || (comments.length !== 0 && comments[0].article !== articleId)) {
        /* local server, changed this code to local storage
       const response = await fetch(`/api/comment?article=${articleId}`);
        validate(response, "Sorry, I can't get comments, try later please");
        const data = await response.json();

        comments = data.records;*/

        // if we have local comments, don't load them from the file
        let data = JSON.parse(localStorage.getItem('comments'));
        if (!data) {
          localStorage.setItem('comments', JSON.stringify(DATA.comments));
          data = DATA.comments;
        }
        comments = data.filter(({ article }) => article === articleId);

        dispatch(addComments(comments));
      } else {
        dispatch(addComments(comments));
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addComment = createAsyncThunk('comments/addComment', async (comment, { rejectWithValue, dispatch }) => {
  try {
    /* local server, changed this code to local storage
   const response = await fetch(`/api/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });

    validate(response, "Sorry I can't add your comment, try later please");

    const data = await response.json();

    dispatch(pushComment(data));*/

    const newComment = {
      ...comment,
      id: createId(),
    };

    const data = JSON.parse(localStorage.getItem('comments'));
    localStorage.setItem('comments', JSON.stringify([...data, newComment]));
    dispatch(pushComment(newComment));
  } catch (err) {
    rejectWithValue(err.message);
  }
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    list: null,
    loading: false,
    error: null,
    adding: {
      loading: false,
      error: null,
    },
  },
  reducers: {
    addComments: (state, action) => {
      state.list = action.payload;
    },
    pushComment: (state, action) => {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(addComment.pending, (state) => {
      state.adding.loading = true;
    });
    builder.addCase(addComment.fulfilled, (state) => {
      state.adding.loading = false;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.adding.loading = false;
      state.adding.error = action.payload;
    });
  },
});

const { addComments, pushComment } = commentsSlice.actions;
export default commentsSlice.reducer;
