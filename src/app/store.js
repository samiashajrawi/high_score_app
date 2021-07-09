import { configureStore } from '@reduxjs/toolkit'

import scoresReducer from '../features/scores/scoresSlice'
import getterReducer from '../features/getter/getterSlice'

export default configureStore({
  reducer: {
    scores: scoresReducer,
    getter: getterReducer
  },
})