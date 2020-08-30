import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { timeSlice } from './time/slice'

const store = configureStore({
  reducer: {
    time: timeSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export const useRootDispatch = () => useDispatch<RootDispatch>() // Export a hook that can be reused to resolve types
export default store
