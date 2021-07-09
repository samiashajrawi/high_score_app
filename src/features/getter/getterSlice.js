import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentScore: '',
  totalPoints: 0,
  name: '',
  counter: 0,
}

const getterSlice = createSlice({
  name: 'getter',
  initialState,
  reducers: {
    getScore(state) {
      const score = Math.floor(Math.random() * 200 - 100);
      state.currentScore = score
      state.totalPoints += score;
      state.counter += 1
    },
    setName(state, action) {
      state.name = action.payload
    },
    resetAll(state) {
      state.name = '';
      state.currentScore = '';
      state.totalPoints = 0;
      state.counter = 0;
    },
  }
})

export const { getScore, setName, resetAll } = getterSlice.actions

export default getterSlice.reducer



