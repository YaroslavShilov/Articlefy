import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { validate } from '../utils'

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (articleId, { rejectWithValue, dispatch, getState }) => {
    // check if we already have comments
    let comments = getState().comments.list

    try {
      if (!comments || !comments.length || (comments.length !== 0 && comments[0].article !== articleId)) {
        const response = await fetch(`/api/comment?article=${articleId}`)
        validate(response, "Sorry, I can't get comments, try later please")
        const data = await response.json()

        comments = data.records
      }

      dispatch(addComments(comments))
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const addComment = createAsyncThunk('comments/addComment', async (comment, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    })

    validate(response, "Sorry I can't add your comment, try later please")

    const data = await response.json()

    dispatch(pushComment(data))
  } catch (err) {
    rejectWithValue(err.message)
  }
})

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
      state.list = action.payload
    },
    pushComment: (state, action) => {
      state.list.push(action.payload)
    },
  },
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.loading = true
    },
    [fetchComments.fulfilled]: (state) => {
      state.loading = false
    },
    [fetchComments.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [addComment.pending]: (state) => {
      state.adding.loading = true
    },
    [addComment.fulfilled]: (state) => {
      state.adding.loading = false
    },
    [addComment.rejected]: (state, action) => {
      state.adding.loading = false
      state.adding.error = action.payload
    },
  },
})

const { addComments, pushComment } = commentsSlice.actions
export default commentsSlice.reducer
