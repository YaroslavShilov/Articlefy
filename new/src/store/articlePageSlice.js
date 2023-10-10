import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { validate } from '../utils'

export const fetchArticle = createAsyncThunk('articlePage/fetchArticle', async (id, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch(`/api/article/${id}`)

    validate(response, "Sorry, we can't find this article, try another one please")

    const data = await response.json()

    dispatch(addArticle(data))
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const articlePageSlice = createSlice({
  name: 'articlePage',
  initialState: {
    item: null,
    loading: false,
    error: null,
  },
  reducers: {
    addArticle: (state, action) => {
      state.item = action.payload
    },
  },
  extraReducers: {
    [fetchArticle.pending]: (state) => {
      state.loading = true
    },
    [fetchArticle.fulfilled]: (state) => {
      state.loading = false
    },
    [fetchArticle.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

const { addArticle } = articlePageSlice.actions

export default articlePageSlice.reducer
