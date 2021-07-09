import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  scores: [],
  status: 'idle',
  error: null,
  postStatus: 'idle',
  order: 'total'
}

export const fetchScores = createAsyncThunk(
    'scores/fetchScores', 
    async () => {
        const response = await client.get('http://localhost:8000/HighScoreApp/')
        return response
    }
)

export const addNewScore = createAsyncThunk(
  'scores/addNewScore',
  async (data) => {
    const response = await client.post('http://localhost:8000/HighScoreApp', {...data})
    return response
  }
)

export const updateScore = createAsyncThunk(
    'scores/updateScore',
    async (data) => {
      const response = await client.put(`http://localhost:8000/HighScoreApp/${data.id}`, {...data})
      return response
    }
  )

const scoresSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    scoresFetched(state, action) {
        const { postId, reaction } = action.payload
        const existingPost = state.posts.find((post) => post.id === postId)
        if (existingPost) {
          existingPost.reactions[reaction]++
        }
    },
    scoreAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    scoresUpdated(state, action) {
      const { clicks, totalPoints, name } = action.payload
      const existingScore = state.scores.find((score) => score.name === name)
      if (existingScore) {
        existingScore.clicks = clicks
        existingScore.totalPoints = totalPoints
      }
    },
    clearStatus(state) {
        state.postStatus = 'idle'
    },
    previewScore(state, action) {
        state.scores = state.scores.filter(item=> item.name !== action.payload.name && !item.isPreview).concat({
            isPreview: true,
            ...action.payload
        });
    },
    clearPreviewScore(state) {
        state.scores = state.scores.filter(item=> !item.isPreview)
    },
    changeTopTen(state, action) {
        state.order = action.payload.order
    }
  },
  extraReducers: {
    [fetchScores.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchScores.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.scores = state.scores = action.payload
    },
    [fetchScores.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [addNewScore.fulfilled]: (state, action) => {
        state.postStatus = 'succeeded'
        state.scores.push(action.payload)
    },
    [updateScore.fulfilled]: (state, action) => {
        state.postStatus = 'succeeded'
        state.scores = state.scores.filter(item=> item.name !== action.payload.name).concat(action.payload);
    },
    [updateScore.rejected]: (state, action) => {
        state.postStatus = 'failed'
        state.error = action.payload
    },
    [addNewScore.rejected]: (state, action) => {
        state.postStatus = 'failed'
        state.error = action.payload
    },
  },
})

export const { scoresFetched, scoresUpdated, scoreAdded, clearStatus, previewScore, clearPreviewScore, changeTopTen } = scoresSlice.actions

export default scoresSlice.reducer

export const selectTopScores = (state) => {
    const scores = state.scores.scores.slice(0, state.scores.scores.length);
    if ( state.scores.order === "total" ) {
        scores.sort((itemA, itemB) => itemA.totalPoints < itemB.totalPoints ? 1 : itemA.totalPoints === itemB.totalPoints && itemA.clicks > itemB.clicks ? 1 : -1);
    } else {
        scores.sort((itemA, itemB) => itemA.totalPoints / itemA.clicks < itemB.totalPoints / itemB.clicks ? 1 : itemA.totalPoints / itemA.clicks === itemB.totalPoints / itemB.clicks && itemA.totalPoints > itemB.totalPoints ? 1 : -1);
    }
    return scores.slice(0, 10);
}



